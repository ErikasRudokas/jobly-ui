import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from '@mui/material';
import {dialogActionsStyle} from './styles';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    confirmColor?: 'error' | 'primary' | 'warning' | 'success' | 'inherit';
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({
    open,
    title,
    description,
    confirmLabel,
    cancelLabel = 'Cancel',
    confirmColor = 'error',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions sx={dialogActionsStyle}>
                <Button onClick={onCancel}>{cancelLabel}</Button>
                <Button onClick={onConfirm} color={confirmColor} variant="contained">
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;

