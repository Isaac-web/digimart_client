import React, { useRef, useState } from "react";

const VideoPicker = ({ onChange }) => {
  const videoPicker = useRef();
  const [videoPath, setVideoPath] = useState(null);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    const reader = new FileReader();

    reader.onload = (file) => {
      if (onChange) onChange(file, file.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        ref={videoPicker}
        type="file"
        accept="video/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default VideoPicker;
