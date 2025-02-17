import jwt from "jsonwebtoken";

const authenticate = (request, response, next) => {
  const token = request.header("Authorization")?.split(" ")[1];

  if (!token) {
    return response.status(401).send({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded.userId; 
    next();
  } catch (error) {
    return response.status(401).send({ message: "Invalid token" });
  }
};

export default authenticate;
