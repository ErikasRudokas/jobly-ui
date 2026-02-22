import {Button} from '@mui/material';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {backButtonStyle} from './styles';

interface BackButtonProps {
    label: string;
    onClick: () => void;
}

const BackButton = ({label, onClick}: BackButtonProps) => {
    return (
        <Button startIcon={<ArrowBackIcon />} onClick={onClick} sx={backButtonStyle}>
            {label}
        </Button>
    );
};

export default BackButton;

