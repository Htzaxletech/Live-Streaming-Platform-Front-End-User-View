/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { lazy, useEffect, useState } from "react";
import dashboardRoutes from "@routes/dashboardRoutes";
import userRoutes from "@routes/userRoutes";
import { useEffect } from "react";
import { socket } from "./socket";

const App = () => {
	// const [routes, setRoutes] = useState({});

	// useEffect(() => {
	// 	const loadRoutes = async () => {
	// 		const isDashboard = window.location.pathname.startsWith("/dashboard");

	// 		if (isDashboard) {
	// 			const {dashboardRoutes} = await import("@routes/dashboardRoutes");
	// 			setRoutes(dashboardRoutes);
	// 		} else {
	// 			const {userRoutes} = await import("@routes/userRoutes");
	// 			console.log("userRoutes", userRoutes);
	// 			setRoutes(userRoutes);
	// 		}
	// 	};

	// 	loadRoutes();
	// }, []);
	
	useEffect(()=>{
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, [])

	const appRouter = createBrowserRouter([userRoutes, dashboardRoutes]);

	return <RouterProvider router={appRouter} />;
};

export default App;
