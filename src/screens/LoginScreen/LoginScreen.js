import React, { useState } from "react";
import * as api from "../../api/apiRequests";
import { useNavigate } from "react-router-dom";
import { useDispatch, logIn } from "../../features/userSlice";

export default function LoginScreen() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (email === "" || password === "") {
			alert("Fill all fields !");
			return;
		}

		if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Invalid email !");
			return;
		}

		if (password.length < 8) {
			alert("Invalid password !");
			return;
		}

		try {
			const { data } = await api.loginUser(email, password);
			if (data.success === true) {
				dispatch(logIn({ user: data.user }));
			}
		} catch (error) {
			console.log(error);
			alert(error.response.data.message);
		}
	};

	return (
		<div className="RegisterForm min-h-screen w-screen overflow-auto flex items-center justify-center p-4">
			<div className="flex flex-col my-6 px-10 py-8 w-full max-w-[600px] bg-white shadow-lg shadow-gray-500 rounded-lg border">
				{/* heading */}
				<h1 className="font-bold text-3xl text-center px-1 mb-2">Login</h1>
				<p className="text-sm text-center px-1 mb-10">
					Fill all fields with valid credentials
				</p>

				{/* email */}
				<div className="form-group mb-6">
					<input
						type="email"
						className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Email address"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{/* password */}
				<div className="form-group mb-12">
					<input
						type="password"
						className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{/* login */}
				<button
					type="submit"
					className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
					onClick={() => handleLogin()}
					disabled={email === "" || password === ""}
				>
					Login
				</button>

				<h1 className="font-sans text-sm mt-3">
					Don't have an account?{" "}
					<span
						className="text-blue-600 cursor-pointer hover:opacity-80"
						onClick={() => navigate("/register")}
					>
						Register
					</span>
				</h1>
			</div>
		</div>
	);
}
