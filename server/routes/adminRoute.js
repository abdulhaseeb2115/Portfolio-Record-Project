/** ROUTES **/
import express from "express";
import {
	getAllUsers,
	deleteUser,
	updateUserDetails,
	getUserDetails,
	createUser,
} from "../controllers/adminController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get(
	"/admin/users",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	getAllUsers
);
router.get(
	"/admin/view/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	getUserDetails
);
router.post(
	"/admin/create",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	createUser
);
router.put(
	"/admin/update/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	updateUserDetails
);
router.delete(
	"/admin/delete/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	deleteUser
);

export default router;
