import { Router, Request, Response } from "express";
import { ROUTES } from "./routes";
import { createUser, findUserById, findUsers, login, updateUser } from "../services/user.service";
import { ApiResponse } from "../types/ApiResponse";
import { User } from "../types/user";
import { CompanyPatchValidator, LoginValidator, UserValidator } from "../functions/validators";
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
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Number of page for the data
 *       - name: rows
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Number of rows to retrieve
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
router.get(ROUTES.USER, async (req: Request, res: Response) => {
  const filter = req.query || {};
  let response: ApiResponse<User[]>;
  try {
    const found = (await findUsers(filter)) as unknown as User[];
    response = {
      success: true,
      data: found,
    };
    res.status(200).send(response);
  } catch (error: any) {
    response = {
      success: false,
      message: error,
    };
    res.status(500).send(response);
  }
});

router.patch(
    ROUTES.USER,
    CompanyPatchValidator,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        let response: ApiResponse<User>;
        const { id, data } = req.body;
        try {
          const foundUser: any = await findUserById(id);
          const modifiedUser = { ...foundUser?._doc, ...data };
          const replaced: any = await updateUser(id, modifiedUser);
          response = {
            success: true,
            data: replaced,
          };
          res.status(200).send(response);
        } catch (error: any) {
          response = {
            success: false,
            message: error,
          };
          res.status(500).send(response);
        }
      }
    }
  );

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
    const newUser = (await createUser(reqUser)) as unknown as User;
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

router.get(
  `${ROUTES.USER}${ROUTES.LOGIN}`,
  LoginValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let response: ApiResponse<any>;
    try {
      const { userName, password } = req.query as {
        userName: string;
        password: string;
      };
      const loginData = await login(userName, password);
      response = {
        success: true,
        data: loginData,
      };
      res.status(200).send(response);
    } catch (error: any) {
      response = {
        success: false,
        message: error.message,
      };
      res.status(401).send(response);
    }
  }
);

export default router;
