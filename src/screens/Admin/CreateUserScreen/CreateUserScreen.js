import React from "react";
import * as Components from "../../../components/all";
import * as Screens from "../../all";

export default function CreateUserScreen() {
	return (
		<div className="AllUsersScreen  ">
			<Components.Navbar />
			<Screens.RegisterScreen byAdmin={true} />
		</div>
	);
}
