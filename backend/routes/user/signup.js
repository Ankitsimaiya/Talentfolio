const bcrypt = require("bcrypt");
const User = require("../../db/userModel");

const signup = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("incomplete data");
  }

  // password hashing
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //storing data in database
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.status(402).json({ msg: "user already exists" });
  }

  const user = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  res.status(200).json({ message: "user created successfully" });
};

module.exports = signup;
