import React from "react";
import "./Loader.css";

const LoadingIndicator: React.FC = () => {
	return (
		<div className="flex h-screen justify-center items-center">
			<div className="loader">
				{[0, 1, 2, 3, 4].map((index) => (
					<div
						key={index}
						className="orbe"
						style={{ "--index": index } as React.CSSProperties}
					></div>
				))}
			</div>
		</div>
	);
};

export default LoadingIndicator;
