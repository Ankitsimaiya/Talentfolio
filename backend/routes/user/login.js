const User = require("../../db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  // data validate
  if (!email || !password) {
    return res.status(402).json({ message: "enter valid credencials" });
  }

  //user validate
  const isUser = await User.findOne({ email: email });
  if (!isUser) {
    return res.status(200).json({ message: "User not found" });
  }

  //password match
  const match = await bcrypt.compare(password, isUser.password);
  if (!match) {
    return res.status(200).json({ message: " incorrect password" });
  }

  //token genrate
  const token = jwt.sign(
    {
      id: isUser._id,
      name: isUser.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  res.status(200).json({ message: "login successfully", token: token });
}

module.exports = login;
 