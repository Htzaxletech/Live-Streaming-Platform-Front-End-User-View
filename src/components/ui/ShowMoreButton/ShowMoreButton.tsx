import React, { MouseEvent } from "react";
import { IoArrowDown } from "react-icons/io5";
import Button from "@components/ui/Button";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

interface ShowMoreButtonProps {
	title?: string;
	loading?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Event handler for Button click
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
	title,
	onClick,
	loading,
}) => {
	const { t } = useTranslation();
	const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(event);
		}
	};

	return (
		<div className="flex">
			<div className="relative flex-grow">
				<div className="top-1/2 border-t-2 absolute w-full"></div>
			</div>
			<div className="px-2 flex">
				{loading ? (
					<ThreeDots
						visible={true}
						height="30"
						width="30"
						color="#00c798"
						radius="9"
						ariaLabel="three-dots-loading"
					/>
				) : (
					<Button
						className="bg-transparent text-primary hover:text-black dark:hover:text-white"
						onClick={onButtonClick}
					>
						<div className="mr-2">
							<p>{t("pages.showmore", { title })}</p>
						</div>
						<IoArrowDown />
					</Button>
				)}
			</div>
			<div className="relative flex-grow">
				<div className="top-1/2 border-t-2 absolute w-full"></div>
			</div>
		</div>
	);
};

export default ShowMoreButton;
