import { useLocation } from "react-router-dom";

const UserProfile: React.FC = () => {
	const location = useLocation();

	// Function to check if the pathname includes "dashboard"
	const isDashboardRoute = () => {
		return location.pathname.includes("dashboard");
	};

	return (
		<div className="flex items-center">
			<div className="w-[40px] border rounded-full overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src="https://static.vecteezy.com/system/resources/previews/015/409/989/non_2x/elegant-man-in-business-suit-with-badge-man-business-avatar-profile-picture-illustration-isolated-vector.jpg"
					alt="Profile Avatar"
				/>
			</div>
			<div className="ml-2 flex flex-col">
				<span className="font-semibold">Nay Zaw Linn</span>
				{isDashboardRoute() && <span>Creator</span>}
			</div>
		</div>
	);
};

export default UserProfile;
