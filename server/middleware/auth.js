import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import jwt from "jsonwebtoken";

// validate login status
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) {
		return next(new ErrorHandler(401, "Please Login to access this resource"));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decodedData.id);

	next();
});

// compare user type
export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					403,
					`Role: (${req.user.role}) is not allowed to access this resource`
				)
			);
		}
		next();
	};
};
