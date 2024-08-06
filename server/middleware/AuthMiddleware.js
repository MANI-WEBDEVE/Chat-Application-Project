import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;
  if (!token) {
    console.log("No token found in cookies");
    return response.status(401).send("You are not Authorized");
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return response.status(403).send("JWT Token is not valid");
    }
    // console.log(payload)
    request.userId = payload.user;
    next();
  });
};
