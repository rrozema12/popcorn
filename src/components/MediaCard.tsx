import React, { useState } from "react";
import axios from "axios";

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
// import ImageNotFound from "../images/image_not_found.png";
import { IStreamLocation } from "../types/streams";

function truncate(str: string, n: number) {
  if (str.length <= n) return str;

  const subString = str.substr(0, n - 1);
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

  const getStreamsForTitle = async (id: string) => {
    setSearching(true);
    const options: any = {
      method: "GET",
      url:
        "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
      params: { source_id: id, source: "imdb", country: "us" },
      headers: {
        "x-rapidapi-key": "4842e2378bmsh83cda0f16148544p1fb134jsn5e514e7959e2",
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      },
    };

    const response: any = await axios.request(options);
    setSearching(false);
    setLocations(response.data.collection.locations);
  };

  const handleClick = async (event: any, id: string) => {
    setAnchorEl(event.currentTarget);
    await getStreamsForTitle(id);
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
          <Typography variant="h5">{truncate(props.title, 25)}</Typography>
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
