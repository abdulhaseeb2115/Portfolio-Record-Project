import { selectUser, useSelector } from "../../features/userSlice";
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ adminRoute, loginRoute, component }) {
	const { user, loading } = useSelector(selectUser);

	if (loading === false) {
		// not logged in
		if (user === null && loginRoute !== true) {
			return <Navigate to="/login" />;
		}

		// logged in
		if (user !== null && loginRoute === true) {
			if (user.user.role === "admin") {
				return <Navigate to="/admin" />;
			}
			return <Navigate to="/" />;
		}

		if (user !== null && user.user.role === "user" && adminRoute === true) {
			return <Navigate to="/" />;
		}
		if (user !== null && user.user.role === "admin" && adminRoute === false) {
			return <Navigate to="/admin" />;
		}

		return component;
	} else {
		return <Loading />;
	}
}

export default ProtectedRoute;
