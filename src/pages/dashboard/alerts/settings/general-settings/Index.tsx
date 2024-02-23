import Input from "@components/ui/Input";
import * as Label from "@radix-ui/react-label";
import Animations from "./Animations";

const GeneralSettings = () => {

	return (
		<>
			<div className="flex flex-col gap-2 w-full px-3">
				<div className="mt-3 flex flex-col gap-2">
					<Label.Root className="font-semibold" htmlFor="variantName">
						Variant Name
					</Label.Root>
					<Input
						size="sm"
						required
						id="variantName"
						className="w-full pl-3"
						value="New Follow"
					/>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<Label.Root className="font-semibold" htmlFor="variantName">
						Alert Conditions
					</Label.Root>
					<div className="flex relative items-center h-[30px] w-full outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
						<select className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md">
							<option value="none">
								Any new follow to your channel
							</option>
							<option value="none">200 follow to your channel</option>
							<option value="none">
								300 new follow to your channel
							</option>
							{/* Add more options as needed */}
						</select>
					</div>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<Label.Root className="font-semibold" htmlFor="variantName">
						Duration (In seconds, 99 max)
					</Label.Root>
					<Input
						max={2}
						size="sm"
						required
						id="variantName"
						className="w-full pl-3"
						value="10"
					/>
				</div>

				<Animations />
			</div>
		</>
	);
};

export default GeneralSettings;
