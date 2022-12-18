import axios from "axios";

export const uploadFile = async (file, upload_preset, callback) => {
  if (!file) throw new Error("File is not provided");
  if (!upload_preset) throw new Error("upload_preset is not provided.");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  const handleProgress = (progress) => {
    if (callback) callback(progress.loaded, progress.total);
  };

  const config = { onUploadProgress: handleProgress };
  const payload = { url: null, uploaded: false };

  const api = axios.create();
  try {
    const result = await api.post(
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
