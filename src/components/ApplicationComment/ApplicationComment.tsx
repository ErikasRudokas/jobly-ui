import { Box, Typography } from '@mui/material';
import { commentBoxStyle, commentTextStyle, sectionTitleStyle } from './styles';

interface ApplicationCommentProps {
  comment: string;
}

const ApplicationComment = ({ comment }: ApplicationCommentProps) => {
  return (
    <Box>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Your Comment
      </Typography>
      <Box sx={commentBoxStyle}>
        <Typography sx={commentTextStyle}>{comment}</Typography>
      </Box>
    </Box>
  );
};

export default ApplicationComment;
