import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import Input from "@components/ui/Input";
// import Textarea from "@components/ui/Textarea";
// import { Label } from "@radix-ui/react-dropdown-menu";
// import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { useCallback, useRef, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";

const Channel: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | undefined>(
		undefined
	);
	const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
		null
	);


	const handleProfileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const url = URL.createObjectURL(file);
			setSelectedImage(file);
			setSelectedImageUrl(url);
		}
	};

	return (
		<div className="container mx-auto mt-10">
			<div className="mb-7">
				<Heading size="sm">Profile Picture</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<div className="w-full flex justify-center md:w-2/6 lg:w-1/6">
						<img
							src={
								selectedImageUrl ||
								"https://img.freepik.com/free-photo/beauty-portrait-female-face_93675-132045.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704326400&semt=ais"
							}
							alt="Profile Picture"
							className="w-[150px] h-[150px] object-cover rounded-full border border-base"
							loading="lazy"
							onClick={handleProfileClick}
						/>
					</div>
					<div className="w-full md:w-4/6 lg:w-5/6">
						<Button color="default" onClick={handleProfileClick}>
							Add Profile Picture
						</Button>
						<Input
							type="file"
							className="hidden"
							ref={fileInputRef}
							accept="image/jpeg"
							onChange={handleFileInputChange}
						/>
						<div className="mt-2">
							Must be JPEG, PNG, or GIF and cannot exceed 10MB.
						</div>
					</div>
				</div>
			</div>

			<div className="mb-7">
				<Heading size="sm">Profile Banner</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-6 w-full">
					<div className="w-full lg:w-2/6">
						<img
							src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
							alt="Profile Picture"
							className="w-full h-auto md:h-[150px] object-cover border border-black"
							loading="lazy"
						/>
					</div>
					<div className="w-full lg:w-3/6">
						<Button color="default">Update</Button>
						<div className="mt-2">
							Must be JPEG, PNG, or GIF and cannot exceed 10MB.
						</div>
					</div>
				</div>
			</div>

			<div className="mb-7">
				<Heading size="sm">Profile Settings</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2">
					<div className="flex flex-col md:flex-row gap-2 w-full">
						<Label.Root
							className="md:w-[280px] left-0 w-full"
							htmlFor="userName"
						>
							User Name
						</Label.Root>
						<div className="w-full">
							<Input
								id="userName"
								className="flex-shrink w-full"
								placeholder="johndoe23"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-2 w-full mt-3">
						<Label.Root
							className="md:w-[280px] left-0 w-full"
							htmlFor="displayName"
						>
							Display Name
						</Label.Root>
						<div className="w-full">
							<Input
								id="displayName"
								className="flex-shrink w-full"
								placeholder="John Doe"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-2 w-full mt-3">
						<Label.Root
							className="md:w-[280px] left-0 w-full"
							htmlFor="bio"
						>
							Bio
						</Label.Root>
						<div className="w-full">
							<textarea
								id="bio"
								className="flex-shrink resize-none w-full outline-none bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-[1px] hover:ring-border focus-within:!ring-[2px] focus-within:!ring-primary px-[9px] py-2"
								rows={3}
								placeholder="I'm PUBG Streamer and mainly stream FPP"
							/>
						</div>
					</div>

					<div className="flex w-full justify-end mt-4">
						<Button
							className="py-5"
							color="primary"
							onClick={() => {
								console.log("object", selectedImage);
							}}
						>
							Save Changes
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Channel;
