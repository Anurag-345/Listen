import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Toolbar,
  Paper,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { NAPSTER_API_KEY } from "../constants";
import SongTableRow from "./SongTableRow";

const ArtistPage = () => {
  const { artist_id } = useParams();
  const [artistDetails, setArtistDetails] = useState({});
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.napster.com/v2.2/artists/${artist_id}?apikey=${NAPSTER_API_KEY}`
      );
      const data = await response.json();
      if (data.artists.length > 0) {
        setArtistDetails(data.artists[0]);
      }
      const song_response = await fetch(
        `https://api.napster.com/v2.2/artists/${artist_id}/tracks?apikey=${NAPSTER_API_KEY}&limit=20`
      );
      const song_data = await song_response.json();
      setSongList(song_data.tracks);
    })();
  }, [artist_id]);

  const image_url = `https://api.napster.com/imageserver/v2/artists/${artist_id}/images/633x422.jpg`;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Stack
        direction="row"
        spacing={5}
        sx={{
          "@media (max-width:1200px)": {
            display:'flex',
            flexDirection:'column'
          },
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "50%",
            height: "50vh",
            backgroundImage: `url('${image_url}')`,
            backgroundSize: "cover",
            "@media (max-width:1200px)": {
              width: "80%",
              height: "15em",
            },
          }}
        />
        <Box>
          <Typography
            variant="h2"
            sx={{
              pt: 4,
              "@media (max-width:900px)": {
                fontSize: "1.5rem",
              },
            }}
          >
            {artistDetails?.name}
          </Typography>
        </Box>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 12 }}>
        <Table
          size="small"
          sx={{ minWidth: "100px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "2rem",
                    "@media (max-width:600px)": {
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "2rem",
                    "@media (max-width:600px)": {
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  Album
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {songList.map((single_song, idx) => (
              <SongTableRow
                data={single_song}
                key={idx}
                index={idx}
                owner="artist"
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArtistPage;
