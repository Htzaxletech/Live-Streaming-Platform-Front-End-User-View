import TogglePanel from "@components/ui/TogglePanel";
import { MdOutlineSettings } from "react-icons/md";
import GeneralSettings from "../settings/general-settings/Index";
import { RiLayoutLeft2Line } from "react-icons/ri";
import Layout from "../settings/layout/Index";
import { FaExclamationTriangle } from "react-icons/fa";
import DangerZone from "../settings/danger-zone/Index";
import { FaImage } from "react-icons/fa";
import { PiTextT } from "react-icons/pi";
import TextAndSpeech from "../settings/text-and-speech/Index";
import VisualsAndSound from "../settings/visuals-and-sound/Index";

const SettingAside = () => {
	return (
		<div
			className="flex w-80 bg-background-base"
			style={{
				maxHeight: "calc(100vh - 9.6rem)",
				position: "relative",
				height: "100%",
				overflowY: "auto",
				overflowX: "hidden",
			}}
		>
			<div className="w-full z-10">
				<TogglePanel
					heading="General Settings"
					icon={<MdOutlineSettings size={18} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<GeneralSettings />
				</TogglePanel>

				<TogglePanel
					heading="Layout"
					icon={<RiLayoutLeft2Line size={18} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<Layout />
				</TogglePanel>

				<TogglePanel
					heading="Text and Speech"
					icon={<PiTextT size={18} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<TextAndSpeech />
				</TogglePanel>

				<TogglePanel
					heading="Visuals and Sound"
					icon={<FaImage size={18} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<VisualsAndSound />
				</TogglePanel>

				<TogglePanel
					heading="Danger Zone"
					icon={<FaExclamationTriangle size={18} />}
					defaultOpen={false}
					className="bg-background-float"
				>
					<DangerZone />
				</TogglePanel>
			</div>
		</div>
	);
}

export default SettingAside;