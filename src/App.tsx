import React, { useState } from "react";
import axios from "axios";
import AppBar from "./components/AppBar";
import MediaCard from "./components/MediaCard";
import Grid from "@material-ui/core/Grid";
import "./App.css";

const url: string =
  "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";

function App() {
  const [streams, setStreams] = useState([]);

  const fetchData = async (title: string) => {
    const result = await axios.get(`${url}/lookup?term=${title}&country=us`, {
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "4842e2378bmsh83cda0f16148544p1fb134jsn5e514e7959e2",
      },
    });
    setStreams(result.data.results);
    return result;
  };

  return (
    <div className="App">
      <AppBar fetchData={fetchData} setStreams={setStreams} />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify="center"
        style={{ marginTop: "1rem" }}
      >
        {streams.map((stream: any) => {
          console.log(stream);
          return (
            <Grid item xs={12} sm={6} md={3}>
              <MediaCard
                title={stream.name}
                picture={stream.picture}
                locations={stream.locations}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
