import axios from "axios";

export const uploadFile = async (image, upload_preset, callback) => {
  if (!image) throw new Error("Image is not provided");
  if (!upload_preset) throw new Error("upload_preset is not provided.");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", upload_preset);

  const handleProgress = (progress) => {
    if (callback) callback(progress.loaded, progress.total);
  };

  const config = { onUploadProgress: handleProgress };
  const payload = { url: null, uploaded: false };

  try {
    const result = await axios.post(
      process.env.REACT_APP_CLOUDINARY_URL,
      formData,
      config
    );

    payload.url = result?.data.url;
    payload.public_id = result?.data.public_id;

    payload.uploaded = true;
  } catch (error) {
    payload.uploaded = false;
    console.log(error);
  }

  return payload;
};