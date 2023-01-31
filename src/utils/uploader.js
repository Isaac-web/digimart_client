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


export const getImagePresignedUrl = async (params) => {
  const api = axios.create({ baseURL: process.env.REACT_APP_API_URI });

  const { data } = await api.get("/uploads/image", { params });

  return data;
};

export const uploadAWSFile = async (url, file, callback) => {
  try {
    const { data } = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progress) => {
        if (callback)
          callback(Math.floor(progress.loaded * 100) / progress.total); //callback with the upload progress percentage as argument.
      },
    });

    return {
      uploaded: true,
      message: "File uploaded successfully",
    };
  } catch (err) {
    return {
      uploaded: false,
      message: "An error occured while uploading the file.",
    };
  }
};






