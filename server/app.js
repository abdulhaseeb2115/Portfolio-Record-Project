import express from "express";
import errorMiddleware from "./middleware/error.js";
import userRoutes from "./routes/userRoute.js";
import adminRoutes from "./routes/adminRoute.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" }); //process.env

// use packages
const app = express();
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
		exposedHeaders: ["Set-Cookie", "Date", "ETag"],
	})
);
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use(fileUpload());

// routes
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", adminRoutes);

// middlewares
app.use(errorMiddleware);
export default app;
