import gaming from "@assets/images/gaming.svg";
import Tag from "@components/ui/Tag";
import { RootState } from "@store/index";
import {
	setCategoryData,
} from "@store/slices/categorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryHeader: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { categoryData } = useSelector((state: RootState) => state.category);

	useEffect(() => {
		if (categoryData === null) navigate("/");
	}, []);

	const handleLink = (data: any) => {
		dispatch(setCategoryData(data));
		navigate(`/directory/category/${data?.categoryName}`);
	};

	return (
		<div className="w-full lg:w-2/4">
			<div className="grid grid-cols-12 lg:grid-cols-5 lg:gap-4">
				{/* Image Thumbnail Grid (20%) */}
				<div className="col-span-12 lg:col-span-1">
					<img
						src={categoryData?.image || gaming}
						alt={categoryData?.categoryName}
						className="w-full h-full mb-4"
						loading="lazy"
					/>
				</div>

				{/* Title and Content Grid (80%) */}
				<div className="col-span-12 lg:col-span-4 grid lg:grid-cols-1">
					<div className="flex flex-col lg:p-4 rounded-md gap-1">
						<h1 className="text-xl font-bold mb-2">
							{categoryData?.categoryName}
						</h1>
						{categoryData?.secondCat && (
							<div className="flex items-center gap-3 mb-3">
								{/* <div className="rounded-full w-1 h-1 bg-current"></div> */}
								{categoryData?.secondCat.map((item, index) => (
									<Tag
										key={index}
										to={""}
										onClick={() => handleLink(item)}
									>
										{item.categoryName}
									</Tag>
								))}
							</div>
						)}

						<p>
							{categoryData?.description ||
								"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, excepturi aliquam explicabo nihil eligendi repellat sit ea cupiditate. Pariatur mollitia eius a! Aspernatur est eius odit doloremque, asperiores maxime quos."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryHeader;
