const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, process.env.ADMIN_PASSWORD);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.json({
      message: "Invalid credentials",
    });
  }
}

module.exports = {
  adminAuth,
};
