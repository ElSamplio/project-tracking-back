import express from "express";
import cors from "cors";
import exampleRouter from "./routes/example";
import userRouter from "./routes/user";
import companyRouter from "./routes/company";
import taskRouter from "./routes/task";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import { ROUTES } from "./routes/routes";
import mongoose from "mongoose";
import authenticateJWT from "./middleware/authenticator";
const { BASE } = ROUTES;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONN_STRING as string;

//Middelware
app.use(express.json());
app.use(cors());
app.use(authenticateJWT);

// Routes
app.use(BASE, exampleRouter);
app.use(BASE, userRouter);
app.use(BASE, companyRouter);
app.use(BASE, taskRouter);

setupSwagger(app);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await mongoose.connect(dbConnectionString);
    console.log("DB connection successful");
  } catch (err) {
    console.log("Error connecting: ", err);
  }
});
