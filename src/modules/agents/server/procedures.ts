import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
// import { randomUUID } from "crypto"; // use built-in crypto instead of 'uuid' package

import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql} from "drizzle-orm";
import z from "zod";

export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
            // TODO : change the actual meeting count
            meetingCount: sql<number>`5`,
            ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      
      return existingAgent;
    }),

    getMany: protectedProcedure.query(async () => {
    const existingAgents = await db
        .select()
        .from(agents);

    return existingAgents; // return all agents as array
}),

    

    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
            })
            .returning();

        return createdAgent;
    }),    
});