import ErrorHandler from "../utils/errorHandler.js";

const func = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id (Cast Error)
    if (err.name === "CastError") {
        err = new ErrorHandler(400, "Resource not found.(Invalid: " + err.path + ")")
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        err = new ErrorHandler(400, `Duplicate ${Object.keys(err.keyValue)} entered`)
    }

    // Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler(400, `Json Web Token is invalid, Try again`)
    }

    // Expired JWT Error
    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler(400, `Json Web Token is Expired, Try again`)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack
    });
};

export default func; 