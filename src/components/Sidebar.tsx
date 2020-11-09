import React from "react";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import { IWatchList } from "../types/streams";

export default function Sidebar(props: any) {
  const classes = useStyles();

  const toggleDrawer = () => {
    props.setOpen(!props.open);
  };

  return (
    <Drawer
      style={{ height: "100vh" }}
      anchor="left"
      open={props.open}
      onClose={() => toggleDrawer()}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        height="100%"
      >
        <Box className={clsx(classes.list)} role="presentation">
          <Box ml={1} pt={2} pb={2}>
            Hello, Ryan Rozema
          </Box>
          <Accordion style={{ border: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Watch-list
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                {props.watchList.map((item: IWatchList) => (
                  <ListItem
                    button
                    key={item.id}
                    onClick={() =>
                      props.toggleWatchListForTitle(item.id, item.title)
                    }
                  >
                    <ListItemIcon>
                      <i
                        className="fas fa-heart"
                        style={{ color: "#E3242B" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Button onClick={() => {}}>Logout</Button>
      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles({
  list: { width: 250 },
  fullList: { width: "auto" },
});
