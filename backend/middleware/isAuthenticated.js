import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // ✅ Support both styles
    req.id = decode.userId;              // for profile update
    req.user = { _id: decode.userId };   // for generate link, etc.

    next();
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};
