const JWT = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json("invaild token");
    }
  } else {
    res.status(401).json("no token provided");
  }
}
function verifyTokenAuth(req, res, next) {
  verifyToken(req,res,()=>{
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }else{
      return res.status(403).json("yor arent allowed")
    }
  })
}
function verifyAdmin(req, res, next) {
  verifyToken(req,res,()=>{
    if (req.user.isAdmin) {
      next();
    }else{
      return res.status(403).json("yor arent Admin")
    }
  }
  )}
  
module.exports = { verifyToken, verifyTokenAuth,verifyAdmin };
