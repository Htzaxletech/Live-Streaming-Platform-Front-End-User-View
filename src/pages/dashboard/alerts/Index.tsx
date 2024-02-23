import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import TogglePanel from "@components/ui/TogglePanel";
import Variants from "./variants/Index";
import { IoDiamondSharp } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import GeneralSettings from "./settings/general-settings/Index";
import editorSvg from "@assets/images/editor.svg";
import Layout from "./settings/layout/Index";
import { RiLayoutLeft2Line } from "react-icons/ri";

const Alerts = () => {
	const [inAnimation, setInAnimation] = useState<string>("none");
	const [outAnimation, setOutAnimation] = useState<string>("none");
	const [animationTime, setAnimationTime] = useState<number>(1);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(500);
	const [height, setHeight] = useState<number>(500);

	const animationElementRef = useRef<HTMLDivElement>(null);

	const handleInAnimationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setInAnimation(e.target.value);
	};

	const handleOutAnimationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setOutAnimation(e.target.value);
	};

	const handleAnimationTimeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAnimationTime(parseFloat(e.target.value));
	};

	const handleFireAnimation = () => {
		if (isAnimating) return; // Prevent triggering animation when another animation is ongoing

		const element = animationElementRef.current;
		if (!element) return;

		// Set in animation
		if (inAnimation !== "none") {
			setIsAnimating(true); // Set isAnimating to true
			element.classList.add(inAnimation);

			// Remove in animation class after animation time
			setTimeout(() => {
				setIsAnimating(false); // Set isAnimating to false
				element.classList.remove(inAnimation);

				// Set out animation if needed
				if (outAnimation !== "none") {
					setIsAnimating(true); // Set isAnimating to true
					element.classList.add(outAnimation);

					// Remove out animation class after animation time
					setTimeout(() => {
						setIsAnimating(false); // Set isAnimating to false
						element.classList.remove(outAnimation);
					}, animationTime * 1000);
				}
			}, animationTime * 1000);
		}
	};

	return (
		<div className="flex flex-col h-screen mt-[18px]">
			{/* Top header */}
			<div className="sticky top-[50px] shadow z-10 bg-background-body flex justify-between items-center px-4 py-2">
				<div>
					<Button>Back to Alerts Home</Button>
				</div>
				<div>
					<h6 className="font-semibold">Alert Box 2</h6>
				</div>
				<div className="flex items-center gap-2">
					<Button color="default" size="lg">
						Discard Changes
					</Button>
					<Button color="primary" size="lg">
						Save Changes
					</Button>
				</div>
			</div>

			{/* Main content */}
			<div className="flex flex-grow">
				<div className="overflow-y-auto flex h-screen">
					<div className="w-80 flex-grow-0 bg-background-base">
						<TogglePanel
							icon={<FaRegHeart />}
							heading={"Follows"}
							defaultOpen={true}
							className="bg-background-float"
						>
							<Variants />
						</TogglePanel>

						<TogglePanel
							heading="Subscriptions"
							icon={<FaRegStar />}
							defaultOpen={false}
							className="bg-background-float"
						>
							<Variants />
						</TogglePanel>

						<TogglePanel
							heading="Donations"
							icon={<IoDiamondSharp />}
							defaultOpen={false}
							className="bg-background-float"
						>
							<Variants />
						</TogglePanel>
					</div>
				</div>

				<div className="flex-grow bg-gray-200">
					<div className="container bg-background-body h-full w-full max-w-full flex justify-center">
						<div
							className="flex items-center justify-center"
							style={{
								backgroundImage: `url(${editorSvg})`,
								// width: "100%", height: "100%"
								width,
								height,
							}}
						>
							<div
								ref={animationElementRef}
								className="animation-element"
								onAnimationEnd={() => setIsAnimating(false)} // Reset isAnimating state after animation end
								// style={{ width, height }}
							>
								<img
									src="/src/assets/images/angela.jpg"
									alt="Heart icon"
								/>
								<p>Hello, world!</p>
							</div>
						</div>
					</div>
					<div className="sticky bottom-16 bg-background-base shadow z-10 flex justify-between items-center mx-3 rounded px-4 py-2 text-xs">
						<Label className="font-semibold">Preview Options</Label>
						<div className="flex gap-2 items-center">
							<Label className="font-semibold">Width px</Label>
							<Input
								size="sm"
								className="w-14"
								onChange={(i) => {
									if (i.target.value) {
										setWidth(parseInt(i.target.value));
									} else {
										setWidth(500);
									}
								}}
								value={width}
							/>
							<Label className="font-semibold">Height px</Label>
							<Input
								size="sm"
								className="w-14"
								onChange={(i) => {
									if (i.target.value) {
										setHeight(parseInt(i.target.value));
									} else {
										setHeight(500);
									}
								}}
								value={height}
							/>
						</div>
					</div>
				</div>

				<div className="overflow-y-auto flex h-screen">
					<div className="w-80 flex-grow-0 bg-background-base">
						<TogglePanel
							heading="General Settings"
							icon={<MdOutlineSettings />}
							defaultOpen={false}
							className="bg-background-float"
						>
							<GeneralSettings />
						</TogglePanel>

						<TogglePanel
							heading="Layout"
							icon={<RiLayoutLeft2Line />}
							defaultOpen={false}
							className="bg-background-float"
						>
							<Layout />
						</TogglePanel>
					</div>
				</div>
			</div>

			{/* Bottom footer */}
			<div className="sticky bottom-0 bg-background-base shadow z-10 flex justify-between items-center px-4 py-2">
				<div></div>
				<div className="flex items-center gap-3">
					<Label>Browser Source URL</Label>
					<Input />
					<Button color="primary" size="lg">
						Copy
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Alerts;
