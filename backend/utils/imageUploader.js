import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async (file, folder, height, quality) => {
  cloudinary.config({
    cloud_name: "dlsye40kq",
    api_key: "736549993931816",
    api_secret: "ictap4wiVnHZfhmXzNeF0vm5-FU", // Click 'View API Keys' above to copy your API secret
  });
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
