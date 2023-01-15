import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NewSliderDialog from "./NewSliderDialog";
import { deleteSlider, fetchSliders } from "../store/reducers/entities/sliders";
import { useRef } from "react";
import Slide from "./Slide";
import { fetchSlide, clearCurrentSlide } from "../store/reducers/details/slide";

const Sliders = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const sliders = useSelector((state) => state.entities.sliders);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(clearCurrentSlide());
  };

  const handleDelete = (slider) => {
    dispatch(deleteSlider(slider));
  };

  const handleEdit = (slide) => {
    dispatch(fetchSlide(slide._id))
    setOpen(true);
  }

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchSliders());
      apiCalled.current = true;
    }
  }, []);

  return (
    <Box sx={{ overflowX: "auto", padding: "0.5em 0" }}>
      <Grid container>
        <Grid
          item
          container
          justifyContent={"space-between"}
          sx={{ paddingBottom: "1em" }}
        >
          <Grid item>
            <Typography variant="h5">Sliders</Typography>
          </Grid>

          <Grid item>
            <Button onClick={handleOpenDialog} startIcon={<Add />} size="small">
              New Slider
            </Button>
          </Grid>
        </Grid>
        <Grid item container>
          <NewSliderDialog open={open} onClose={handleCloseDialog} />
        </Grid>
      </Grid>

      <Box>
        <Grid
          container
          spacing={3}
          flexWrap="nowrap"
          sx={{ overflowX: "auto" }}
        >
          {sliders.data.items.map((item, index) => (
            <Grid item>
              <Slide
                onEdit={() => handleEdit(item)}
                key={index}
                fullWidth={false}
                imageUrl={item?.image?.url}
                onDelete={() => handleDelete(item)}
                title={item.title}
                subtitle={item.subtitle}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {!sliders?.data?.items?.length && (
        <Box
          sx={(theme) => ({
            height: "15em",
          })}
        >
          <Grid container spacing={1} sx={{ padding: "2em 0" }}>
            <Grid
              item
              container
              direction="column"
              justifyContent={"center"}
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="h5">There are no sliders</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" align="">
                  Looks like you have added sliders yet.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default memo(Sliders);
