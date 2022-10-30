import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PlayerCard = ({ playerName, position, status, isAuth }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {playerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={!isAuth} size="small">
          Show
        </Button>
        <Button disabled={!isAuth} size="small">
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
