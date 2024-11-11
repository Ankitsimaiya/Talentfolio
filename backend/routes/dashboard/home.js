const Media = require("../../db/mediaModel");

async function homeMedia(req, res) {
  try {
    const mediaItem = await Media.aggregate([
      { $match: { hide: false } },
      { $sample: { size: 20 } },
    ]);

    res.status(200).json(mediaItem);
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch the media", error });
  }
}

module.exports = homeMedia;
