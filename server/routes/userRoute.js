/** ROUTES **/
import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	getUserDetails,
	uploadUserImage,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.get("/user/me", isAuthenticatedUser, getUserDetails);
router.post("/user/upload", isAuthenticatedUser, uploadUserImage);

export default router;
