// import { Select } from "@components/ui/Select";
// import { BsStars } from "react-icons/bs";
// import { FaArrowDownWideShort } from "react-icons/fa6";
import Input from "@components/ui/Input";
import { RiSearchLine } from "react-icons/ri";
import Button from "@components/ui/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import Tag from "@components/ui/Tag";
import BrowseCategoryList from "./BrowseCategoryList";
import BrowseLiveList from "./BrowseLiveList";
import { useLocation, useNavigate } from "react-router-dom";

const BrowsePage = ({ status }: { status: string }) => {
	const inputRef = useRef(null);
	const [searchTag, setSearchTag] = useState("");
	const { state } = useLocation();
	const navigate = useNavigate();
	// const options = [
	// 	{ option: "Recommended for you", value: "1", icon: <BsStars /> },
	// 	{
	// 		option: "Views(high to low)",
	// 		value: "2",
	// 		icon: <FaArrowDownWideShort />,
	// 	},
	// ];

	useEffect(() => {
		if (state?.directory?.categoryName) {
			setSearchTag(state?.directory?.categoryName);
		}
	}, [state?.directory?.categoryName]);

	const handleSubmit = useCallback(
		(e: { preventDefault: () => void; }) => {
			e.preventDefault();
			const inputValue = inputRef.current?.value;

			setSearchTag(inputValue || ""); // Set searchTag to inputValue, default to '' if inputValue is undefined
			if (inputValue !== undefined) {
				inputRef.current.value = ""; // Reset input value
			}

			navigate("/directory", {
				state: null
			})
		},
		[setSearchTag]
	);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<Input
							className="hidden md:flex h-8"
							startContent={<RiSearchLine />}
							placeholder="Search Category Tags"
							ref={inputRef}
						/>
						<Button className="md:hidden" type="submit">
							<RiSearchLine />
						</Button>
						{searchTag && <Tag to="">{searchTag || ""}</Tag>}
					</div>
					{/* <div>
						<span className="font-semibold hidden sm:inline">
							Sort By
						</span>
						<Select options={options} className="z-10 h-8" />
					</div> */}
				</div>
			</form>

			{status === "categories" && <BrowseCategoryList keyword={searchTag} />}
			{status === "live" && <BrowseLiveList keyword={searchTag} />}
		</div>
	);
};

export default BrowsePage;
