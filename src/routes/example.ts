import { Router, Request, Response } from "express";
import { ROUTES } from "./routes";

const router = Router();

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Example route
 *     responses:
 *       200:
 *         description: Returns an example message
 */
router.get(ROUTES.EXAMPLE, (req: Request, res: Response) => {
  res.json({ message: "This is an example route" });
});

export default router;
