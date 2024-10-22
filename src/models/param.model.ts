import mongoose from "mongoose";
const { Schema } = mongoose;

export const paramSchema = new Schema({
  BUCKET_URL: String,
});

const ParamModel = mongoose.model("Param", paramSchema);

export default ParamModel;
