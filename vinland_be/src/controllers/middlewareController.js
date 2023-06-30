const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            message: "Invalid token",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "You are not authenticated!",
      });
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json({
          status: 403,
          message: "You are not allowed to do that!",
        });
      }
    });
  },
};
module.exports = middlewareController;
