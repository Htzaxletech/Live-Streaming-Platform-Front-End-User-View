import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface TogglePanelProps {
	heading: string;
	icon: React.ReactElement;
	children?: React.ReactNode;
	defaultOpen?: boolean;
	className?: string;
}

const TogglePanel: React.FC<TogglePanelProps> = ({
	heading,
	icon,
	children,
	defaultOpen,
	className,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

	return (
		<>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center px-4 h-12 justify-between border border-background-body hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer ${className}`}
			>
				<div className="flex items-center gap-3">
					{icon}
					<h6 className="font-semibold uppercase select-none">{heading}</h6>
				</div>
				<IoIosArrowDown
					size={18}
					className={`${
						isOpen ? "-rotate-180" : ""
					} origin-center transition ease-in-out duration-150`}
				/>
			</div>
			{isOpen && <>{children}</>}
		</>
	);
};

export default TogglePanel;
