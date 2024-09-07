import { Button } from "@luna/app/_components/atoms/button/button";
import { Modal } from "@luna/app/_components/atoms/modal/modal";
import { emptyFunction } from "@luna/utils/utils";

export type DialogResult = "ok" | "cancel";

export type ConfirmDialogProps = {
  title?: string;
  body?: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onClose?: (result: DialogResult) => void;
};

export function ConfirmDialog({
  title = "確認",
  body,
  submitLabel,
  cancelLabel,
  onClose = emptyFunction,
}: ConfirmDialogProps) {
  return (
    <Modal
      close={() => onClose("cancel")}
      title={title}
      actions={
        <>
          {cancelLabel && (
            <Button onClick={() => onClose("cancel")}>{cancelLabel}</Button>
          )}
          {submitLabel && (
            <Button onClick={() => onClose("ok")}>{submitLabel}</Button>
          )}
        </>
      }
    >
      {body}
    </Modal>
  );
}
