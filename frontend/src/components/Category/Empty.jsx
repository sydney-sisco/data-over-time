import { Card, CardContent, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Empty({ onAdd }) {
  return (
    <Card>
      <CardContent>
        <Typography>Click to add a new Category.</Typography>
        <Button variant="contained" color="secondary" onClick={onAdd} startIcon={<AddIcon/>}>New</Button>
      </CardContent>
    </Card>
  );
}
