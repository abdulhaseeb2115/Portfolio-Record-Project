/** CONTROLLERS **/
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";

// Register a User
export const registerUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.create(req.body);
	sendToken(user, 200, res); //function for token
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		// if email or password not given
		return next(new ErrorHandler(400, "Please enter valid email & password"));
	}

	const user = await User.findOne({ email });
	if (!user) {
		// if email not foud
		return next(new ErrorHandler(401, "Invalid Email or Password"));
	}

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		//if password is not matched
		return next(new ErrorHandler(401, "Invalid Email or Password"));
	}

	sendToken(user, 200, res); //function for token
});

// Logout User
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

// Get User Details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// Upload User Image
export const uploadUserImage = catchAsyncErrors(async (req, res, next) => {
	if (req.body.avatar === "") {
		return next(new ErrorHandler(400, "Please valid image !"));
	}

	const query = { _id: req.user.id };

	const user = await User.findOneAndUpdate(
		query,
		{ avatar: req.body.avatar },
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		user,
	});
});
