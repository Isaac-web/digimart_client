import React, { memo, useState } from "react";
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
} from "@mui/material";
import Form from "./form/Form";
import FormTextField from "./form/FormTextField";
import FormSubmitButton from "./form/FormSubmitButton";
import { useDispatch } from "react-redux";
import { addSlider } from "../store/reducers/entities/sliders";
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

    dispatch(
      addSlider(data, () => {
        onClose();
        setSubmitting(false);
        setProgress(0);
      })
    );
  };

  const handleImageChange = (image) => {
    setImage(image);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Form
        initialValues={{
          title: "",
          subtitle: "",
          description: "",
          imageUrl: "",
          imagePublicId: "",
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
            <ImagePicker onChange={handleImageChange} />
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
    </Dialog>
  );
};

export default memo(NewSliderDialog);
