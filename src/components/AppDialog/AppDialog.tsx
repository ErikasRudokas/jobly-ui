import type {ReactNode} from 'react';
import type {ButtonProps, DialogProps} from '@mui/material';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from '@mui/material';
import {dialogActionsStyle} from './styles';

interface AppDialogAction {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    disabled?: boolean;
}

interface AppDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    actions: AppDialogAction[];
    children: ReactNode;
    maxWidth?: DialogProps['maxWidth'];
    fullWidth?: boolean;
}

const AppDialog = ({
    open,
    title,
    onClose,
    actions,
    children,
    maxWidth,
    fullWidth,
}: AppDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions sx={dialogActionsStyle}>
                {actions.map((action) => (
                    <Button
                        key={action.label}
                        onClick={action.onClick}
                        variant={action.variant}
                        color={action.color}
                        disabled={action.disabled}
                    >
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default AppDialog;

