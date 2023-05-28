import axios from "axios";
const mainUrl = "http://localhost:4000/api/v1";
const config = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
	credentials: "include",
};

// LOGIN USER ~
export const loginUser = (email, password) =>
	axios.post(`${mainUrl}/user/login`, { email, password }, config);

// REGISTER USER ~
export const registerUser = (userData) =>
	axios.post(`${mainUrl}/user/register`, userData, config);

// GET USER DATA ~
export const getUserData = () => axios.get(`${mainUrl}/user/me`, config);

// UPLOAD IMAGE
export const uploadImage = (userData) =>
	axios.post(`${mainUrl}/user/upload`, userData, config);

// LOGOUT USER ~
export const logoutUser = () => axios.get(`${mainUrl}/user/logout`, config);

//////////////////
// // // // // ///
//////////////////

// GET ALL USERS --ADMIN ~
export const getAdminAllUsers = () =>
	axios.get(`${mainUrl}/admin/users`, config);

// GET USER DETAILS --ADMIN ~
export const getUserDetails = (id) =>
	axios.get(`${mainUrl}/admin/view/${id}`, config);

// DELETE USER --ADMIN ~
export const deleteAdminUser = (id) =>
	axios.delete(`${mainUrl}/admin/delete/${id}`, config);

// NEW USER --ADMIN ~
export const newAdminUser = (userData) =>
	axios.post(`${mainUrl}/admin/create`, userData, config);

// UPDATE USER --ADMIN ~
export const updateAdminUser = (id, userData) =>
	axios.put(`${mainUrl}/admin/update/${id}`, userData, config);
