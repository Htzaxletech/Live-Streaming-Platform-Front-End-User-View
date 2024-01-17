/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoPerson } from "react-icons/go";

import Button from "@components/ui/Button";
import { CategoryLink } from "@components/ui/CategoryLink";
import Tag from "@components/ui/Tag";
import Icon from "@components/shared/Icon";

import categoryimg from "../assets/images/gaming.svg";

import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort } from "react-icons/fa6";

import { SocialLink } from "@components/ui/SocialLink";
import { Select } from "@components/ui/Select";
import Avatar from "@components/ui/Avatar";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import ProfileHeading from "@components/shared/ProfileHeading";
import ProfileDescription from "@components/shared/ProfileDescription";
import ProfileStreamInfo from "@components/shared/ProfileStreamInfo";
import HomeCarousel from "@components/shared/HomeCarousel";
import { useState } from "react";

const TestingComponents = () => {
	const [tableOneLeft, setTableOneLeft] = useState([
		{
			STORECD: "00001",
			CLOSEDATE: "2022-01-01",
		},
		{
			STORECD: "00002",
			CLOSEDATE: "2022-01-01",
		},
		{
			STORECD: "00003",
			CLOSEDATE: "2022-01-10",
		},
		{
			STORECD: "00004",
			CLOSEDATE: "2022-01-10",
		},
	]);
	const [tableOneRight, setTableOneRight] = useState([]);
	const [selectedOneLeftTable, setSelectedOneLeftTable] = useState([]);
	const [selectedOneRightTable, setSelectedOneRightTable] = useState([]);

	const [tableTwoLeft, setTableTwoLeft] = useState([
		{
			STORECD: "00001",
			CLOSEDATE: "2022-01-05",
		},
		{
			STORECD: "00002",
			CLOSEDATE: "2022-01-05",
		},
		{
			STORECD: "00003",
			CLOSEDATE: "2022-01-05",
		},
		{
			STORECD: "00004",
			CLOSEDATE: "2022-01-05",
		},
	]);
	const [tableTwoRight, setTableTwoRight] = useState([]);

	const [selectedTwoLeftTable, setSelectedTwoLeftTable] = useState([]);
	const [selectedTwoRightTable, setSelectedTwoRightTable] = useState([]);

	const [finalTable, setFinalTable] = useState([]);

	const options = [
		{ option: "Recommended for you", value: "1", icon: <BsStars /> },
		{
			option: "Views(high to low)",
			value: "2",
			icon: <FaArrowDownWideShort />,
		},
	];

	const data = [
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
			video: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		},
	];

	// const handleOneLeftTableRowClick = (index: any) => {
	// 	const updatedSelectedRows = [...selectedOneLeftTable];
	// 	const selectedRowIndex = updatedSelectedRows.indexOf(index);

	// 	if (selectedRowIndex === -1) {
	// 		// If the row is not selected, add it to the selection
	// 		updatedSelectedRows.push(index);
	// 	} else {
	// 		// If the row is already selected, remove it from the selection
	// 		updatedSelectedRows.splice(selectedRowIndex, 1);
	// 	}

	// 	setSelectedOneLeftTable(updatedSelectedRows);
	// };

	const handleOneLeftTableRowClick = (selectedRow: any) => {
		const isRowSelected = selectedOneLeftTable.some(
			(row: any) => row.STORECD === selectedRow.STORECD
		);

		if (isRowSelected) {
			// If the row is already selected, remove it from the selection
			setSelectedOneLeftTable((prevSelectedRows) =>
				prevSelectedRows.filter(
					(row: any) => row.STORECD !== selectedRow.STORECD
				)
			);
		} else {
			// If the row is not selected, add it to the selection
			setSelectedOneLeftTable((prevSelectedRows) => [
				...prevSelectedRows,
				selectedRow,
			]);
		}
	};

	const handleOneRight = () => {
		// console.log("data", selectedOneLeftTable);
		// setTableOneRight([...tableOneRight, ...selectedOneLeftTable]);

		// const oneLeftTemp = [...tableOneLeft];
		// const data = oneLeftTemp.filter(
		// 	(row: any) => row.STORECD != selectedOneLeftTable.STORECD
		// );

		// console.log("object", data);
		// setTableOneLeft(data);
		// setSelectedOneLeftTable([]);

		const updatedTableOne = tableOneLeft.filter(
			(row) =>
				!selectedOneLeftTable.some(
					(selectedRow) => selectedRow.STORECD === row.STORECD
				)
		);

		const updatedTableRight = tableOneLeft.filter((row) =>
			selectedOneLeftTable.some(
				(selectedRow) => selectedRow.STORECD === row.STORECD
			)
		);

		console.log("updatedTableRight", updatedTableRight);

		setTableOneRight((prevTableTwo) => [
			...prevTableTwo,
			...updatedTableRight,
		]);
		setTableOneLeft(updatedTableOne);
		setSelectedOneLeftTable([]);
		setFinalTable((prev) => [
			...prev,
			...tableOneRight,
			...updatedTableRight,
		]);
	};

	return (
		<div className="py-10 pb-16 px-4">
			<div className="flex items-start gap-12">
				<table>
					<caption className="my-1 font-semibold text-left">
						Table One Left
					</caption>
					<thead>
						<tr className="bg-primary text-white">
							<th className="border border-primary p-2">STORE CODE</th>
							<th className="border border-primary p-2">CLOSE DATE</th>
						</tr>
					</thead>
					<tbody>
						{tableOneLeft.map((i, index) => {
							const isSelected = selectedOneLeftTable.some(
								(row) => row.STORECD === i.STORECD
							);
							return (
								<tr
									key={index}
									onClick={() => handleOneLeftTableRowClick(i)}
									className={`${
										isSelected ? "bg-primary-100" : "bg-transparent"
									} cursor-pointer`}
								>
									<td className="border border-primary p-1">
										{i.STORECD}
									</td>
									<td className="border border-primary p-1">
										{i.CLOSEDATE}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className="flex flex-col gap-2">
					<Button color="default">Left</Button>
					<Button color="primary" onClick={handleOneRight}>
						Right
					</Button>
				</div>

				<table>
					<caption className="my-1 font-semibold text-left">
						Table One Right
					</caption>
					<thead>
						<tr className="bg-primary text-white">
							<th className="border border-primary p-2">STORE CODE</th>
							<th className="border border-primary p-2">CLOSE DATE</th>
						</tr>
					</thead>
					<tbody>
						{tableOneRight.map((i, index) => {
							return (
								<tr key={index}>
									<td className="border border-primary p-1">
										{i.STORECD}
									</td>
									<td className="border border-primary p-1">
										{i.CLOSEDATE}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<hr className="border border-primary my-5" />
			<div className="flex items-start gap-12">
				<table>
					<caption className="my-1 font-semibold text-left">
						Table Two Left
					</caption>
					<thead>
						<tr className="bg-primary text-white">
							<th className="border border-primary p-2">STORE CODE</th>
							<th className="border border-primary p-2">CLOSE DATE</th>
						</tr>
					</thead>
					<tbody>
						{tableTwoLeft.map((i, index) => {
							return (
								<tr key={index}>
									<td className="border border-primary p-1">
										{i.STORECD}
									</td>
									<td className="border border-primary p-1">
										{i.CLOSEDATE}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className="flex flex-col gap-2">
					<Button color="default">Left</Button>
					<Button color="primary">Right</Button>
				</div>

				<table>
					<caption className="my-1 font-semibold text-left">
						Table Two Right
					</caption>
					<thead>
						<tr className="bg-primary text-white">
							<th className="border border-primary p-2">STORE CODE</th>
							<th className="border border-primary p-2">CLOSE DATE</th>
						</tr>
					</thead>
					<tbody>
						{tableTwoRight.map((i, index) => {
							return (
								<tr key={index}>
									<td className="border border-primary p-1">
										{i.STORECD}
									</td>
									<td className="border border-primary p-1">
										{i.CLOSEDATE}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="mt-6 flex w-full justify-center">
				<table>
					<caption className="my-1 font-semibold text-left">
						Final Table
					</caption>
					<thead>
						<tr className="bg-primary text-white">
							<th className="border border-primary p-2">STORE CODE</th>
							<th className="border border-primary p-2">CLOSE DATE</th>
						</tr>
					</thead>
					<tbody>
						{finalTable.map((i, index) => {
							return (
								<tr key={index}>
									<td className="border border-primary p-1">
										{i.STORECD}
									</td>
									<td className="border border-primary p-1">
										{i.CLOSEDATE}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* <HomeCarousel data={data} /> */}
			<div className="flex gap-5 flex-col w-fit mt-96">
				<div className="flex p-5 gap-10">
					<Button color="default">Default</Button>
					<a
						data-tooltip-id="my-tooltip"
						data-tooltip-content="Tooltip"
						data-tooltip-place="top"
					>
						<Button color="primary">With Tooltip</Button>
					</a>
					<CategoryLink
						to="http://www.google.com"
						color="default"
						size="md"
						icon={<img src={categoryimg} alt="icon" />}
					>
						Games
					</CategoryLink>
				</div>

				<div>
					<ProfileStreamInfo
						isLive={false}
						message={"Check out this mobile legends: Bang Bang"}
						viewer={"52k"}
					/>
				</div>

				<div className="flex p-5 gap-2.5">
					<Tag to="/directory">Directory</Tag>
					<Icon icon={GoPerson} className="text-primary" />
				</div>
			</div>

			<CategoryLink
				to="http://www.google.com"
				color="default"
				size="md"
				icon={<img src={categoryimg} alt="icon" />}
			>
				Games
			</CategoryLink>

			<div className="float-right">
				<Select options={options} />
			</div>

			<Avatar />

			<ProfileHeading
				streamerName="GeminiTay"
				streamTitle="Stardew Sunday! We are back in spring year 2 :)"
				gameName="Stardew Valley"
				gameTags={["funny", "kid", "English"]}
				viewers={10}
				time={"20:00:11"}
			/>
			<ProfileDescription
				streamerName="GeminiTay"
				followerCount={"211K"}
				description={
					"Canadian gaming Youtuber and Twitch Streamer. I play Minecraft with a focus on building and creating art in the game."
				}
				socialLinks={{
					facebook: "www.facebook.com/username",
					instagram: "www.instagram.com/username",
					youtube: "www.youtube.com/username",
				}}
			/>

			<ProfileAvatar
				imageUrl="https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
				altText="User Avatar"
				isLive={true}
				size={50}
			/>

			<div className="flex space-x-4">
				<SocialLink platform="facebook" username="example" />
				<SocialLink platform="linkedin" username="example" />
				<SocialLink platform="twitter" username="example" />
			</div>
		</div>
	);
};

export default TestingComponents;
