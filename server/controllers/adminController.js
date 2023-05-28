/** CONTROLLERS **/
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Get All Users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		success: true,
		users,
	});
});

// Get User Details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// Create a User
export const createUser = catchAsyncErrors(async (req, res, next) => {
	// const {
	// 	email,
	// 	password,
	// 	name,
	// 	age,
	// 	location,
	// 	maritalStatus,
	// 	children,
	// 	living,
	// 	occupation,
	// 	salary,
	// 	education,
	// 	about,
	// 	habits,
	// 	motivators,
	// 	goals,
	// 	dailyActivities,
	// 	role,
	// } = req.body;

	const user = await User.create(req.body);
	res.status(200).json({
		success: true,
		user,
	});
});

// Delete User
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler(404, "User not found"));
	}

	if (user.role === "admin") {
		res.status(403).json({
			success: false,
			message: "Admin account cannot be deleted",
		});
		return;
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});
});

// Update User Details
export const updateUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler(404, "User not found"));
	}

	const query = { _id: req.params.id };

	const userUpdated = await User.findOneAndUpdate(query, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		userUpdated,
	});
});
