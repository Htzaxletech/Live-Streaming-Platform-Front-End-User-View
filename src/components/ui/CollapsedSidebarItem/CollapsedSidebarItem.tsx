import React from 'react';
import { Link } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
interface CollapsedSidebarItemProps {
	profilePicture: string;
	name: string;
	category: string;
	viewers: number | null;
	title: string;
	liveID: number
}

const CollapsedSidebarItem: React.FC<CollapsedSidebarItemProps> = ({
	profilePicture,
	title,
	liveID,
}) => {
	return (
		<Tooltip.Provider delayDuration={50}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Link
						to={`/${liveID}`}
						rel="noopener noreferrer"
					>
						<div className="mb-3 ml-3">
							<img
								src={profilePicture}
								alt="Profile"
								className="w-10 h-10 rounded-full"
							/>
						</div>
					</Link>
					<Tooltip.Portal>
						<Tooltip.Content
							sideOffset={15}
							align="center"
							side="right"
							className="bg-background-base px-3 py-2 text-base z-40 rounded-md text-foreground"
						>
							<div className="text-primary">{title}</div>
							{/* <div>Are you okay?</div> */}
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Trigger>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default CollapsedSidebarItem;
