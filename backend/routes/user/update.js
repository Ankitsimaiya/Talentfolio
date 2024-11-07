const User = require("../../db/userModel");

async function update(req, res) {
  const { id, name } = req.user;
  const { social, contact, location,bio } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  try {
    const ak = await User.updateOne(
      { _id: user._id },
      {
        contact: contact,
        social: social,
        location: location,
        bio:bio
      }
    );
    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    return res.status(401).json({ message: "error in user update" , error});
  }
}

module.exports = update;
