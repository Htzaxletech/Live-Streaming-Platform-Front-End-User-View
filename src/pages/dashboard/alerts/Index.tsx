import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import VariantsAside from "./aside/VariantsAside";
import SettingAside from "./aside/SettingAside";
import PreviewOptions from "./content/PreviewOptions";
import PreviewContent from "./content/PreviewContent";
import PreviewHeader from "./header/PreviewHeader";

const Alerts = () => {
	return (
		<div className="flex flex-col h-screen mt-[18px]">
			{/* Top header */}
			<PreviewHeader />

			{/* Main content */}
			<div className="flex flex-grow">
				<VariantsAside />

				<div className="flex-grow bg-background-body">
					<PreviewContent />
					<PreviewOptions />
				</div>

				<SettingAside />
			</div>

			{/* Bottom footer */}
			<div className="sticky bottom-0 bg-background-base shadow z-10 flex justify-between items-center px-4 py-2">
				<div></div>
				<div className="flex items-center gap-3">
					<Label>Browser Source URL</Label>
					<Input />
					<Button color="primary" size="lg">
						Copy
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Alerts;
