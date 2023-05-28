import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" }); //process.env

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
	console.log("Error: " + err.message);
	console.log("Shutting down the server due to Uncaught Exception");
	process.exit(1);
});

// Server
connectDB();
const server = app.listen(process.env.PORT, () =>
	console.log(`Server is running on http://localhost:${process.env.PORT}`)
);

// Handling Unhandeled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log("Error: " + err.message);
	console.log("Shutting down the server due to Unhandeled Promise Rejection");
	console.log("Error: " + err.stack);
	server.close(() => {
		process.exit(1);
	});
});
