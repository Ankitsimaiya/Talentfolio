const Media = require("../../db/mediaModel");
const User = require("../../db/userModel");

async function details(req, res) {
  const { id } = req.user;
  if (!id)
    return res
      .status(404)
      .json({ message: "you are not Logged in, Please Login" });

  try {
    const user = await User.findOne({ _id: id },{password:0});
    const media = await Media.find({ userId: id });
    res.status(200).json({ user, media });
  } catch (error) {
    return res.status(404).json({ message: "unable to get users details" ,error });
  }
}

module.exports = details;
