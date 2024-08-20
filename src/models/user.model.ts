import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: String
 *           description: The user's ID
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The user's password
 *           example: 123456
 *         firstName:
 *           type: String
 *           description: The user's first name
 *           example: John
 *         lastName:
 *           type: String
 *           description: The user's last name
 *           example: Doe
 */
const userSchema = new Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  company: mongoose.Types.ObjectId,
  isAdmin: Boolean,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
