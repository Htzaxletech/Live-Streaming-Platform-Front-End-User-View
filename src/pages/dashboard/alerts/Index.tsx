import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import VariantsAside from "./aside/VariantsAside";
import SettingAside from "./aside/SettingAside";
import PreviewOptions from "./content/PreviewOptions";
import PreviewContent from "./content/PreviewContent";
import PreviewHeader from "./header/PreviewHeader";
import store from "store2";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFormData } from "@store/slices/alertSlice";
import { RootState } from "@store/index";

const Alerts = () => {
	const dispatch = useDispatch();
	const initState = useSelector(
		(state: RootState) => state.alert.initialAlertState
	);

	useEffect(()=>{
		return () => {
			dispatch(changeFormData({ ...initState }));
		}
	}, [])

	const handleCopyToClipboard = () => {
		navigator.clipboard
			.writeText(
				`${window.location.href}/${store.get("channelData")?.streamKey}`
			)
			.then(() =>
				toast.success("Browser Source URL copied to the clipboard")
			)
			.catch((error) =>
				toast.error("Unable to copy text to clipboard", error)
			);
	};

	return (
		<div className="flex flex-col h-screen">
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
					<Input
						type="password"
						value="******************************"
						readOnly
					/>
					<Button
						color="primary"
						size="lg"
						onClick={handleCopyToClipboard}
					>
						Copy
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Alerts;
