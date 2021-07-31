import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
// Helper Functions
import { fetchIMDbData } from "../utils/api";

import AppIcon from "../images/PopcornIcon.png";
import { useStyles } from "../styles/AppSearchBar.styles";
import { IconButton } from "@material-ui/core";

export default function SearchAppBar(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      setLoading(true);
      const result = await fetchIMDbData(event.target.value);
      props.setStreams(result.data.d);
      setLoading(false);
      return result;
    }
  };

  return (
    <Box className={classes.root}>
      <AppBar elevation={1} position="fixed" style={{ background: "white" }}>
        <Toolbar>
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box height="100%" width="100%" display="flex" alignItems="center">
              <Box width="200px">
                <img src={AppIcon} alt="" width="200px" />
              </Box>
            </Box>
            <Box className={classes.search}>
              <Box className={classes.searchIcon}>
                {loading ? <CircularProgress size={24} /> : <SearchIcon />}
              </Box>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                onKeyPress={(e) => handleKeyDown(e)}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            <IconButton>
              <i style={{ color: "black" }} className="far fa-user-circle" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
