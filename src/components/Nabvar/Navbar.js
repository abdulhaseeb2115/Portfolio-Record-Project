import React from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiRequests";
import {
	useDispatch,
	logOut,
	selectUser,
	useSelector,
} from "../../features/userSlice";

export default function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(selectUser);

	return (
		<div className="h-16 p-4 w-full flex items-center justify-between bg-blue-600 text-white uppercase text-xs font-sans font-medium">
			{user?.user?.role === "user" ? (
				<>
					<div className="Logo px-3 h-full text-black bg-white flex items-center rounded-sm">
						Profile App
					</div>

					<h1
						className="ml-auto mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={() => navigate("/")}
					>
						Home
					</h1>

					<h1
						className="mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={() => navigate("/upload")}
					>
						Upload Image
					</h1>

					<h1
						className="mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={async () => {
							await api.logoutUser();
							dispatch(logOut());
						}}
					>
						Logout
					</h1>
				</>
			) : (
				<>
					<div className="Logo px-3 h-full text-black bg-white flex items-center rounded-sm">
						Admin Area
					</div>

					<h1
						className="ml-auto mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={() => navigate("/admin")}
					>
						All Users
					</h1>

					<h1
						className="mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={() => navigate("/admin/create")}
					>
						Create User
					</h1>

					<h1
						className="mr-3 hover:text-black cursor-pointer duration-200 ease-in-out"
						onClick={async () => {
							await api.logoutUser();
							dispatch(logOut());
						}}
					>
						Logout
					</h1>
				</>
			)}
		</div>
	);
}
