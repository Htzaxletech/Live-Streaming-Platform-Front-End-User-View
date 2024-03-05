import Input from "@components/ui/Input";
import * as Label from "@radix-ui/react-label";
import Animations from "./Animations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { changeFormData } from "@store/slices/alertSlice";

const GeneralSettings = () => {
	const dispatch = useDispatch();

	const { duration, variantName } = useSelector(
		(state: RootState) => state.alert.data
	);

	const handleVariantName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeFormData({ variantName: e.target.value }));
	};

	const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (/^\d*$/.test(value)) {
			const numberValue = parseInt(value, 10);
			if (numberValue >= 1 && numberValue <= 99) {
				dispatch(changeFormData({ duration: e.target.value }));
			}
		}
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

	return (
		<div className="flex flex-col gap-2 w-full p-4">
			<div className="mt-3 flex flex-col gap-2">
				<Label.Root className="font-semibold" htmlFor="variantName">
					Variant Name
				</Label.Root>
				<Input
					size="sm"
					required
					id="variantName"
					className="w-full pl-3"
					value={variantName}
					onChange={handleVariantName}
				/>
			</div>

			<div className="mt-3 flex flex-col gap-2">
				<Label.Root className="font-semibold">Alert Conditions</Label.Root>
				<div className="flex relative items-center h-[30px] w-full outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						value="1"
						className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						onChange={() => {}}
					>
						<option value="1">Any new follow to your channel</option>
					</select>
				</div>
			</div>

			<div className="mt-3 flex flex-col gap-2">
				<Label.Root className="font-semibold" htmlFor="duration">
					Duration (In seconds, 99 max)
				</Label.Root>
				<Input
					size="sm"
					required
					id="duration"
					className="w-full pl-3"
					value={duration}
					onChange={handleDuration}
					onFocus={handleFocus}
				/>
			</div>

			<Animations />
		</div>
	);
};

export default GeneralSettings;
