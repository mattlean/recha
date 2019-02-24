import React, { ReactNode } from 'react'
import Dialog, { DialogContent, DialogFooter, DialogTitle } from '@material/react-dialog'

const Modal = ({
  children,
  buttons,
  onClose,
  isOpen,
  title
}: {
  buttons?: JSX.Element[]
  children?: ReactNode
  isOpen?: boolean
  onClose?: (action?: string) => void
  title?: string
}): JSX.Element => {
  const handleClose = onClose || undefined
  const header = title ? <DialogTitle>{title}</DialogTitle> : undefined

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {header}
      <DialogContent>{children}</DialogContent>
      <DialogFooter>{buttons}</DialogFooter>
    </Dialog>
  )
}

export default Modal
