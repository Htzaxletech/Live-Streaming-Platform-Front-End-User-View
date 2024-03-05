import Input from "@components/ui/Input";
import * as Label from "@radix-ui/react-label";
import { changeFormData } from "@store/slices/alertSlice";
import { RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@components/ui/Switch";

const TextAndSpeech = () => {
	const {
		textColor,
		accentColor,
		defaultTextColor,
		defaultAccentColor,
		message,
		isCheckedSayTextAlert,
	} = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();

	return (
		<div className="p-4">
			<div className="flex flex-col gap-2 w-full mt-3">
				<Label.Root
					className="md:w-[280px] left-0 w-full font-semibold"
					htmlFor="message"
				>
					Message
				</Label.Root>
				<div className="w-full">
					<textarea
						id="message"
						className="flex-shrink resize-y w-full outline-none bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-[1px] hover:ring-border focus-within:!ring-[2px] focus-within:!ring-primary px-[9px] py-2"
						rows={3}
						value={message}
						onChange={(e) => {
							dispatch(
								changeFormData({
									message: e.target.value,
								})
							);
						}}
					/>
				</div>
			</div>

			<div className="flex gap-2 w-full mt-4">
				<div className="flex flex-col gap-1">
					<Label.Root className="w-full font-semibold">
						Text Color
					</Label.Root>
					<div className="flex gap-1 items-center">
						<Input
							size="sm"
							type="color"
							className="w-12 rounded p-0"
							value={textColor}
							onChange={(e) => {
								dispatch(
									changeFormData({
										textColor: e.target.value || defaultTextColor,
									})
								);
							}}
						/>
						<Input
							size="sm"
							type="text"
							className="w-full"
							value={textColor}
							onChange={(e) => {
								dispatch(
									changeFormData({
										textColor: e.target.value || defaultTextColor,
									})
								);
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<Label.Root className="w-full font-semibold">
						Accent Color
					</Label.Root>
					<div className="flex gap-1 items-center">
						<Input
							size="sm"
							type="color"
							className="w-12 rounded p-0"
							value={accentColor}
							onChange={(e) => {
								dispatch(
									changeFormData({
										accentColor: e.target.value || defaultAccentColor,
									})
								);
							}}
						/>
						<Input
							size="sm"
							type="text"
							className="w-full"
							value={accentColor}
							onChange={(e) => {
								dispatch(
									changeFormData({
										accentColor: e.target.value || defaultAccentColor,
									})
								);
							}}
						/>
					</div>
				</div>
			</div>

			<div className="mt-8 flex items-center">
				<p className="font-semibold uppercase">Text-to-Speech</p>
			</div>

			<div>
				<div className="mt-8 flex items-center">
					<Switch
						className="mr-4"
						id={`dark-theme-switch`}
						onClick={() => {
							dispatch(
								changeFormData({
									isCheckedSayTextAlert: !isCheckedSayTextAlert,
								})
							);
						}}
						checked={isCheckedSayTextAlert}
					/>
					<p className="font-semibold text-sm">Say Alert Text</p>
				</div>
			</div>
		</div>
	);
};

export default TextAndSpeech;
