import React, { useEffect, useState } from "react";
import * as Components from "../../../components/all";
import bg from "../../../assets/profile.png";
import colors from "../../../styles/colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import * as api from "../../../api/apiRequests";
import { useNavigate, useParams } from "react-router-dom";
// import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend /*ChartDataLabels*/);
ChartJS.defaults.plugins.legend.align = "start";
ChartJS.defaults.plugins.legend.labels.boxWidth = 12;
ChartJS.defaults.plugins.legend.labels.boxHeight = 12;
ChartJS.defaults.plugins.legend.labels.color = "#082543";
ChartJS.defaults.plugins.legend.labels.padding = 15;

export default function ShowUserScreen() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	// Chart Config
	const chartsConfig = {
		dataDevices: {
			labels: ["LAPTOP / DESKTOP", "ANDRIOD PHONE", "IPOD", "OTHER"],
			datasets: [
				{
					data: [
						data?.devices?.pc,
						data?.devices?.phone,
						data?.devices?.ipod,
						data?.devices?.other,
					],
					backgroundColor: ["#45cffe", "#b3d631", "#febd19", "#ffdc45"],
					borderWidth: 1,
				},
			],
		},
		dataAvg: {
			labels: [
				"APPLIANCES / ELECTRONICS",
				"A/C",
				"WATER HEATER",
				"SPACE HEATING",
			],
			datasets: [
				{
					data: [
						data?.usage?.electronics,
						data?.usage?.ac,
						data?.usage?.waterHeater,
						data?.usage?.spaceHeater,
					],
					backgroundColor: ["#45cffe", "#b3d631", "#febd19", "#ffdc45"],
					borderWidth: 1,
				},
			],
		},
		options: {},
	};

	// Load Data
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.getUserDetails(id);
				// console.log(data);
				setLoading(false);
				setData(data.user);
			} catch (error) {
				console.log(error);
				if (error.message) {
					alert(error?.message);
				} else {
					alert(error?.response?.data?.message);
				}
				// navigate("/admin");
			}
		};

		getData();
	}, []);

	return loading === true ? (
		<Components.Loading />
	) : (
		<>
			<Components.Navbar />

			<div className="DataForm  w-full max-w-[1400px] mx-auto lg:my-2 flex shadow-lg shadow-gray-500">
				{/* LEFT */}
				<div className="DataForm--Left  w-1/4 min-w-[190px] flex flex-col rounded-l-lg bg-[#efefef]">
					{/* image */}
					<div className="w-full overflow-hidden aspect-square flex items-center justify-center rounded-tl-lg">
						<img
							src={data.avatar?.length > 0 ? data.avatar : bg}
							alt="profile_image"
							className="h-full object-cover"
						/>
					</div>

					{/* name */}
					<h1
						style={{ backgroundColor: colors.black_3, color: colors.white_2 }}
						className="w-full px-2 py-3 lg:py-5 md:text-2xl lg:text-3xl font-semibold text-center"
					>
						{data?.name}
					</h1>

					{/* info */}
					<div className="flex flex-col px-2 py-5 lg:py-7 font-medium uppercase text-xs md:text-sm lg:text-base bg-[#082543] text-[#45cffe]">
						{/* age */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">AGE</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.age}
							</h1>
						</div>

						{/* location */}
						<div className="w-full flex mb-5">
							<h1 className="w-1/2 pr-[6px] text-right">LOCATION</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.location}
							</h1>
						</div>

						{/*  */}

						{/* marital status */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">MARITAL STATUS</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.maritalStatus}
							</h1>
						</div>

						{/* children */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">CHILDREN</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.children}
							</h1>
						</div>

						{/* location */}
						<div className="w-full flex mb-5">
							<h1 className="w-1/2 pr-[6px] text-right">LIVING</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.living}
							</h1>
						</div>

						{/*  */}

						{/* occupation */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">OCCUPATION</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.occupation}
							</h1>
						</div>

						{/* salary */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">SALARY</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.salary}
							</h1>
						</div>

						{/* education */}
						<div className="w-full flex">
							<h1 className="w-1/2 pr-[6px] text-right">EDUCATION</h1>
							<h1
								style={{ color: colors.white_2 }}
								className="w-1/2 pl-[6px] font-normal"
							>
								{data.education}
							</h1>
						</div>
					</div>

					{/* devices & usage */}
					<div className="flex flex-col items-center px-2 py-5 lg:py-7 font-medium uppercase text-xs md:text-sm lg:text-base rounded-bl-lg bg-[#efefef]">
						{/* heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold text-center mb-4 text-[#082543]">
							Devices Used
						</h1>

						{/* chart */}
						<Doughnut
							data={chartsConfig.dataDevices}
							options={chartsConfig.options}
						/>
						{/* divider */}
						<div className="h-[3px] rounded-full w-11/12 my-12 opacity-60 bg-[#082543]" />

						{/* heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold text-center mb-4 text-[#082543]">
							Average Monthly Usage
						</h1>

						{/* chart */}
						<Doughnut
							data={chartsConfig.dataAvg}
							options={chartsConfig.options}
						/>
					</div>
				</div>

				{/* RIGHT */}
				<div className="DataForm--Right  w-3/4 flex flex-col rounded-r-lg bg-white">
					{/* quote */}
					<div className="relative w-full px-5 py-7 md:px-7 md:py-9 text-base md:text-3xl lg:text-4xl font-serif text-center rounded-tr-lg bg-[#45ceff] text-white">
						<h1 className="z-50 relative">{data.quote}</h1>
						<span className="absolute h-1/2 aspect-square left-0 top-0 -translate-x-1/3 translate-y-1/2 rotate-45 z-40 bg-[#45ceff]"></span>
					</div>

					{/* tech */}
					<div className="w-full px-3 py-5 md:px-7 md:py-9 text-[10px] md:text-sm lg:text-base uppercase font-semibold bg-[#efefef] text-[#082543]">
						{/* tech knowledge */}
						<div className="flex items-center mb-6">
							<h1 className="w-12 md:w-24 mr-3">Little Tech Knowledge</h1>

							<div className="flex-1">
								<div
									className="h-4 bg-[#b3d631]"
									style={{
										width: data.tech.techKnowledge + "%",
									}}
								></div>
							</div>

							<h1 className="w-12 md:w-24 ml-3 md:ml-5">
								Expert Tech Knowledge
							</h1>
						</div>

						{/* stays at home */}
						<div className="flex items-center mb-6">
							<h1 className="w-12 md:w-24 mr-3">Stays At Home</h1>
							<div className="flex-1">
								<div
									className="h-4 bg-[#b3d631]"
									style={{
										width: data.tech.staysHome + "%",
									}}
								></div>
							</div>

							<h1 className="w-12 md:w-24 ml-3 md:ml-5">Frequently Away</h1>
						</div>

						{/* energy concious */}
						<div className="flex items-center">
							<h1 className="w-12 md:w-24 mr-3">Not Energy Concious</h1>

							<div className="flex-1">
								<div
									className="h-4 bg-[#b3d631]"
									style={{
										width: data.tech.energyConcious + "%",
									}}
								></div>
							</div>

							<h1 className="w-12 md:w-24 ml-3 md:ml-5">
								Very Energy Concious
							</h1>
						</div>
					</div>

					{/* info about/etc */}
					<div className="w-full px-3 py-7 md:px-9 md:py-11 text-xs md:text-base lg:text-l rounded-br-lg bg-white">
						{/* about heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold mb-3 uppercase text-[#082543] ">
							About {data.name}
						</h1>
						<p className="font-sans mb-7 md:mb-10">{data.about}</p>

						{/* habits heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold mb-3 uppercase text-[#082543] ">
							Habits
						</h1>
						<ul className="list-disc list-inside font-sans mb-7 md:mb-10">
							{data.habits.split(",").map((x, index) => (
								<li key={index}>{x}</li>
							))}
						</ul>

						{/* motivators heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold mb-3 uppercase text-[#082543] ">
							Motivators
						</h1>
						<ul className="list-disc list-inside font-sans mb-7 md:mb-10">
							{data.motivators.split(",").map((x, index) => (
								<li key={index}>{x}</li>
							))}
						</ul>

						{/* goals heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold mb-3 uppercase text-[#082543] ">
							Goals
						</h1>
						<ul className="list-disc list-inside font-sans mb-7 md:mb-10">
							{data.goals.split(",").map((x, index) => (
								<li key={index}>{x}</li>
							))}
						</ul>

						{/* daily activities heading */}
						<h1 className="w-full text-base md:text-xl lg:text-2xl font-bold mb-3 uppercase text-[#082543] ">
							Daily Activities
						</h1>
						<div className="w-full md:w-2/3 lg:w-1/2 mx-auto flex items-center flex-wrap font-sans mb-7 md:mb-10">
							{data.dailyActivities.split(",").map((x, index) => (
								<div key={index} className="mx-auto">
									<div
										style={
											index % 2 === 0
												? {
														backgroundColor: "#45cffe",
														color: "#082543",
												  }
												: {
														backgroundColor: "#b5d531",
														color: "#082543",
												  }
										}
										className="h-20 md:h-32 p-2 aspect-square rounded-full flex items-center justify-center text-center font-medium overflow-hidden my-3 md:mx-3"
									>
										<h1>{x}</h1>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
