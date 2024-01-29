/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
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
		// {
		// 	STORECD: "00003",
		// 	CLOSEDATE: "2022-01-05",
		// },
		{
			STORECD: "00004",
			CLOSEDATE: "2022-01-05",
		},
	]);
	const [tableTwoRight, setTableTwoRight] = useState([]);

	const [selectedTwoLeftTable, setSelectedTwoLeftTable] = useState([]);
	const [selectedTwoRightTable, setSelectedTwoRightTable] = useState([]);

	const [finalTable, setFinalTable] = useState([
		{
			STORECD: "00003",
			CLOSEDATE: "2022-01-05",
		},
	]);

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

	const handleOneRightTableRowClick = (selectedRow: any) => {
		const isRowSelected = selectedOneRightTable.some(
			(row: any) => row.STORECD === selectedRow.STORECD
		);

		if (isRowSelected) {
			// If the row is already selected, remove it from the selection
			setSelectedOneRightTable((prevSelectedRows) =>
				prevSelectedRows.filter(
					(row: any) => row.STORECD !== selectedRow.STORECD
				)
			);
		} else {
			// If the row is not selected, add it to the selection
			setSelectedOneRightTable((prevSelectedRows) => [
				...prevSelectedRows,
				selectedRow,
			]);
		}
	};

	const handleOneRightButtonTesting = () => {
		const handleOneRightButton = () => {
			if (selectedOneLeftTable.length > 0) {
				// const updatedSelectedOneLeftTable = finalTable.map((store) =>
				// 	selectedOneLeftTable.find(
				// 		(updatedStore) => updatedStore.STORECD === store.STORECD
				// 	)
				// 		? {
				// 				...store,
				// 				CLOSEDATE: updatedTableRight.find(
				// 					(updatedStore) => updatedStore.STORECD === store.STORECD
				// 				)?.CLOSEDATE,
				// 		  }
				// 		: store
				// );

				const biggerData = [];
				const smallerData = [];

				const updatedSelectedOneLeftTable = selectedOneLeftTable.filter(
					(item1) =>
						finalTable.some(
							(item2) =>
								item2.STORECD === item1.STORECD &&
								item2.CLOSEDATE > item1.CLOSEDATE
						)
				);

				// updatedSelectedOneLeftTable.forEach(element => {
				// 	if(new Date(element.CLOSEDATE) > )
				// });

				const ftable = [...finalTable];
				const ftable2 = [...finalTable];
				const tableLeft = [...tableOneLeft];
				const ttable = [...tableTwoLeft];

				for (const rowA of tableOneLeft) {
					const correspondingRowC = finalTable.find(
						(rowC) => rowC.STORECD === rowA.STORECD
					);

					console.log("correspondingRowC", correspondingRowC);

					if (correspondingRowC) {
						if (
							new Date(rowA.CLOSEDATE) >
							new Date(correspondingRowC.CLOSEDATE)
						) {
							// Move rowA to C
							// finalTable.push(rowA);
							ftable.push(rowA);
							tableLeft.splice(tableLeft.indexOf(rowA), 1);
						} else {
							// Move correspondingRowC to B
							// tableTwoLeft.push(correspondingRowC);
							ttable.push(correspondingRowC);

							// Remove correspondingRowC from C
							ftable2.splice(ftable2.indexOf(rowA), 1);

							// setFinalTable(
							// 	finalTable.splice(finalTable.indexOf(correspondingRowC), 1)
							// );
						}
					}
				}

				// setFinalTable(ftable2);
				// Remove rowA from A
				setFinalTable((prev) => [...prev, ...ftable]);
				setTableOneLeft((prev) => [...prev, ...tableLeft]);
				setTableTwoLeft((prev) => [...prev, ...ttable]);

				console.log(
					"updatedSelectedOneLeftTable",
					updatedSelectedOneLeftTable
				);
				// const updatedTableOne = tableOneLeft.filter(
				// 	(row) =>
				// 		!selectedOneLeftTable.some(
				// 			(selectedRow) => selectedRow.STORECD === row.STORECD
				// 		)
				// );

				// const updatedTableRight = tableOneLeft.filter((row) =>
				// 	selectedOneLeftTable.some(
				// 		(selectedRow) => selectedRow.STORECD === row.STORECD
				// 	)
				// );

				// setTableOneRight((prevTableTwo) => [
				// 	...prevTableTwo,
				// 	...updatedTableRight,
				// ]);
				// setTableOneLeft(updatedTableOne);
				// setSelectedOneLeftTable([]);
				// setFinalTable((prev) => [
				// 	...prev,
				// 	...tableOneRight,
				// 	...updatedTableRight,
				// ]);
			}
		};
	};

	const handleOneRightButton = () => {
		if (selectedOneLeftTable.length > 0) {
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
		}
	};

	const handleOneLeftButton = () => {
		const updatedTableOne = tableOneRight.filter(
			(row) =>
				!selectedOneRightTable.some(
					(selectedRow) => selectedRow.STORECD === row.STORECD
				)
		);

		const updatedTableRight = tableOneRight.filter((row) =>
			selectedOneRightTable.some(
				(selectedRow) => selectedRow.STORECD === row.STORECD
			)
		);

		setTableOneLeft((prevTableTwo) => [
			...prevTableTwo,
			...updatedTableRight,
		]);
		setTableOneRight(updatedTableOne);
		setSelectedOneRightTable([]);
		setFinalTable((prev) => [...prev, ...tableOneLeft, ...updatedTableRight]);
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
					<Button color="default" onClick={handleOneLeftButton}>
						One Left
					</Button>
					<Button color="primary" onClick={handleOneRightButton}>
						One Right
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
							const isSelected = selectedOneRightTable.some(
								(row) => row.STORECD === i.STORECD
							);
							return (
								<tr
									key={index}
									onClick={() => handleOneRightTableRowClick(i)}
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
			</div>
			<hr className="border border-primary my-5" />
			{/* finish one here */}

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
