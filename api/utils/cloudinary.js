import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtq4gpmte",
  api_key: "856723178982475",
  api_secret: "Ks0odBQIl1kjdYdmRL3ELXgluVg",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "/teacher",
    });
    // console.log("File Uploaded");
    console.log(response.url);
    return response;
  } catch (error) {
    console.log("Something went wrong!!in uploaded to cloudinary");
    console.log(error);
  }
};

export { uploadOnCloudinary };
