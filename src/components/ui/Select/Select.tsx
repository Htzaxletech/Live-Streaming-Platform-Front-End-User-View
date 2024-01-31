import React, { FC, ReactNode, SelectHTMLAttributes, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Listbox, Transition } from "@headlessui/react";
import { MdCheck } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

type Option = {
	option: ReactNode;
	value: string | number | readonly string[];
	icon?: ReactNode;
};

type SelectVariantProps = VariantProps<typeof select>;

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
	SelectVariantProps & {
		options: Option[];
	};

const select = tv({
	slots: {
		root: [
			"relative",
			"w-56",
			"inline-block",
			"outline-none",
			"rounded",
			"hover:border-border",
			"focus:border-primary",
		],
	},
	variants: {
		size: {
			sm: { root: ["h-[30px]", "px-1", "gap-1"] },
			md: { root: ["h-9", "px-2", "gap-2"] },
		},
		disabled: {
			true: { root: "!opacity-70 !pointer-events-none" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const { root } = select();

// const Select: FC<SelectProps> = ({ options, size, className, ...props }) => {
const Select: FC<SelectProps> = ({ options, size, className }) => {
	const [selectedValue, setSelectedValue] = useState<
		string | number | readonly string[] | undefined
	>(options.length > 0 ? options[0].value : "");

	const handleSelectChange = (value: string | number | readonly string[]) => {
		setSelectedValue(value);
		console.log("Selected value:", value);
	};

	return (
		<Listbox value={selectedValue} onChange={handleSelectChange}>
			<div className={root({ size, class: `relative ${className}` })}>
				<Listbox.Button
					className={`inputBox w-full h-full border rounded-md py-3 px-2 flex items-center relative ${
						selectedValue ? "bg-background-base" : "text-foreground"
					} border-2 border-background-base hover:border-foreground focus:border-primary focus:outline-primary`}
				>
					{options.find((option) => option.value === selectedValue) && (
						<span className="block truncate">
							{options.find((option) => option.value === selectedValue)
								?.option || "Select an option"}
						</span>
					)}

					<span className="absolute right-2 top-1/2 transform -translate-y-1/2">
						<MdKeyboardArrowDown size={22} />
					</span>
				</Listbox.Button>

				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Listbox.Options className="absolute mt-2 -left-[2rem] origin-top bg-background-base text-foreground rounded-md shadow-lg focus:outline-none sm:text-sm w-[250px]">
						{options.map((option, index) => (
							<Listbox.Option
								key={index}
								value={option.value}
								className=""
							>
								{({ active, selected }) => (
									<div
										className={`w-full h-full py-3 px-4 flex items-center ${
											active
												? "text-white bg-primary"
												: "text-foreground"
										} cursor-default select-none relative ${
											selected ? "font-semibold" : "font-normal"
										}`}
									>
										{option.icon && (
											<span className="mr-3">{option.icon}</span>
										)}
										<span className="">{option.option}</span>
										{selected && (
											<MdCheck className="ml-auto h-5 w-5 text-white" />
										)}
									</div>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

Select.displayName = "Select";

export default Select;
