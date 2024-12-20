const Media = require("../../db/mediaModel");
const cloudinary = require("cloudinary");
const User = require("../../db/userModel");

async function deleteMedia(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ message: "please login" });

  const media = await Media.findById(id);

  if (media.userId != userId)
    return res.json({
      message: "You are not authorize to delete another's media",
    });

  const publicId = media.url.split("/").pop().split(".")[0]; //extracting the public id

  try {
    const ck = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: media.mediaType,
    });

    if (ck.result != "ok") return res.json({ message: "Already Deleted" });
    await Media.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $inc: { mediaCount: -1 } });
    res.json({ message: "media deleted" });
    
  } catch (error) {
    return res.status(400).json({ message: "error in deleting users" });
  }
}

module.exports = deleteMedia;
