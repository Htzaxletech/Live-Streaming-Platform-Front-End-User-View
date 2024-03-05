import React from "react";
import Skeleton from "react-loading-skeleton";

interface CategorySkeletonProps {
	loopCount?: number;
}

const CategorySkeleton: React.FC<CategorySkeletonProps> = ({
	loopCount = 5,
}) => {
	return (
		<>
			{Array(loopCount)
				.fill(null)
				.map((_, index) => (
					<div
						className="flex flex-col gap-2"
						key={`category-ske${index}`}
					>
						<Skeleton height={192} />
						<div>
							<Skeleton />
							<Skeleton width={65} />
						</div>
					</div>
				))}
		</>
	);
};

export default CategorySkeleton;