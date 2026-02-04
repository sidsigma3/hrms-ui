import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
