import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 300
  },
  media: {
    height: 140,
  },
});

const TARGET_PLATFORMS = ["Amazon Instant Video", "Netflix", "Hulu"];

export default function MediaCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.picture}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.locations.map((location: any) => {
          if (TARGET_PLATFORMS.includes(location.display_name)) {
            return (
              <Button
                key={location.id}
                size="small"
                color="primary"
                onClick={() => window.open(location.url, "_blank")}
              >
                <img src={location.icon} alt="" />
              </Button>
            );
          }
          return null;
        })}
      </CardActions>
    </Card>
  );
}
