import imageCompressor from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 1,
};

export const compressFile = (imageFile: File, option = defaultOptions) => {
  return imageCompressor(imageFile, option);
};

export const downloadFile = (file: File) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  link.click();
  window.URL.revokeObjectURL(url);
};
