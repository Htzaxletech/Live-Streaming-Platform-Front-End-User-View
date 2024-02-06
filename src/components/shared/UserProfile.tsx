import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import store from "store2";

const UserProfile: React.FC = () => {
	const location = useLocation();

	// Function to check if the pathname includes "dashboard"
	const isDashboardRoute = () => {
		return location.pathname.includes("dashboard");
	};

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);


	const img =
		store.get("profile") ||
		store.get("userData")?.image ||
		"https://static.vecteezy.com/system/resources/previews/015/409/989/non_2x/elegant-man-in-business-suit-with-badge-man-business-avatar-profile-picture-illustration-isolated-vector.jpg";

	return (
		<div className="flex items-center">
			<Link to="/dashboard/channel">
				<div className="w-[40px] h-[40px] border rounded-full overflow-hidden">
					<img
						className="w-full h-full object-cover"
						src={img}
						alt="Profile Avatar"
					/>
				</div>
			</Link>
			<div className="ml-2 flex flex-col">
				<span className="font-semibold">
					{isAuthenticated ? store.get("username") : "Unknown User"}
				</span>
				{isDashboardRoute() && <span>Creator</span>}
			</div>
		</div>
	);
};

export default UserProfile;
