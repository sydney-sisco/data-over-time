import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function Data ({ data, deleteThought }) {
  const date = new Date(data.createdAt);
  const localTime = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  const localDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.category ? data.category : data.name}
        </Typography>
        {data.values && Object.keys(data.values).map((key, i) => (
          <Typography 
            key={i}
            variant="body2">
              {key} : {data.values[key]}
          </Typography>
        ))}
        
      </CardContent>
      <CardActions>
        <Button size="small">{localDate} - {localTime}</Button>
      </CardActions>
    </Card>
  )
};
