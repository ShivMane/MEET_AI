import { z } from "zod";

export const agentsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instrunctions: z.string().min(1, { message: "Instructions are required" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
    id: z.string().min(1, { message: "ID is required" }),
});