const jwt = require("jsonwebtoken");
const protectedRoutes = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret");
    if (!decoded) {
      res.status(401).json({ success: false, message: "Not Autherized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token invalid" });
  }
};

module.exports = protectedRoutes;
