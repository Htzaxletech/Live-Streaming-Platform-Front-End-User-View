import AlertImage from "./AlertImage";
import AlertSound from "./AlertSound";

const VisualsAndSound = () => {


	return (
		<div className="p-4">
			<AlertImage />
			<div className="border border-background-body w-full my-4"></div>
			<AlertSound />
		</div>
	);
};

export default VisualsAndSound;
