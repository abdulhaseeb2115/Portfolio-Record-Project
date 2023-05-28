import React, { useEffect, useState } from "react";
import * as Components from "../../../components/all";
import * as api from "../../../api/apiRequests";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEye, AiOutlineEdit, AiFillDelete } from "react-icons/ai";

export default function AllUsersScreen() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([{}]);
	const [update, setUpdate] = useState(true);

	// Load Data
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.getAdminAllUsers();
				setData(data.users);
				setLoading(false);
				// console.log(data);
			} catch (error) {
				console.log(error);
				if (error.message) {
					alert(error?.message);
				} else {
					alert(error?.response?.data?.message);
				}
			}
		};

		getData();
	}, [update]);

	// delete user
	const handleDelete = async (name, id) => {
		const ans = prompt(
			"Delete ' " + name + "'s ' account ? \n(Click ' y ' to confirm.)"
		);

		if (ans === "y" || ans === "Y") {
			try {
				const { data } = await api.deleteAdminUser(id);
				if (data.success) {
					setUpdate(!update);
					return;
				}
			} catch (error) {
				console.log(error);
				if (error.message) {
					alert(error?.message);
				} else {
					alert(error?.response?.data?.message);
				}
			}
		}
	};

	return loading === true ? (
		<Components.Loading />
	) : (
		<>
			<Components.Navbar />

			<div className="w-full overflow-y-auto overflow-x-hidden flex flex-col p-2 md:p-4">
				<h1 className="font-bold text-xl md:text-3xl mt-4 mb-10">All Users</h1>

				{data.map((x, index) => (
					<div
						key={index}
						className="p-4 mb-6 flex items-center justify-between flex-wrap border border-solid border-gray-300 rounded shadow-sm  cursor-default duration-200 ease-in-out hover:shadow-lg"
					>
						<h1 className="md:w-[155px] overflow-auto">
							{index + 1}. &nbsp; {x.name}
						</h1>
						<h1 className="md:w-[150px] overflow-auto mr-auto">{x.email}</h1>

						<div className="flex text-2xl">
							<AiFillEye
								className="mr-2 text-blue-600 cursor-pointer duration-200 ease-in-out hover:scale-125"
								onClick={() => navigate(`userData/${x._id}`)}
							/>
							<AiOutlineEdit
								className="mx-2 text-blue-600 cursor-pointer duration-200 ease-in-out hover:scale-125"
								onClick={() => navigate(`userData/update/${x._id}`)}
							/>
							{x.role === "admin" ? (
								""
							) : (
								<AiFillDelete
									className="ml-2 text-red-400 cursor-pointer duration-200 ease-in-out hover:scale-125"
									onClick={() => handleDelete(x.name, x._id)}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
