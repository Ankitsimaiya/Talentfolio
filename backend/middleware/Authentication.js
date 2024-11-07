const jwt = require("jsonwebtoken");

async function Authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("middleware authetication");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "no user loged in" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.body.user = decoded;
  next();
}

module.exports = Authentication;
