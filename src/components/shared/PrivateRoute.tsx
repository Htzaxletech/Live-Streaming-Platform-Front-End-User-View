import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

interface PrivateRouteProps {
	element: ReactElement; // Explicitly type the element prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return isAuthenticated ? (
		element
	) : (
		<Navigate to="/" replace /> // Redirect to the login page if not authenticated
	);
};

export default PrivateRoute;