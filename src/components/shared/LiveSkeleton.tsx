import React from "react";
import Skeleton from "react-loading-skeleton";

interface LiveSkeletonProps {
	loopCount?: number;
}

const LiveSkeleton: React.FC<LiveSkeletonProps> = ({ loopCount = 5 }) => {
	return (
		<>
			{Array(loopCount)
				.fill(null)
				.map((_, index) => (
					<div className="flex flex-col gap-2" key={`ske${index}`}>
						<Skeleton height={128} />
						<div className="flex items-center gap-3">
							<Skeleton height={48} width={48} />
							<Skeleton
								height={8}
								count={3}
								containerClassName="flex-1"
							/>
						</div>
						<Skeleton height={10} containerClassName="flex-1" />
					</div>
				))}
		</>
	);
};

export default LiveSkeleton;
