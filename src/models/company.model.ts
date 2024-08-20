import mongoose from "mongoose";
import { taskSchema } from "./task.model";
const { Schema } = mongoose;

const imageSchema = new Schema({
  sid: String,
  url: String,
  task: taskSchema,
});

const siteSchema = new Schema({
  name: String,
  description: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  images: [imageSchema],
});

const projectSchema = new Schema({
  name: String,
  description: String,
  sites: [siteSchema],
});

const companySchema = new Schema({
  name: String,
  projects: [projectSchema],
});

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
