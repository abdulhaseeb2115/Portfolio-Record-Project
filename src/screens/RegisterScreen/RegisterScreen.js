import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiRequests";

export default function RegisterScreen({ byAdmin }) {
	const navigate = useNavigate();

	// Account Creation
	const [account, setAccount] = useState({
		loading: true,
		success: null,
		error: null,
	});

	// Steps
	const [steps, setSteps] = useState({
		step1: false,
		step2: false,
		step3: false,
	});

	// Check Steps
	const checkSteps = (step) => {
		if (step === 1) {
			// check values
			if (
				data.name === "" ||
				data.age === "" ||
				data.email === "" ||
				data.password === "" ||
				confirmPassword === ""
			) {
				alert("Fill all fields !");
				return;
			}

			// check email
			if (!/(.+)@(.+){2,}\.(.+){2,}/.test(data.email)) {
				alert("Email format is not valid !");
				return;
			}

			// check password length
			if (data.password.length < 8) {
				alert("Password should have atleast 8 characters !");
				return;
			}

			// match passwords
			if (data.password !== confirmPassword) {
				alert("Passwords don't match !");
				return;
			}

			// step completed
			setSteps((prevState) => ({ ...prevState, step1: true }));
		} else if (step === 2) {
			// check values
			if (
				data.location === "" ||
				data.maritalStatus === "" ||
				data.children === "" ||
				data.living === "" ||
				data.occupation === "" ||
				data.salary === "" ||
				data.education === "" ||
				data.quote === "" ||
				data.about === "" ||
				data.devices.pc === "" ||
				data.devices.phone === "" ||
				data.devices.ipod === "" ||
				data.devices.other === "" ||
				data.usage.electronics === "" ||
				data.usage.ac === "" ||
				data.usage.waterHeater === "" ||
				data.usage.spaceHeater === ""
			) {
				alert("Fill all fields !");
				return;
			}

			// step completed
			setSteps((prevState) => ({ ...prevState, step2: true }));
		} else if (step === 3) {
			// check values
			if (
				data.tech.techKnowledge === "" ||
				data.tech.staysHome === "" ||
				data.tech.energyConcious === "" ||
				data.habits === "" ||
				data.goals === "" ||
				data.motivators === "" ||
				data.dailyActivities === ""
			) {
				alert("Fill all fields !");
				return;
			}

			// step completed
			setSteps((prevState) => ({ ...prevState, step3: true }));
			registerUser();
		}
	};

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
		avatar: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

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

	// Register User
	const registerUser = async () => {
		try {
			if (byAdmin === true) {
				const result = await api.newAdminUser(data);
				// console.log(result);
				if (result.data.success) {
					setAccount((prevState) => ({
						...prevState,
						loading: false,
						success: true,
						error: false,
					}));
					setTimeout(() => {
						navigate("/admin");
					}, 2000);
				}
			} else {
				const result = await api.registerUser(data);
				// console.log(result);
				if (result.data.success) {
					setAccount((prevState) => ({
						...prevState,
						loading: false,
						success: true,
						error: false,
					}));
					setTimeout(() => {
						navigate("/");
					}, 2000);
				}
			}
		} catch (error) {
			console.log(error);
			setAccount((prevState) => ({
				...prevState,
				loading: false,
				success: false,
				error: error,
			}));
		}
	};

	return (
		<div
			className={`RegisterForm overflow-auto flex items-center justify-center p-4 ${
				byAdmin !== true && " min-h-screen "
			}`}
		>
			<div className="flex flex-col my-6 px-10 py-8 w-full max-w-[1000px] bg-white shadow-lg shadow-gray-500 rounded-lg border">
				<>
					{/* heading */}
					<h1 className="font-bold text-3xl text-center px-1 mb-1">
						{byAdmin === true ? "Register a new user" : "Register your Account"}
					</h1>
					{steps.step1 && steps.step2 && steps.step3 ? (
						<p className="text-sm text-center px-1 mb-4">Steps Completed</p>
					) : (
						<p className="text-sm text-center px-1 mb-4">
							Fill all fields to go to the next step
						</p>
					)}

					{/* steps indicator*/}
					<div className="relative w-3/4 md:w-2/5 mx-auto mb-10 flex items-center justify-between text-sm font-medium font-sans">
						<div
							className={`z-20 h-16 aspect-square flex items-center justify-center rounded-full border-2 border-blue-600 duration-300 ease-in-out  ${
								steps.step1 ? " bg-blue-600 text-white " : " bg-white "
							}`}
						>
							Step-1
						</div>

						<div
							className={`z-20 h-16 aspect-square flex items-center justify-center rounded-full border-2 border-blue-600 duration-300 ease-in-out  ${
								steps.step2 ? " bg-blue-600 text-white " : " bg-white "
							}`}
						>
							Step-2
						</div>

						<div
							className={`z-20 h-16 aspect-square flex items-center justify-center rounded-full border-2 border-blue-600 duration-300 ease-in-out  ${
								steps.step3 ? " bg-blue-600 text-white " : " bg-white "
							}`}
						>
							Step-3
						</div>

						<div className="absolute bg-blue-600 h-0.5 w-full z-10"></div>
					</div>
				</>
				{/* step 1 */}
				{steps.step1 === false && (
					<div className="flex flex-col">
						{/* email & age */}
						<div className="grid grid-cols-2 gap-4">
							{/* name */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Name"
									name="name"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* age */}
							<div className="form-group mb-6">
								<input
									type="number"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Age"
									name="age"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* email */}
						<div className="form-group mb-6">
							<input
								type="email"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Email address"
								name="email"
								onChange={(e) => handleInputs(e)}
							/>
						</div>

						{/* password */}
						<div className="form-group mb-6">
							<input
								type="password"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Password"
								name="password"
								onChange={(e) => handleInputs(e)}
							/>
						</div>

						{/* confirm password */}
						<div className="form-group mb-6">
							<input
								type="password"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Confirm password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						{/* next 1 */}
						<button
							type="submit"
							className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => checkSteps(1)}
							disabled={
								data.name === "" ||
								data.age === "" ||
								data.email === "" ||
								data.password === "" ||
								confirmPassword === ""
							}
						>
							Next
						</button>
					</div>
				)}
				{/* step 2 */}
				{(steps.step1 === true && steps.step2 === false) === true && (
					<div className="flex flex-col">
						{/********************************/}

						{/* heading devices*/}
						<p className="mb-3 pb-1 w-fit border-b border-black">User Info</p>

						{/* location & maritalStatus */}
						<div className="grid grid-cols-2 gap-4">
							{/* location */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Location"
									name="location"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* maritalStatus */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Marital Status"
									name="maritalStatus"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* children & living */}
						<div className="grid grid-cols-2 gap-4">
							{/* children */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Children"
									name="children"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* living */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Living"
									name="living"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* occupation & salary */}
						<div className="grid grid-cols-2 gap-4">
							{/* occupation */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Occupation"
									name="occupation"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* salary */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Salary"
									name="salary"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* education & quote */}
						<div className="grid grid-cols-2 gap-4">
							{/* education */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Education"
									name="education"
									onChange={(e) => handleInputs(e)}
								/>
							</div>

							{/* quote */}
							<div className="form-group mb-6">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Quote"
									name="quote"
									onChange={(e) => handleInputs(e)}
								/>
							</div>
						</div>

						{/* about */}
						<div className="form-group mb-6">
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
						<p className="mb-3 pb-1 w-fit border-b border-black">Devices</p>

						{/* devices */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
							{/* pc */}
							<div className="form-group">
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
						<p className="mb-3 pb-1 w-fit border-b border-black">
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

						{/* next 2 */}
						<button
							type="submit"
							className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => checkSteps(2)}
							disabled={
								data.location === "" ||
								data.maritalStatus === "" ||
								data.children === "" ||
								data.living === "" ||
								data.occupation === "" ||
								data.salary === "" ||
								data.education === "" ||
								data.quote === "" ||
								data.about === "" ||
								data.devices.pc === "" ||
								data.devices.phone === "" ||
								data.devices.ipod === "" ||
								data.devices.other === "" ||
								data.usage.electronics === "" ||
								data.usage.ac === "" ||
								data.usage.waterHeater === "" ||
								data.usage.spaceHeater === ""
							}
						>
							Next
						</button>

						{/********************************/}
					</div>
				)}
				{/* step 3 */}
				{(steps.step1 === true &&
					steps.step2 === true &&
					steps.step3 === false) === true && (
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
						<p className="mb-3 pb-1 w-fit border-b border-black">Habits</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 ,text 2 ,text 3"
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
						<p className="mb-3 pb-1 w-fit border-b border-black">Goals</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 ,text 2 ,text 3"
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
						<p className="mb-3 pb-1 w-fit border-b border-black">Motivators</p>
						<div className="form-group mb-6">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 ,text 2 ,text 3"
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
						<p className="mb-3 pb-1 w-fit border-b border-black">
							Daily Activities
						</p>
						<div className="form-group mb-10">
							<textarea
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="text 1 ,text 2 ,text 3"
								name="dailyActivities"
								style={{ resize: "none" }}
								rows={3}
								cols={2}
								onChange={(e) => handleInputs(e)}
								value={data.dailyActivities}
							/>
						</div>

						{/********************************/}

						{/* next 3 */}
						<button
							type="submit"
							className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => checkSteps(3)}
							disabled={
								data.tech.techKnowledge === "" ||
								data.tech.staysHome === "" ||
								data.tech.energyConcious === "" ||
								data.habits === "" ||
								data.goals === "" ||
								data.motivators === "" ||
								data.dailyActivities === ""
							}
						>
							Register
						</button>

						{/********************************/}
					</div>
				)}
				{/* completed */}
				{(steps.step1 === true &&
					steps.step2 === true &&
					steps.step3 === true) === true && (
					<div className="m-auto my-10 text-lg text-center px-4">
						{account.loading ? (
							<h1>Processing your request . . . </h1>
						) : account.success === true ? (
							<h1>Account Created Successfully !</h1>
						) : (
							<h1>
								An Error Occured !<br /> <small>{account.error}</small>
							</h1>
						)}
					</div>
				)}

				{byAdmin !== true && steps.step3 === false && (
					<h1 className="font-sans text-sm mt-3">
						Already have an account?{" "}
						<span
							className="text-blue-600 cursor-pointer hover:opacity-80"
							onClick={() => navigate("/login")}
						>
							Login
						</span>
					</h1>
				)}
			</div>
		</div>
	);
}
