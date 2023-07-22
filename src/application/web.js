import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../docs/apidoc.js";

export const web = express();
web.use(express.json());
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
