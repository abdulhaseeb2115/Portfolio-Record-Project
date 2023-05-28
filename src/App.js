import React, { useEffect } from "react";
import "./App.css";
import * as Screens from "./screens/all";
import * as Components from "./components/all";
import * as api from "./api/apiRequests";
import colors from "./styles/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { logIn, logOut, useDispatch } from "./features/userSlice";

function App() {
	const dispatch = useDispatch();

	// Load Data
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.getUserData();
				// console.log(data);
				dispatch(
					logIn({
						user: data.user,
					})
				);
			} catch (error) {
				// console.log(error);
				dispatch(logOut());
			}
		};

		getData();
	}, []);

	return (
		<div
			// style={{ backgroundColor: colors.white_2 }}
			className="App flex flex-col bg-slate-100 min-h-screen"
		>
			<BrowserRouter>
				<Routes>
					{/* login */}
					<Route
						path="/login"
						element={
							<Components.ProtectedRoute
								component={<Screens.LoginScreen />}
								loginRoute={true}
							/>
						}
					/>

					{/* register */}
					<Route
						path="/register"
						element={
							<Components.ProtectedRoute
								component={<Screens.RegisterScreen />}
								loginRoute={true}
							/>
						}
					/>

					{/* display */}
					<Route
						path="/"
						element={
							<Components.ProtectedRoute
								component={<Screens.DisplayScreen />}
								adminRoute={false}
							/>
						}
					/>

					{/* upload Image */}
					<Route
						path="/upload"
						element={
							<Components.ProtectedRoute
								component={<Screens.UploadImage />}
								adminRoute={false}
							/>
						}
					/>

					{/*
					 ** ADMIN
					 */}

					{/* admin all users */}
					<Route
						path="/admin"
						element={
							<Components.ProtectedRoute
								component={<Screens.AllUsersScreen />}
								adminRoute={true}
							/>
						}
					/>

					{/* admin user details */}
					<Route
						path="/admin/userData/:id"
						element={
							<Components.ProtectedRoute
								component={<Screens.ShowUserScreen />}
								adminRoute={true}
							/>
						}
					/>

					{/* admin create user */}
					<Route
						path="/admin/create"
						element={
							<Components.ProtectedRoute
								component={<Screens.CreateUserScreen />}
								adminRoute={true}
							/>
						}
					/>

					{/* admin update user */}
					<Route
						path="/admin/userData/update/:id"
						element={
							<Components.ProtectedRoute
								component={<Screens.UpdateUserScreen />}
								adminRoute={true}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
