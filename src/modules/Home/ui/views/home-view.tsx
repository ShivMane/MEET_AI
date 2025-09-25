"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({ text: "Shiv"}));

  return (
      <div className="p-4 flex flex-col gap-y-4">
        {data?.greeting}
      </div>
    );
};