/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import Button from "@components/ui/Button";
// import Heading from "@components/ui/Heading";
// import Input from "@components/ui/Input";
import { lazy, useEffect } from "react";
import * as Label from "@radix-ui/react-label";
import { endpoints, endpoints as ep } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { convertToBase64 } from "@utils/helpers";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import store from "store2";
import { useTranslation } from "react-i18next";
import SocialLink from "./SocialLink";

const Button = lazy(() => import("@components/ui/Button"));
const Heading = lazy(() => import("@components/ui/Heading"));
const Input = lazy(() => import("@components/ui/Input"));

const Channel: React.FC = () => {
	interface ProfileSettings {
		selectedImageUrl: string;
		selectedBannerUrl: string;
		userName: string;
		displayName: string;
		bio: string;
	}

	const { t } = useTranslation();
	const profileRef = useRef<HTMLInputElement>(null);
	const bannerRef = useRef<HTMLInputElement>(null);
	const [channelData, setChannelData] = useState<>({});

	const [loading, setLoading] = useState<boolean>(false);

	const [profileImageBase64Url, setProfileImageBase64Url] =
		useState<string>("");
	const [bannerImageBase64Url, setBannerImageBase64Url] = useState<string>("");
	const [imageName, setImageName] = useState({
		profile: "",
		banner: "",
	});

	const initialForm = {
		selectedImageUrl: "https://i.stack.imgur.com/l60Hf.png",
		selectedBannerUrl:
			"https://www.hkiod.com/wp-content/plugins/tutor/assets/images/placeholder.svg",
		userName: "",
		displayName: "",
		bio: "",
	};

	const [profileSettings, setProfileSettings] =
		useState<ProfileSettings>(initialForm);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const reqData = {
					userID: store.get("id"),
				};

				const { success, message, data } = await makeRequest(
					"get",
					endpoints.profileData,
					reqData,
					{
						signal,
					}
				);

				if (success) {
					const { channelID } = data[0];
					setChannelData(data[0]);

					await getProfile(channelID);
				} else {
					toast.error(message);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const getProfile = async (channelID: number) => {
		const reqData = {
			userID: store.get("id"),
			channelID,
		};

		const response = await makeRequest("get", endpoints.getProfile, reqData);

		if (response?.success) {
			const {
				username,
				displayName,
				bio,
				s3channelprofile,
				s3channelbanner,
			} = response.data[0];
			const initForm = {
				selectedImageUrl: s3channelprofile,
				selectedBannerUrl: s3channelbanner,
				userName: username,
				displayName,
				bio,
			};
			setProfileSettings(initForm);
		} else {
			toast.error(response?.message);
		}
	};

	const handleProfileClick = () => {
		if (profileRef.current) {
			profileRef.current.click();
		}
	};

	const handleBannerClick = () => {
		if (bannerRef.current) {
			bannerRef.current.click();
		}
	};

	const handleProfileChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];

		if (file) {
			const selectedImageUrl = URL.createObjectURL(file);
			setProfileSettings({ ...profileSettings, selectedImageUrl });

			const base64Url = await convertToBase64(file);
			const splittedUrl = base64Url.split(",")[1];
			setProfileImageBase64Url(splittedUrl);
			setImageName((prevState) => ({
				...prevState,
				profile: file.name,
			}));
		}
	};

	const handleBannerChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];

		if (file) {
			const selectedBannerUrl = URL.createObjectURL(file);
			setProfileSettings({ ...profileSettings, selectedBannerUrl });

			const base64Url = await convertToBase64(file);
			const splittedUrl = base64Url.split(",")[1];
			setBannerImageBase64Url(splittedUrl);
			setImageName((prevState) => ({
				...prevState,
				banner: file.name,
			}));
		}
	};

	const handleUserName = (e: { target: { value: any } }) => {
		setProfileSettings({ ...profileSettings, userName: e.target.value });
	};

	const handleDisplayName = (e: { target: { value: any } }) => {
		setProfileSettings({ ...profileSettings, displayName: e.target.value });
	};

	const handleBio = (e: { target: { value: any } }) => {
		setProfileSettings({ ...profileSettings, bio: e.target.value });
	};

	const handleSaveChanges = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			setLoading(true);

			const { userName, displayName, bio } =
				profileSettings as ProfileSettings;

			const reqData = {
				username: userName,
				displayName,
				userID: store.get("id"),
				bio,
				profileImage: profileImageBase64Url,
				bannerImage: bannerImageBase64Url,
				profileName: imageName.profile,
				bannerName: imageName.banner,
			};

			const { success, message } = await makeRequest(
				"post",
				ep.updateProfile,
				reqData
			);

			if (success) {
				toast.success(message);
				await getProfile(channelData?.channelID);
				// setProfileSettings(initialForm);
			} else {
				toast.error(message);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto mt-10">
			<div className="mb-7">
				<Heading size="sm">{t("pages.pp")}</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<div className="w-full flex justify-center md:w-2/6 lg:w-1/6">
						<img
							src={profileSettings.selectedImageUrl}
							alt="Profile Picture"
							className="w-[150px] h-[150px] object-cover rounded-full border border-base"
							loading="lazy"
							onClick={handleProfileClick}
						/>
					</div>
					<div className="w-full md:w-4/6 lg:w-5/6">
						<Button color="default" onClick={handleProfileClick}>
							{t("pages.app")}
						</Button>
						<Input
							type="file"
							className="hidden"
							ref={profileRef}
							accept="image/jpeg"
							onChange={handleProfileChange}
						/>
						<div className="mt-2">{t("pages.imgd")}</div>
					</div>
				</div>
			</div>

			<div className="mb-7">
				<Heading size="sm">{t("pages.pb")}</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-6 w-full">
					<div className="w-full lg:w-2/6">
						<img
							src={profileSettings.selectedBannerUrl}
							alt="Profile Picture"
							className="w-full h-auto md:h-[150px] object-cover border"
							loading="lazy"
							onClick={handleBannerClick}
						/>
					</div>
					<div className="w-full lg:w-3/6">
						<Button color="default" onClick={handleBannerClick}>
							{t("pages.update")}
						</Button>
						<Input
							type="file"
							className="hidden"
							ref={bannerRef}
							accept="image/jpeg"
							onChange={handleBannerChange}
						/>
						<div className="mt-2">{t("pages.imgd")}.</div>
					</div>
				</div>
			</div>

			<div className="mb-7">
				<Heading size="sm">{t("pages.ps")}</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2">
					<form onSubmit={handleSaveChanges}>
						<div className="flex flex-col md:flex-row gap-2 w-full">
							<Label.Root
								className="md:w-[280px] left-0 w-full font-semibold"
								htmlFor="userName"
							>
								{t("auth.name")}
							</Label.Root>
							<div className="w-full">
								<Input
									id="userName"
									className="flex-shrink w-full"
									placeholder="johndoe23"
									value={profileSettings.userName}
									onChange={handleUserName}
								/>
							</div>
						</div>

						<div className="flex flex-col md:flex-row gap-2 w-full mt-3">
							<Label.Root
								className="md:w-[280px] left-0 w-full font-semibold"
								htmlFor="displayName"
							>
								{t("pages.dname")}
							</Label.Root>
							<div className="w-full">
								<Input
									id="displayName"
									className="flex-shrink w-full"
									placeholder="John Doe"
									value={profileSettings.displayName}
									onChange={handleDisplayName}
								/>
							</div>
						</div>

						<div className="flex flex-col md:flex-row gap-2 w-full mt-3">
							<Label.Root
								className="md:w-[280px] left-0 w-full font-semibold"
								htmlFor="bio"
							>
								{t("pages.bio")}
							</Label.Root>
							<div className="w-full">
								<textarea
									id="bio"
									className="flex-shrink resize-none w-full outline-none bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-[1px] hover:ring-border focus-within:!ring-[2px] focus-within:!ring-primary px-[9px] py-2"
									rows={3}
									placeholder="I'm PUBG Streamer and mainly stream FPP"
									value={profileSettings.bio}
									onChange={handleBio}
								/>
							</div>
						</div>

						<div className="flex w-full justify-end mt-4">
							<Button color="primary" type="submit">
								{loading ? "Loading..." : t("pages.sc")}
							</Button>
						</div>
					</form>
				</div>
			</div>
			<SocialLink channelID={channelData?.channelID} />
		</div>
	);
};

export default Channel;
