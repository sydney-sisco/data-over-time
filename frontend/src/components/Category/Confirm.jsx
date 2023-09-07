import { Card, CardContent, Button, Typography } from '@mui/material';

export default function Confirm({ message, onConfirm, onCancel }) {
  return (
    <Card>
      <CardContent>
      <Typography>{message}</Typography>
      <Button variant="contained" color="primary" onClick={onConfirm}>Confirm</Button>
      <Button variant="outlined" color="primary" onClick={onCancel}>Cancel</Button>
      </CardContent>
    </Card>
  );
}
