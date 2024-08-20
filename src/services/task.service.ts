import TaskModel from "../models/task.model";
import { Task } from "../types/task";

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const createdTask = (await TaskModel.create(task)) as unknown as Task;
    return createdTask;
  } catch (error) {
    throw error;
  }
};

export const findTaskById = async (id: String) => {
  try {
    return await TaskModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const findTasks = async (filter: Object) => {
  try {
    return await TaskModel.find(filter);
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: String, task: Task) => {
  try {
    return await TaskModel.replaceOne({ _id: id }, { ...task });
  } catch (error) {
    throw error;
  }
};
