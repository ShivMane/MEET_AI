'use client';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
// import { ResponsiveDialog } from '@/components/responsive-dialog';
// import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns} from '../components/column';
import { EmptyState } from '@/components/empty-state';


export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data = {data} columns={columns}/>
      {data.length === 0 && (
        <EmptyState 
          title="Create your First Agent" 
          description="Create an Agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agents..." 
      description="This may take few seconds."
    />
  );
};

export const AgentsViewError = () => {
  return(
    <ErrorState 
            title="Failed to load Agents"
            description="Please try again later."
        />
  )
}