/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import game from "../../pages/game-pubg.jpg";
import Tag from "@components/ui/Tag";
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router-dom";

interface DataProps {
	ID: number;
	mainCategoryID: number;
	categoryName?: string;
	image: string;
	secondCat?: [];
	s3categoryImage: string;
}

interface CategoryCardProps {
	data?: DataProps;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
	const navigate = useNavigate();
	// const dispatch = useDispatch();

	const card = tv({
		slots: {
			cardContainer: "mx-auto duration-300 bg-primary cursor-pointer w-full",
			imageCover: "h-full bg-cover",
			cardContent: "pt-2",
			flexContainer: "flex items-center gap-3",
			titleContainer: "col-span-1",
			title: "font-semibold",
			username: "cursor-pointer text-soft",
			categoryName: "cursor-pointer text-soft",
			tagsContainer: "flex flex-wrap gap-2 items-center mt-2",
			liveScreenCard:
				"relative hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 h-48 w-full",
		},
	});

	const {
		cardContainer,
		imageCover,
		cardContent,
		flexContainer,
		titleContainer,
		title,
		tagsContainer,
		liveScreenCard,
	} = card();

	const handleLink = (param: unknown) => {
		navigate(`/directory/category/${param?.ID}`);
	};

	return (
		<div className="flex flex-col">
			<div className={cardContainer()} onClick={() => handleLink(data)}>
				<div className={liveScreenCard()}>
					<img
						className={imageCover()}
						src={data?.s3categoryImage || game}
						alt={data?.categoryName}
						loading="lazy"
					/>
				</div>
			</div>

			<div className={cardContent()}>
				<div className={flexContainer()}>
					<div className={titleContainer()}>
						<div className={title()}>{data?.categoryName}</div>
					</div>
				</div>
				<div className={tagsContainer()}>
					{data?.secondCat &&
						data?.secondCat.length > 0 &&
						data?.secondCat.map((i, index) => {
							return (
								<Tag
									key={index}
									to={"/directory"}
									state={{ directory: { ...i, active: 0 } }}
								>
									{i.categoryName}
								</Tag>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;
