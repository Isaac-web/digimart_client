import { VideoCameraBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

const VideoPicker = ({ onChange }) => {
  const videoPicker = useRef();
  const [video, setVideo] = useState(null);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    console.log(file);

    const reader = new FileReader();

    reader.onload = (file) => {
      if (onChange) {
        setVideo(file);
      }
    };

    onChange(file);
    reader.readAsDataURL(file);
  };

  return (
    <Box
      onClick={() => videoPicker.current.click()}
      sx={(theme) => ({
        padding: "5em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: `1px dashed ${
          !video ? theme.palette.common.medium : theme.palette.success.light
        }`,
        borderRadius: "0.5em",
      })}
    >
      <VideoCameraBack
        sx={(theme) => ({
          fontSize: "6em",
          color: !video
            ? theme.palette.common.light
            : theme.palette.primary.light,
        })}
      />

      {!video && (
        <Button size="small" variant="text">
          Load A New Video
        </Button>
      )}
      {video && (
        <Button size="small" variant="text">
          Change Video
        </Button>
      )}
      <input
        ref={videoPicker}
        type="file"
        accept="video/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default VideoPicker;
