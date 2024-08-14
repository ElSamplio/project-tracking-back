import { Router, Request, Response } from "express";
import { ROUTES } from "./routes";
import { createUser } from "../services/user.service";
import { ApiResponse } from "../types/ApiResponse";
import { User } from "../types/user";
import { UserValidator } from "../functions/validators";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     tags:
 *       - Users
 *
 *     responses:
 *       200:
 *         description: Returns the users list
 *         content:
 *           schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/User'
 *
 */
router.get(ROUTES.USER, async (req: Request, res: Response) => {});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Creates new user
 *     description: Creates a new user in the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 *     responses:
 *       200:
 *         description: Returns the created user
 *         content:
 *           schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/User'
 *
 */
router.post(ROUTES.USER, UserValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let response: ApiResponse<User>;
  try {
    const reqUser: User = req.body;
    const hashedPassword = bcrypt.hashSync(
      reqUser.password,
      bcrypt.genSaltSync()
    );
    reqUser.password = hashedPassword;
    const newUser = await createUser(reqUser);
    response = {
      success: true,
      message: "User created",
      data: newUser,
    };
    res.status(200).send(response);
  } catch (err: any) {
    response = {
      success: false,
      message: err,
    };
    res.status(500).send(response);
  }
});

export default router;
