import { JSX, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promiseInfo, setPromiseInfo] = useState<{
    resolve: (value: unknown) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromiseInfo({ resolve });
    });
  };

  const handleClose = () => {
    setPromiseInfo(null);
  };

  const handleConfirm = () => {
    if (promiseInfo) {
      promiseInfo.resolve(true);
      handleClose();
    }
  };

  const handleCancel = () => {
    if (promiseInfo) {
      promiseInfo.resolve(false);
      handleClose();
    }
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promiseInfo !== null}
      title={title}
      description={description}
      onOpenChange={(open: boolean) => {
        if (!open) handleClose();
      }}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={handleConfirm}
          className="w-full lg:w-auto"
        >
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};
