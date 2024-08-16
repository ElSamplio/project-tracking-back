import mongoose from "mongoose";
const { Schema } = mongoose;

export const taskSchema = new Schema({
  companyId: { type: mongoose.Types.ObjectId, required: true },
  description: String,
});

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
