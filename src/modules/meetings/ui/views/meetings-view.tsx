"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/column";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));


    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
          <DataTable data={data.items} columns={columns}/>
          {data.items.length === 0 && (
                  <EmptyState
                    title="Create your First Meeting" 
                    description="Create an Agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
                  />
                )}
        </div>
    );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings..." 
      description="This may take few seconds."
    />
  );
};

export const MeetingsViewError = () => {
  return(
    <ErrorState
            title="Failed to load Meetings"
            description="Please try again later."
        />
  );
};