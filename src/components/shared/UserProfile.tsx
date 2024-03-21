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

	const imgURL = store.get("profile") || store.get("channelImage");

	return (
		<div className="flex items-center">
			<Link to={`/dashboard/channel`}>
				<div className="w-[40px] h-[40px] border rounded-full overflow-hidden">
					{imgURL && imgURL !== "undefined" ? (
						<img
							className="w-full h-full object-cover rounded-full"
							src={imgURL}
							alt="Profile Avatar"
						/>
					) : (
						<img
							className="w-full h-full object-cover"
							src={
								"https://static.vecteezy.com/system/resources/previews/015/409/989/non_2x/elegant-man-in-business-suit-with-badge-man-business-avatar-profile-picture-illustration-isolated-vector.jpg"
							}
							alt="Profile Avatar"
						/>
					)}
				</div>
			</Link>
			<div className="ml-2 flex flex-col">
				<span className="font-semibold">
					<Link to={`/dashboard/channel`}>
						{isAuthenticated ? store.get("username") : "Unknown User"}
					</Link>
				</span>
				{isDashboardRoute() && <span>Creator</span>}
			</div>
		</div>
	);
};

export default UserProfile;
