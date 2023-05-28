import React, { useEffect, useState } from "react";
import * as Components from "../../../components/all";
import * as Screens from "../../all";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../../api/apiRequests";

export default function UpdateUserScreen() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	// Data
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		age: "",
		location: "",
		maritalStatus: "",
		children: "",
		living: "",
		occupation: "",
		salary: "",
		education: "",
		devices: {
			pc: "",
			phone: "",
			ipod: "",
			other: "",
		},
		usage: {
			electronics: 0,
			ac: 0,
			waterHeater: 0,
			spaceHeater: 0,
		},
		quote: "",
		tech: {
			techKnowledge: 0,
			staysHome: 0,
			energyConcious: 0,
		},
		about: "",
		habits: "",
		motivators: "",
		goals: "",
		dailyActivities: "",
	});

	// Handle Inputs
	const handleInputs = (event) => {
		let { name, value } = event.target;

		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDevices = (event) => {
		let { name, value } = event.target;

		setData((prevState) => ({
			...prevState,
			devices: { ...prevState.devices, [name]: value },
		}));
	};

	const handleUsage = (event) => {
		let { name, value } = event.target;

		setData((prevState) => ({
			...prevState,
			usage: { ...prevState.usage, [name]: value },
		}));
	};

	const handleTech = (event) => {
		let { name, value } = event.target;

		setData((prevState) => ({
			...prevState,
			tech: { ...prevState.tech, [name]: value },
		}));
	};

	// Load Data
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.getUserDetails(id);
				setData(data.user);
				setLoading(false);
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
	}, []);

	// Update User
	const updateUser = async () => {
		if (
			data.name === "" ||
			data.age === "" ||
			data.email === "" ||
			data.password === "" ||
			data.location === "" ||
			data.maritalStatus === "" ||
			data.children === "" ||
			data.living === "" ||
			data.occupation === "" ||
			data.salary === "" ||
			data.education === "" ||
			data.devices.pc === "" ||
			data.devices.phone === "" ||
			data.devices.ipod === "" ||
			data.devices.other === "" ||
			data.quote === "" ||
			data.about === "" ||
			data.habits === "" ||
			data.motivators === "" ||
			data.goals === "" ||
			data.dailyActivities === ""
		) {
			alert("Fill all fields !");
			return;
		}

		try {
			const result = await api.updateAdminUser(id, data);
			if (result.data.success) {
				alert("User data updated successfully.");
				navigate("/admin");
			}
		} catch (error) {
			console.log(error);
			console.log(error?.response?.data?.message);
			alert(error?.response?.data?.message);
		}
	};

	return loading ? (
		<Components.Loading />
	) : (
		<div className="AllUsersScreen  ">
			<Components.Navbar />
			<div
				className={`RegisterForm overflow-auto flex items-center justify-center p-2`}
			>
				<div className="flex flex-col my-6 px-10 py-8 w-full max-w-[1000px] bg-white shadow-lg shadow-gray-500 rounded-lg border">
					<h1 className="font-bold text-2xl uppercase mb-4">Update User</h1>

					<div className="flex flex-col">
						{/* name & age */}
						<div className="grid grid-cols-2 gap-4">
							{/* name */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Name</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Name"
									value={data.name}
									name="name"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* age */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Age</h1>
								<input
									type="number"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.age}
									placeholder="Age"
									name="age"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* email & password */}
						<div className="grid grid-cols-2 gap-4">
							{/* email */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Email</h1>
								<input
									type="email"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Email address"
									value={data.email}
									name="email"
									readOnly
								/>
							</div>

							{/* password */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Password</h1>
								<input
									type="password"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Password"
									value={data.password}
									name="password"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						{/********************************/}

						{/* heading devices*/}
						<p className="mb-3 pb-1 w-fit border-b border-black uppercase">
							User Info
						</p>

						{/* location & maritalStatus */}
						<div className="grid grid-cols-2 gap-4">
							{/* location */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Location</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Location"
									value={data.location}
									name="location"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* maritalStatus */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">
									Marital Status
								</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Marital Status"
									value={data.maritalStatus}
									name="maritalStatus"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* children & living */}
						<div className="grid grid-cols-2 gap-4">
							{/* children */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Children</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Children"
									value={data.children}
									name="children"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* living */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Living</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Living"
									value={data.living}
									name="living"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* occupation & salary */}
						<div className="grid grid-cols-2 gap-4">
							{/* occupation */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Occupation</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Occupation"
									value={data.occupation}
									name="occupation"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* salary */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Salary</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Salary"
									value={data.salary}
									name="salary"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* education & quote */}
						<div className="grid grid-cols-2 gap-4">
							{/* education */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Education</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Education"
									value={data.education}
									name="education"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* quote */}
							<div className="form-group mb-6">
								<h1 className=" mb-1 w-fit text-sm uppercase">Quote</h1>
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Quote"
									value={data.quote}
									name="quote"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* about */}
						<div className="form-group mb-6">
							<h1 className=" mb-1 w-fit text-sm uppercase">About</h1>
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="About"
								name="about"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.about}
							/>
						</div>

						{/********************************/}

						{/* heading devices*/}
						<p className="mb-3 pb-1 w-fit border-b border-black uppercase">
							Devices
						</p>

						{/* devices */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
							{/* pc */}
							<div className="form-group">
								<h1 className=" mb-1 w-fit text-sm uppercase">PC</h1>
								<input
									type="number"
									className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.devices.pc}
									placeholder="PC"
									name="pc"
									onChange={(e) => handleDevices(e)}
								/>
							</div>

							{/* phone */}
							<div className="form-group">
								<h1 className=" mb-1 w-fit text-sm uppercase">Phone</h1>
								<input
									type="number"
									className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.devices.phone}
									placeholder="Phone"
									name="phone"
									onChange={(e) => handleDevices(e)}
								/>
							</div>

							{/* ipod */}
							<div className="form-group">
								<h1 className=" mb-1 w-fit text-sm uppercase">Ipod</h1>
								<input
									type="number"
									className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.devices.ipod}
									placeholder="IPOD"
									name="ipod"
									onChange={(e) => handleDevices(e)}
								/>
							</div>

							{/* other */}
							<div className="form-group">
								<h1 className=" mb-1 w-fit text-sm uppercase">Other</h1>
								<input
									type="number"
									className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.devices.other}
									placeholder="Other"
									name="other"
									onChange={(e) => handleDevices(e)}
								/>
							</div>
						</div>

						{/********************************/}

						{/* heading usage*/}
						<p className="mb-3 pb-1 w-fit border-b border-black uppercase">
							Usage (0 - 100)
						</p>

						{/* usage */}
						<div className="grid grid-cols-2 gap-4 p-4 mb-10 border border-solid border-gray-300 rounded">
							{/* electronics */}
							<div className="form-group">
								<p className="text-sm">
									ELECTRONICS ({data.usage.electronics})
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.usage.electronics}
									name="electronics"
									onChange={(e) => handleUsage(e)}
								/>
							</div>

							{/* ac */}
							<div className="form-group">
								<p className="text-sm">AC ({data.usage.ac})</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.usage.ac}
									name="ac"
									onChange={(e) => handleUsage(e)}
								/>
							</div>

							{/* water heater */}
							<div className="form-group">
								<p className="text-sm">
									WATER HEATER ({data.usage.waterHeater})
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.usage.waterHeater}
									name="waterHeater"
									onChange={(e) => handleUsage(e)}
								/>
							</div>

							{/* space heater */}
							<div className="form-group">
								<p className="text-sm">
									SPACE HEATER ({data.usage.spaceHeater})
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.usage.spaceHeater}
									name="spaceHeater"
									onChange={(e) => handleUsage(e)}
								/>
							</div>
						</div>

						{/********************************/}
					</div>

					<div className="flex flex-col">
						{/********************************/}
						{/* tech */}
						<div className="flex flex-col p-4 mb-10 border border-solid border-gray-300 rounded">
							{/* tech knowledge */}
							<div className="form-group my-2">
								<p className="text-sm flex items-center justify-between">
									<span className="w-[70px] md:w-fit">
										Little Tech Knowledge
									</span>
									<span>{data.tech.techKnowledge}%</span>
									<span className="w-[70px] md:w-fit">
										Expert Tech Knowledge
									</span>
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.tech.techKnowledge}
									name="techKnowledge"
									onChange={(e) => handleTech(e)}
								/>
							</div>

							{/* stays home */}
							<div className="form-group mb-2">
								<p className="text-sm flex items-center justify-between">
									<span className="w-[70px] md:w-fit">Stays At Home</span>
									<span>{data.tech.staysHome}%</span>
									<span className="w-[70px] md:w-fit">Frequently Away</span>
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.tech.staysHome}
									name="staysHome"
									onChange={(e) => handleTech(e)}
								/>
							</div>

							{/* energy conscious */}
							<div className="form-group">
								<p className="text-sm flex items-center justify-between">
									<span className="w-[70px] md:w-fit">
										Not Energy Conscious
									</span>
									<span>{data.tech.energyConcious}%</span>
									<span className="w-[70px] md:w-fit">
										Very Energy Conscious
									</span>
								</p>
								<input
									type="range"
									className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									value={data.tech.energyConcious}
									name="energyConcious"
									onChange={(e) => handleTech(e)}
								/>
							</div>
						</div>

						{/********************************/}

						{/* heading habits*/}
						<p className="mb-1 w-fit text-sm uppercase">Habits</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 - text 2 - text 3"
								name="habits"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.habits}
							/>
						</div>

						{/********************************/}

						{/* heading goals*/}
						<p className="mb-1 w-fit text-sm uppercase">Goals</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 - text 2 - text 3"
								name="goals"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.goals}
							/>
						</div>

						{/********************************/}

						{/* heading motivators*/}
						<p className="mb-1 w-fit text-sm uppercase">Motivators</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 - text 2 - text 3"
								name="motivators"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.motivators}
							/>
						</div>

						{/********************************/}

						{/* heading activities*/}
						<p className="mb-1 w-fit text-sm uppercase">Daily Activities</p>
						<div className="form-group mb-10">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 - text 2 - text 3"
								name="dailyActivities"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.dailyActivities}
							/>
						</div>

						{/********************************/}
					</div>

					{/**
					 * ****
					 * **/}

					<button
						type="submit"
						className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
						onClick={() => updateUser()}
						disabled={
							data.name === "" ||
							data.age === "" ||
							data.email === "" ||
							data.password === "" ||
							data.location === "" ||
							data.maritalStatus === "" ||
							data.children === "" ||
							data.living === "" ||
							data.occupation === "" ||
							data.salary === "" ||
							data.education === "" ||
							data.devices.pc === "" ||
							data.devices.phone === "" ||
							data.devices.ipod === "" ||
							data.devices.other === "" ||
							data.quote === "" ||
							data.about === "" ||
							data.habits === "" ||
							data.motivators === "" ||
							data.goals === "" ||
							data.dailyActivities === ""
						}
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
}
