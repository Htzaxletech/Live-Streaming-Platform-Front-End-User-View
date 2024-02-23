/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Switch } from "@components/ui/Switch";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface VariantsProps {
	initialData?: any[]; // Initial data to populate the form with
}

const Variants: React.FC<VariantsProps> = ({ initialData }) => {
	const dump = {
		id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
		title: "New Follower",
		description: "Any new follow to your channel",
	};

	const [data, setData] = useState<any[]>(initialData || [dump]);
	const [selectedData, setSelectedData] = useState<any>(null);

	const handleAddEntry = () => {
		const newDataEntry = {
			...dump,
		};
		setData([...data, newDataEntry]);
	};

	return (
		<div className="mb-2">
			<div className="bg-background-float">
				<p className="uppercase text-xs mb-2 mx-5 py-1">
					Variants are listed in priority order
				</p>
			</div>
			<div className="flex flex-col mx-2">
				<Button
					size="lg"
					className="w-full flex gap-2 bg-transparent justify-start mb-3"
					onClick={handleAddEntry}
				>
					<FaPlus />
					New Variant
				</Button>
				{data.map((entry, index) => (
					<div
						key={`variant${index}`}
						className={`flex items-center justify-between gap-3 rounded p-3 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer ${
							entry.id === selectedData?.id ? "bg-primary" : ""
						}`}
						onClick={() => {
							setSelectedData(entry);
							console.log(entry);
						}}
					>
						<div className="flex items-center gap-3">
							<Input
								className="max-w-10 rounded-none"
								size="sm"
								readOnly
								value={1}
							/>
							<div className="text-xs">
								<p>
									<b>{entry.title}</b>
								</p>
								<p>{entry.description}</p>
							</div>
						</div>
						<div>
							<Switch
								id={`dark-theme-switch-${entry.id}`}
								// onClick={toggleTheme}
								// checked={theme === "dark"}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Variants;
