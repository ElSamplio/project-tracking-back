import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Project Tracking API with TypeScript",
      version: "1.0.0",
      description: "API Docs for Project tracking endpoints",
    },
    servers: [
      {
        url: `http://localhost:3003/api`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
};
