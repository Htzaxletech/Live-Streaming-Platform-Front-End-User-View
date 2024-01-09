// import Button from "@components/ui/Button";
import gaming from "@assets/images/gaming.svg";
import Tag from "@components/ui/Tag";
// import heart from "@assets/images/heart.svg";

const CategoryHeader: React.FC = () => {
	const items = [
		{
			id: 1,
			imageUrl: gaming, // Replace with your image URLs
			title: "Cat 1",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			tagName: "RPG",
		},
		{
			id: 2,
			imageUrl: gaming,
			title: "Cat 2",
			content:
				"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
			tagName: "MOBA",
		},
		// Add more items as needed
	];

	return (
		<div className="w-2/4">
			<ThumbnailGrid items={items} />
		</div>
	);
};

interface ThumbnailGridProps {
	items: Array<{
		id: number;
		imageUrl: string;
		title: string;
		content: string;
		tagName: string;
	}>;
}

const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({ items }) => {
	return (
		<div className="grid grid-cols-5 gap-4">
			{/* Image Thumbnail Grid (20%) */}
			<div className="col-span-1">
				<img src={gaming} alt={gaming} className="w-full h-full mb-4" />
			</div>

			{/* Title and Content Grid (80%) */}
			<div className="col-span-4 grid grid-cols-1">
				<div className="flex flex-col p-4 rounded-md gap-1">
					<h1 className="text-xl font-bold mb-2">Category Name</h1>
					<div className="flex items-center gap-3">
						<p>
							<span className="font-semibold">1.2K</span> Viewers
						</p>
						<div className="rounded-full w-1 h-1 bg-current"></div>
						<p>
							<span className="font-semibold">2.5M</span> Followers
						</p>
						<div className="rounded-full w-1 h-1 bg-current"></div>
						{items.map((item, index) => (
							<Tag key={index} to={""}>
								{item.tagName}
							</Tag>
						))}
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Laboriosam, excepturi aliquam explicabo nihil eligendi
						repellat sit ea cupiditate. Pariatur mollitia eius a!
						Aspernatur est eius odit doloremque, asperiores maxime quos.
					</p>
					{/* <div className="mt-3">
            <Button color="primary" className="py-4 gap-1">
              <img src={heart} alt="image" />
              Follow
            </Button>
          </div> */}
				</div>
			</div>
		</div>
	);
};

export default CategoryHeader;
