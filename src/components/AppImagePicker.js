import React, { useState, useRef } from "react";
import {
  Box,
  ButtonBase,
  Card,
  CardMedia,
  InputLabel,
  Tooltip,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const AppImagePicker = ({ onChange, name, types, label }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const fileInput = useRef();

  const raiseChange = ({ target: input }) => {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = (file) => {
      const url = file.target.result;
      setFileUrl(url);
    };
    reader.readAsDataURL(file);
    if (typeof onChange == "function") onChange(file);
  };

  return (
    <Tooltip title="Click to load photo">
      <Box style={{ margin: "1em 0" }}>
        <InputLabel shrink>{label}</InputLabel>
        <ButtonBase
          elevation={0}
          onClick={() => fileInput.current.click()}
          sx={{ width: "100%" }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
            >
              <CameraAltIcon
                sx={(theme) => ({
                  fontSize: "5em",
                  color: "rgba(0, 0, 0, 0.3)",
                })}
              />
            </Box>
            <Card
              elevation={0}
              sx={(theme) => ({
                width: "100%",
                height: "25em",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: 2,
              })}
            >
              <CardMedia
                style={{ width: "100%", height: "100%" }}
                component="img"
                height="194"
                image={fileUrl}
                alt=""
              />
            </Card>
            <input
              name={name}
              accept={"image/*"}
              ref={fileInput}
              style={{ display: "none" }}
              type="file"
              onChange={raiseChange}
            />
          </Box>
        </ButtonBase>
      </Box>
    </Tooltip>
  );
};

export default AppImagePicker;
