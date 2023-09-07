import { Card, CardContent, Button, Typography } from '@mui/material';

export default function Confirm({ message, onConfirm, onCancel }) {
  return (
    <Card>
      <CardContent>
      <Typography>{message}</Typography>
      <Button variant="contained" color="primary" onClick={onCancel} sx={{mr:2}}>Cancel</Button>
      <Button variant="outlined" color="error" onClick={onConfirm}>Confirm</Button>
      </CardContent>
    </Card>
  );
}
