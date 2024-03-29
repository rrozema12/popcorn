import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../styles/MediaCard.styles";
import { IMediaCard } from "../types/prop_types";
import { IStreamLocation } from "../types/streams";
import { getStreamsForTitle } from "../utils/api";
import { truncate } from "../utils/helpers"

function truncateBox(str: string, n: number) {
 const subString = truncate(str, n)
  return (
    <Tooltip title={str}>
      <Box aria-label="title">{`${subString}...`}</Box>
    </Tooltip>
  );
}

export default function MediaCard(props: IMediaCard) {
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleClick = async (event: any, id: string) => {
    setAnchorEl(event.currentTarget);
    setSearching(true)
    const loc: any = await getStreamsForTitle(id);
    setLocations(loc.data.collection.locations);
    setSearching(false)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLocations([]);
  };

  return (
    <Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box p={2} display="flex" flexDirection="column">
          {searching ? (
            <CircularProgress />
          ) : locations && locations.length > 0 ? (
            locations.map((loc: IStreamLocation, index: number) => (
              <Box
                key={index}
                mb={2}
                style={{ cursor: "pointer" }}
                onClick={() => window.open(loc.url, "_blank")}
              >
                <img src={loc.icon} alt="" />
              </Box>
            ))
          ) : <Box fontFamily="Lato">
            No Streams Found
          </Box>
          }
        </Box>
      </Popover>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.picture || undefined}
          title={props.title}
        />
        <CardContent>
          <Typography variant="h5">{truncateBox(props.title, 25)}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => handleClick(e, props.IMDbId)}>
            <i className="fa fa-tv" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
