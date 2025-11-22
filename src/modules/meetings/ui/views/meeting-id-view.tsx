"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";

interface Props{
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props ) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are You Sure?",
        "The Following Action will remove this meeting"
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                // TODO: Invalid free tier Usage
                router.push("/meetings");
            },
            onError: () => {}
        }),
    );

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok){
            return;
        }

        await removeMeeting.mutateAsync({ id: meetingId });
    }

    return(
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog 
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader 
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}                />
                {JSON.stringify(data, null, 2)}
            </div>
        </>
    )
}

export const MeetingIdViewLoading = () => {
    return(
        <LoadingState 
            title="Loading Meeting"
            description="This May Take few seconds"
        />
    );
};

export const MeetingIdViewError = () => {
    return(
        <ErrorState
            title="Error Loading Meeting"
            description="Please Try Again Later"
        />
    );
};