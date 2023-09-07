import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { appRouter } from "./routes";
// import logger from "./utils/logger";
import swaggerDocs from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(appRouter);
app.use("*", errorHandler);
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`connected to the server on: ${PORT}`);
  swaggerDocs(app, PORT);
});
module.exports = app;
