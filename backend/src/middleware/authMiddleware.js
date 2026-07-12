const jwt = require("jsonwebtoken");
 
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

const isClient = (req, res, next) => {
    try {

        if (req.user.role !== "client") {
            return res.status(403).json({
                success: false,
                message: "Only clients are allowed to create jobs.",
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Role verification failed.",
        });
    }
};

module.exports = { isClient, protect };