"use client"
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

import { ConfirmDialog, ConfirmDialogProps, DialogResult } from '../../app/_components/molcures/confirm-dialog/confirm-dialog'

type ConfirmDialog = typeof ConfirmDialog
type ContextValue = [(props: ConfirmDialog) => void, () => void]

const DialogContext = createContext<ContextValue | undefined>(undefined)

function useDialogContext() {
  const context = useContext(DialogContext)

  if (!context) {
    throw Error('useDialogContext must be used within a DialogProvider')
  }

  return context
}

export function DialogProvider({ children }: PropsWithChildren<unknown>) {
  const [dialog, setDialog] = useState<ConfirmDialog>()
  const value = useMemo<ContextValue>(() => [setDialog, () => setDialog(undefined)], [])

  return (
    <DialogContext.Provider value={value}>
      <>
        {children}
        {dialog}
      </>
    </DialogContext.Provider>
  )
}


export const useDialog = () => {
  const [handleOpen, handleClose] = useDialogContext()

  const open = (props: ConfirmDialogProps) =>
    new Promise<DialogResult>(resolve => {

      handleOpen(() => (
        <ConfirmDialog {...props} onClose={(result) => {
          handleClose()
          resolve(result)
        }} />
      ))
    })


  const alert = async (props: ConfirmDialogProps) => {
    await open({
      submitLabel: 'OK',
      ...props,
    })
  }

  const confirm = async (props: ConfirmDialogProps) => {
    const result = await open({
      submitLabel: 'OK',
      cancelLabel: 'キャンセル',
      ...props,
    })

    return result
  }

  return {
    alert,
    confirm,
  }
}
