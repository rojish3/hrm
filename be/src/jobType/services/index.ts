import { TJobType } from "../../types";

import * as JobTypeRepository from "../repository/index";

export const postJobType = async (body: TJobType) => {
  try {
    const resopnse = await JobTypeRepository.postJobType(body);
    return resopnse;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getJobType = async () => {
  try {
    const resopnse = await JobTypeRepository.getJobType();
    return resopnse;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const deleteJobType = async (id: string) => {
  try {
    const resopnse = await JobTypeRepository.deleteJobType(id);
    return resopnse;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const updateJobType = async (id: string, data: TJobType) => {
  try {
    const resopnse = await JobTypeRepository.updateJobType(id, data);
    return resopnse;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};