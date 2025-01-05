import { useContext } from "react";
import { ConfirmContext } from "../context/ConfirmContextProvider";

let resolveCallback: (value: boolean) => void;

function useConfirm() {
  const [confirmState, setConfirmState] = useContext(ConfirmContext)!;

  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = () => {
    setConfirmState(true);

    return new Promise((res) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    setConfirmState(false);
  };

  return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;
