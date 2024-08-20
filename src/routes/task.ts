import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ROUTES } from "./routes";
import { CompanyPatchValidator, TaskValidator } from "../functions/validators";
import { Task } from "../types/task";
import { ApiResponse } from "../types/ApiResponse";
import { createTask, findTasks, findTaskById, updateTask } from "../services/task.service";

const router = Router();

router.post(ROUTES.TASK, TaskValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let response: ApiResponse<Task>;
  try {
    const newTask = await createTask(req.body as Task);
    response = {
      success: true,
      data: newTask,
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

router.get(ROUTES.TASK, async (req: Request, res: Response) => {
  const filter = req.query || {};
  let response: ApiResponse<Task[]>;
  try {
    const found = (await findTasks(filter)) as unknown as Task[];
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
    ROUTES.TASK,
    CompanyPatchValidator,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        let response: ApiResponse<Task>;
        const { id, data } = req.body;
        try {
          const foundTask: any = await findTaskById(id);
          const modifiedTask = { ...foundTask?._doc, ...data };
          const replaced: any = await updateTask(id, modifiedTask);
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
