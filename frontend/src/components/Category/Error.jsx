import { Box, Button, Typography } from '@mui/material';

export default function Error({ message, onClose }) {
  return (
    <Box>
      <Typography>{message}</Typography>
      <Button variant="outlined" color="primary" onClick={onClose}>Close</Button>
    </Box>
  );
}
