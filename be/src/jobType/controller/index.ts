import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import * as JobTypeService from "../services/index";

export const postJobType = catchAsync(async (req: Request, res: Response) => {
  const { username } = res.locals.user;
  const body = { ...req.body, entered_by: username };
  const { status, message, data } = await JobTypeService.postJobType(body);
  return res.status(status).json({ message, data });
});

export const getJobType = catchAsync(async (req: Request, res: Response) => {
  const { status, message, data } = await JobTypeService.getJobType();
  return res.status(status).json({ message, data });
});

export const deleteJobType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await JobTypeService.deleteJobType(id);
  return res.status(status).json({ message });
});

export const updateJobType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const { status, message } = await JobTypeService.updateJobType(id, body);
  return res.status(status).json({ message });
});
