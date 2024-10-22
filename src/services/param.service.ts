import ParamModel from "../models/param.model";

export const findParams = async (filter: Object) => {
  try {
    return await ParamModel.find(filter);
  } catch (error) {
    throw error;
  }
};
