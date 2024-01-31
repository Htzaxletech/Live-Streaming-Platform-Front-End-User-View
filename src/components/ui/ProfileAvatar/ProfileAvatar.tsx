import React from 'react';

interface ProfileAvatarProps {
  imageUrl: string;
  isLive?: boolean;
  altText: string;
  size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUrl,
  isLive = false,
  altText,
  size = 100,
}) => {
  return (
		<div className="relative inline-block">
			<img
				src={imageUrl}
				alt={altText}
				className={`rounded-full object-cover outline outline-offset-2 ${
					isLive ? "outline-danger" : "outline-gray-200"
				}`}
				style={{
					width: `${size}px`,
					height: `${size}px`,
				}}
			/>
			{isLive && (
				<div
					className={
						"bg-danger rounded text-white text-xs px-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2 "
					}
				>
					LIVE
				</div>
			)}
		</div>
  );
};

export default ProfileAvatar;
