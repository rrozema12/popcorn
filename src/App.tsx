import React, { useState } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import AppBar from "./components/AppBar";
import MediaCard from "./components/MediaCard";
import { IWatchList, IStream } from "./types/streams";

function App() {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [watchList, setWatchList] = useState<IWatchList[]>([]);

  const fetchIMDbData = async (title: string) => {
    const options: any = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/auto-complete",
      params: { q: title },
      headers: {
        "x-rapidapi-key": "4842e2378bmsh83cda0f16148544p1fb134jsn5e514e7959e2",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    };
    const result = await axios.request(options);
    setStreams(result.data.d);
    return result;
  };

  const toggleWatchListForTitle = (IMDbId: string, title: string) => {
    if (
      watchList.filter((item: IWatchList) => {
        if (item.id === IMDbId) return item;
        return null;
      }).length === 0
    ) {
      return setWatchList([{ id: IMDbId, title: title }, ...watchList]);
    }

    const filteredWatchList = watchList.filter(
      (item: IWatchList) => item.id !== IMDbId
    );
    return setWatchList([...filteredWatchList]);
  };

  return (
    <Box style={{ textAlign: "center" }}>
      <AppBar fetchIMDbData={fetchIMDbData} setStreams={setStreams} />
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
                toggleWatchListForTitle={toggleWatchListForTitle}
                watchList={watchList}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default App;
