import React, { useState } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import AppBar from "./components/AppBar";
import MediaCard from "./components/MediaCard";
import Sidebar from "./components/Sidebar";
import { IWatchList, IStream } from "./types/streams";

const GIPHY_URLS: Array<string> = [
  "https://giphy.com/embed/12aW6JtfvUdcdO",
  "https://giphy.com/embed/NipFetnQOuKhW",
  "https://giphy.com/embed/gSRkSblDEjUuk",
  "https://giphy.com/embed/tFK8urY6XHj2w",
  "https://giphy.com/embed/Bi6FcO7UoutWM",
  "https://giphy.com/embed/oyQ5Qf9Ihu3ctAe4hw",
  "https://giphy.com/embed/RHiD0K65NxxLO",
  "https://giphy.com/embed/UlqLDtI8Qc0j6",
  "https://giphy.com/embed/Z0tFWbRWGwwTe",
  "https://giphy.com/embed/d3YQCPcckxQiYibe",
];

function App() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [watchList, setWatchList] = useState<IWatchList[]>([]);

  const fetchIMDbData = async (title: string) => {
    setLoading(true);
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

    setTimeout(() => {
      setStreams(result.data.d);
      setLoading(false);
    }, 1500);

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
    <div style={{ textAlign: "center" }}>
      <AppBar
        fetchIMDbData={fetchIMDbData}
        setStreams={setStreams}
        setOpen={setOpen}
      />
      <Sidebar
        open={open}
        setOpen={setOpen}
        watchList={watchList}
        toggleWatchListForTitle={toggleWatchListForTitle}
      />
      {loading ? (
        <Box mt={2}>
          <iframe
            title="popcorn-loader"
            src={GIPHY_URLS[Math.floor(Math.random() * GIPHY_URLS.length)]}
            width="351"
            height="480"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          style={{
            marginTop: "1rem",
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
      )}
    </div>
  );
}

export default App;
