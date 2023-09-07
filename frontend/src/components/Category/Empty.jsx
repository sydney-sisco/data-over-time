import { Card, CardContent, Button, Typography } from '@mui/material';

export default function Empty({ onAdd }) {
  return (
    <Card>
      <CardContent>
        <Typography>Click to add a new Category.</Typography>
        <Button variant="contained" color="primary" onClick={onAdd}>Add</Button>
      </CardContent>
    </Card>
  );
}
