// Libraries
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Components
import AppBar from "./components/AppBar";
import MediaCard from "./components/MediaCard";

// Interfaces & Types
import { IStream } from "./types/streams";

function App() {
  const [streams, setStreams] = useState<IStream[]>([]);

  return (
    <Box style={{ textAlign: "center" }}>
      <AppBar setStreams={setStreams} />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify="center"
        style={{
          marginTop: "5rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
        }}
      >
        {streams.map((stream: IStream, index: number) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <MediaCard
                IMDbId={stream.id}
                title={stream.l}
                picture={(stream.i && stream.i.imageUrl) || null}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default App;
