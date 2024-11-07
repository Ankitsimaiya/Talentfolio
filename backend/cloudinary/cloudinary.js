// const { response } = require("express");
const fs = require("fs");

const { v2 } = require("cloudinary")


  // Configuration
  v2.config({
    cloud_name: "dijcbmejw",
    api_key: "167856256283721",
    api_secret: "UmuCpV2NQD4K98FhLhyianZyKTw", // Click 'View API Keys' above to copy your API secret
  });


const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;
    const response = await v2.uploader.upload(filepath, {
      resource_type: "auto",
    });
    console.log(response.url);
    fs.unlinkSync(filepath);
    return response;
  } catch (error) {
    fs.unlinkSync(filepath);
    return null;
  }
};

module.exports = uploadOnCloudinary
