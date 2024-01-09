import Button from "@components/ui/Button";
import React from "react";
import { RxCross1 } from "react-icons/rx";

interface ErrorMessageProps {
	message: string;
	onClear: () => void;
	isClosable: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onClear,
	isClosable,
}) => {
	const handleClose = () => {
		onClear();
	};
	return (
		<div
			className={`relative bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded ${
				isClosable ? "pr-7" : ""
			}`}
		>
			{message}
			{isClosable && (
				<Button
					className="absolute top-1 right-1 px-2 py-1 cursor-pointer bg-transparent"
					onClick={handleClose}
				>
					<RxCross1 />
				</Button>
			)}
		</div>
	);
};

export default ErrorMessage;
