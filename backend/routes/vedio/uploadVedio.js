const uploadOnCloudinary = require("../../cloudinary/cloudinary.js");
const Media = require("../../db/mediaModel.js");
const User = require("../../db/userModel.js");

async function uploadVedio(req, res) {
  const { id } = req.user;
  const { title, description, categories } = req.body;

  const user = await User.findById(id);
  if (user.mediaCount >= 6)
    return res.status(400).json({
      message: "You exceed your upload limit you upload just 6 ducuments",
    });

  if (!id || !title || !categories)
    return res.json({ message: "please enter valid credentials" });

  //   console.log(req.body);

  const imagePath = req.files?.image[0].path;
  const media = await uploadOnCloudinary(imagePath);

  if (!media) return res.json({ message: "please upload vedio/image" });
  // console.log("url", media.secure_url)
  // console.log("type" ,media.resource_type)
  // console.log("media", media);

  await Media.create({
    userId: id,
    title: title,
    description: description,
    categories: categories,
    mediaType: media.resource_type,
    url: media.secure_url,
  });

  user.mediaCount += 1;
  await user.save();

  res.status(200).json({ message: "media uploaded successfully" });
}

module.exports = uploadVedio;
