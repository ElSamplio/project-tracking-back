import { Router, Request, Response } from "express";
import { ROUTES } from "./routes";
import {
  createCompany,
  findCompanies,
  findCompanyById,
  updateCompany,
} from "../services/company.service";
import { ApiResponse } from "../types/ApiResponse";
import { Company } from "../types/company";
import {
  CompanyValidator,
  CompanyPatchValidator,
} from "../functions/validators";
import { validationResult } from "express-validator";

const router = Router();

router.post(
  ROUTES.COMPANY,
  CompanyValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let response: ApiResponse<Company>;
    try {
      const newCompany = await createCompany(req.body as Company);
      response = {
        success: true,
        data: newCompany,
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
);

router.get(`${ROUTES.COMPANY}/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  let response: ApiResponse<Company>;
  try {
    const company = (await findCompanyById(id)) as unknown as Company;
    response = {
      success: true,
      data: company,
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

router.get(ROUTES.COMPANY, async (req: Request, res: Response) => {
  const filter = req.query || {};
  let response: ApiResponse<Company[]>;
  try {
    const found = (await findCompanies(filter)) as unknown as Company[];
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
  ROUTES.COMPANY,
  CompanyPatchValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let response: ApiResponse<Company>;
      const { id, data } = req.body;
      try {
        const foundCompany: any = await findCompanyById(id);
        const modifiedCompany = { ...foundCompany?._doc, ...data };
        const replaced: any = await updateCompany(id, modifiedCompany);
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

export default router;
