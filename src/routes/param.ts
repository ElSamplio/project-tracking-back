
import { Router, Request, Response } from "express";
import { ROUTES } from "./routes";
import { Param } from "../types/param";
import { ApiResponse } from "../types/ApiResponse";
import { findParams } from "../services/param.service";

const router = Router();

router.get(ROUTES.PARAM, async (req: Request, res: Response) => {
    const filter = req.query || {};
    let response: ApiResponse<Param[]>;
    try {
      const found = (await findParams(filter)) as unknown as Param[];
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

  export default router;
