'use client';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return (
    <div>
      {data?.map((agent) => (
        <div key={agent.id}>{agent.name}</div>
      ))}
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