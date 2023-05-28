import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: { type: String, require: true },
	name: { type: String },
	age: { type: Number },
	location: { type: String },
	maritalStatus: { type: String },
	children: { type: String },
	living: { type: String },
	occupation: { type: String },
	salary: { type: String },
	education: { type: String },
	devices: {
		pc: { type: Number },
		phone: { type: Number },
		ipod: { type: Number },
		other: { type: Number },
	},
	usage: {
		electronics: { type: Number },
		ac: { type: Number },
		waterHeater: { type: Number },
		spaceHeater: { type: Number },
	},
	quote: { type: String },
	tech: {
		techKnowledge: { type: Number },
		staysHome: { type: Number },
		energyConcious: { type: Number },
	},
	about: { type: String },
	habits: { type: String },
	motivators: { type: String },
	goals: { type: String },
	dailyActivities: { type: String },
	avatar: { type: String },
	role: { type: String, default: "user" },
});

// JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password
userSchema.methods.comparePassword = function (givenPassworrd) {
	return givenPassworrd === this.password;
};

var User = mongoose.model("User", userSchema);
export default User;
