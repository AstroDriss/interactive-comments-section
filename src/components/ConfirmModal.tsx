import { useEffect, useRef } from "react";
import useConfirm from "../hooks/useConfirm";

const ConfirmDialog = () => {
  const { onConfirm, onCancel, confirmState } = useConfirm();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (confirmState) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [confirmState]);

  return (
    <dialog
      className="max-w-[360px] p-6 rounded-md backdrop:bg-black/30 mx-3"
      onClose={onCancel}
      ref={dialogRef}
    >
      <h2 className="mb-1 text-xl font-bold text-grayishBlue">
        Delete Comment
      </h2>
      <p className="text-grayishBlue">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={onCancel}
          className="py-2 font-semibold text-white rounded-md bg-grayishBlue"
        >
          NO, CANCEL
        </button>
        <button
          onClick={onConfirm}
          className="py-2 font-semibold text-white rounded-md bg-softRed"
        >
          YES, DELETE
        </button>
      </div>
    </dialog>
  );
};
export default ConfirmDialog;
