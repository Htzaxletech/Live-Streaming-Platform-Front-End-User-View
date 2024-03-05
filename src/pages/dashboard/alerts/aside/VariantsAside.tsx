import TogglePanel from "@components/ui/TogglePanel";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import Variants from "../variants/Index";

const VariantsAside = () => {
	return (
		<div className="overflow-y-auto flex h-screen z-10">
			<div className="w-80 flex-grow-0 bg-background-base">
				<TogglePanel
					icon={<FaRegHeart size={16} />}
					heading={"Follows"}
					defaultOpen={true}
					className="bg-background-float"
				>
					<Variants />
				</TogglePanel>

				<TogglePanel
					heading="Subscriptions"
					icon={<FaRegStar size={16} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<Variants />
				</TogglePanel>

				<TogglePanel
					heading="Donations"
					icon={<IoDiamondSharp size={16} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<Variants />
				</TogglePanel>
			</div>
		</div>
	);
}

export default VariantsAside;