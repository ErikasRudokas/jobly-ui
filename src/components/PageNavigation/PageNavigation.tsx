import { Box, IconButton, Typography } from '@mui/material';
import {
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';
import { containerStyle, pageButtonStyle, pageInfoStyle } from './styles';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigation = ({ currentPage, totalPages, onPageChange }: PageNavigationProps) => {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Box sx={containerStyle}>
      {!isFirst && (
        <IconButton sx={pageButtonStyle} onClick={() => onPageChange(1)} aria-label="First page">
          <FirstPageIcon />
        </IconButton>
      )}

      {!isFirst && (
        <IconButton sx={pageButtonStyle} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
          <PrevIcon />
        </IconButton>
      )}

      <Typography sx={pageInfoStyle}>
        {currentPage} / {totalPages}
      </Typography>

      {!isLast && (
        <IconButton sx={pageButtonStyle} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">
          <NextIcon />
        </IconButton>
      )}

      {!isLast && (
        <IconButton sx={pageButtonStyle} onClick={() => onPageChange(totalPages)} aria-label="Last page">
          <LastPageIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default PageNavigation;
