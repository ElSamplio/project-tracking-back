import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ROUTES } from "../routes/routes";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  // List of routes to skip JWT authentication
  const skipRoutes = [`${ROUTES.BASE}${ROUTES.USER}${ROUTES.LOGIN}`];

  if (skipRoutes.includes(req.path)) {
      return next(); // Skip the JWT authentication for these routes
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export default authenticateJWT;
