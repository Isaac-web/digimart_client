import React, { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Button,
  IconButton,
  LinearProgress,
  Typography,
  CircularProgress,
} from "@mui/material";
import Form from "./form/Form";
import FormTextField from "./form/FormTextField";
import FormSubmitButton from "./form/FormSubmitButton";
import FormSwitch from "./form/FormSwitch";
import { useDispatch, useSelector } from "react-redux";
import { addSlider, updateSlider } from "../store/reducers/entities/sliders";
import { Close } from "@mui/icons-material";
import ImagePicker from "./AppImagePicker";
import { uploadFile } from "../utils/uploader";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  subtitle: Yup.string(),
  description: Yup.string(),
  imageUrl: Yup.string(),
  imagePublicId: Yup.string(),
});
const NewSliderDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const slide = useSelector((state) => state.details.slide);

  const handleUploadProgress = (loaded, total) => {
    setProgress(Math.floor(loaded / total) * 100);
  };

  const handleSubmit = async (data) => {
    if (image) {
      setSubmitting(true);
      setProgress(0);

      const { uploaded, url, public_id } = await uploadFile(
        image,
        "slider_images",
        handleUploadProgress
      );

      if (!uploaded) return;

      if (uploaded) {
        data.imageUrl = url;
        data.imagePublicId = public_id;
      }
    }

    if (slide?.data?._id) {
      dispatch(
        updateSlider(slide?.data?._id, data, () => {
          onClose();
          setSubmitting(false);
          setProgress(0);
        })
      );
    } else {
      dispatch(
        addSlider(data, () => {
          onClose();
          setSubmitting(false);
          setProgress(0);
        })
      );
    }
  };

  const handleImageChange = (image) => {
    setImage(image);
  };

  // const initialValues = ;

  // if (slide.loading) return (
  //   <Grid container>
  //     <Grid item>
  //       <CircularProgress size={"1em"} />
  //     </Grid>
  //   </Grid>
  // );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      {slide.loading ? (
        <Grid container justifyContent={"center"}>
          <Grid item>
            <CircularProgress size={"1em"} />
          </Grid>
        </Grid>
      ) : (
        <Form
          initialValues={{
            title: slide?.data?.title || "",
            subtitle: slide?.data?.subtitle || "",
            description: slide?.data?.description || "",
            imageUrl: slide?.data?.image?.url || "",
            imagePublicId: slide?.data?.image?.public_id || "",
            showTitle: slide?.data?.showTitle || false,
            showSubtitle: slide?.data?.showSubtitle || false,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <DialogTitle>
            <Grid container justifyContent={"space-between"}>
              <Grid item>New Slider</Grid>
              <Grid item>
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <Grid container spacing={3}>
              <FormTextField autoFocus xs={12} label="Title" name="title" />
              <FormTextField xs={12} label="Subtitle" name="subtitle" />
              <FormTextField
                xs={12}
                label="Description"
                name="description"
                multiline
                rows={3}
              />
            </Grid>

            <Grid item>
              <ImagePicker onChange={handleImageChange} imageUrl={slide?.data?.image?.url} />
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <FormSwitch
                  name="showTitle"
                  label="Show Title"
                  labelPlacement="right"
                />
              </Grid>
              <Grid item>
                <FormSwitch
                  name="showSubtitle"
                  label="Show Subtitle"
                  labelPlacement="right"
                />
              </Grid>
            </Grid>

            {submitting && (
              <Grid item sx={{ paddingBottom: "1em" }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="subtitle2">
                  Uploading: {progress.toFixed(2) || ""}%
                </Typography>
              </Grid>
            )}
          </DialogContent>

          <Divider variant="middle" />

          <DialogActions>
            <Button onClick={onClose} size="small" variant="text">
              Cancel
            </Button>
            <FormSubmitButton disabled={submitting} size="small">
              Save
            </FormSubmitButton>
          </DialogActions>
        </Form>
      )}
    </Dialog>
  );
};

export default memo(NewSliderDialog);
