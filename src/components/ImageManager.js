import React, { useState } from "react";
import {
  MicrophoneIcon,
  PaperClipIcon,
  CameraIcon,
  VideoCameraIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const ImageManager = () => {
  const [image, setImage] = useState(null);

  const renderMedia = (media) => {
    const mediaType = media.type.split("/")[0];
    console.log(mediaType);
    switch (mediaType) {
      case "image":
        return <img className="w-full" src={URL.createObjectURL(media)} />;

      case "audio":
        return <audio className="w-full" src={media} controls />;
      case "video":
        return (
          <video className="w-full" src={URL.createObjectURL(media)} controls />
        );
      default:
        return media;
    }
  };

  const handleUploadFile = (file) => {
    setImage(file);
    console.log(file.type);
    // add the function to upload here
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Image upload</h1>
        <div className="flex space-x-2 items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <input
              className="absolute w-8 rounded-full opacity-0"
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadFile(e.target.files[0])}
            />
            <CameraIcon className="w-8 h-8" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-9 w-9 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <input
              className="absolute w-8 rounded-full opacity-0"
              type="file"
              accept="video/*"
              onChange={(e) => handleUploadFile(e.target.files[0])}
            />
            <VideoCameraIcon className="w-8 h-8" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-7 w-7 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <input
              className="absolute w-8 rounded-full opacity-0"
              type="file"
              accept="audio/*"
              onChange={(e) => handleUploadFile(e.target.files[0])}
            />
            <MicrophoneIcon className="w-8 h-8" />
          </button>
        </div>
        <div>{image && renderMedia(image)}</div>
      </div>
    </div>
  );
};

export default ImageManager;
