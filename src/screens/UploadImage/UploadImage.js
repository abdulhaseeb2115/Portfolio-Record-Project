import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiRequests";
import * as Components from "../../components/all";

export default function UploadImage() {
	const navigate = useNavigate();
	const [preview, setPreview] = useState(null);

	// Validate Image
	const validateImage = (e) => {
		// console.log(e.target.value)
		if (!validate(e)) {
			console.log(e.target.value);
			e.target.value = null;
			setPreview(null);
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			// set images
			if (reader.readyState === 2) {
				setPreview(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const validate = (e) => {
		let x = true;
		if (
			e.target.files[0]?.type !== "image/jpeg" &&
			e.target.files[0]?.type !== "image/jpg" &&
			e.target.files[0]?.type !== "image/png"
		) {
			console.log("Only jpeg, jpg and png are allowed.");
			x = false;
		}
		return x;
	};

	// Upload
	const handleUpload = async () => {
		try {
			if (preview !== null) {
				const { data } = await api.uploadImage({ avatar: preview });
				if (data.success) {
					alert("Image uploaded successfully.");
					navigate("/");
				}
			}
		} catch (error) {
			console.log(error);
			console.log(error?.response?.data?.message);
			alert(error?.response?.data?.message);
		}
	};

	return (
		<>
			<Components.Navbar />

			<div className="DataForm w-full flex-1 mx-auto lg:my-2 flex items-center justify-center">
				<div className="flex flex-col my-6 px-10 py-8 w-full max-w-[600px] bg-white shadow-lg shadow-gray-500 rounded-lg border">
					{/* heading */}
					<h1 className="font-bold text-3xl text-center px-1 mb-2">
						Upload Image
					</h1>
					<p className="text-sm text-center px-1 mb-10">
						Upload image for your profile
					</p>

					{/* image */}
					{preview !== null && (
						<div className="form-group mb-10 mx-auto bg-gray-700 shadow-lg rounded">
							<img
								src={preview}
								alt="image_preview"
								className="h-24 object-contain rounded"
							/>
						</div>
					)}

					{/* file upload */}
					<div className="form-group mb-6">
						<input
							type="file"
							accept=".jpg, .jpeg, .png"
							multiple={false}
							className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="image"
							onChange={(e) => validateImage(e)}
						/>
					</div>

					{/* login */}
					<button
						type="submit"
						className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 disabled:opacity-60 active:shadow-lg transition duration-150 ease-in-out"
						onClick={() => handleUpload()}
						disabled={preview === null}
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
}
