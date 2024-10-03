const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, process.env.USER_PASSWORD);

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.json({
      message: "You are not signed in",
    });
  }
}

module.exports = {
  userAuth,
};
