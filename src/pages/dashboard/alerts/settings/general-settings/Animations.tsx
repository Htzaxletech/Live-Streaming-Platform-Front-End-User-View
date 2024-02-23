import { useRef, useState } from "react";
import "@styles/GeneralSettingAnimations.css";
import * as Label from "@radix-ui/react-label";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

const Animations = () => {
	const [inAnimation, setInAnimation] = useState<string>("none");
	const [outAnimation, setOutAnimation] = useState<string>("none");
	const [animationTime, setAnimationTime] = useState<number>(1);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
		<>
			<h6 className="mt-3 font-semibold">Animations (In seconds)</h6>
			<div className="flex items-center justify-between">
				<Label.Root className="font-semibold w-6">In</Label.Root>
				<div className="flex relative items-center h-9 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						id="animation-in"
						value={inAnimation}
						onChange={handleInAnimationChange}
					>
						<option value="none">None</option>
						<option value="fade-in">Fade In</option>
						<option value="roll-in">Roll In</option>
						<option value="slide-up">Slide Up</option>
						<option value="slide-down">Slide Down</option>
						<option value="slide-left">Slide Left</option>
						<option value="slide-right">Slide Right</option>
						<option value="zoom-in">Zoom In</option>
					</select>
				</div>
				<Input
					className="max-w-10"
					id="animation-time"
					value={animationTime}
					min="0"
					onChange={handleAnimationTimeChange}
				/>
			</div>

			<div className="flex items-center justify-between">
				<Label.Root className="font-semibold w-6">Out</Label.Root>
				<div className="flex relative items-center h-9 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						id="animation-out"
						value={outAnimation}
						onChange={handleOutAnimationChange}
					>
						<option value="none">None</option>
						<option value="fade-out">Fade Out</option>
						<option value="roll-out">Roll Out</option>
						<option value="slide-up">Slide Up</option>
						<option value="slide-down">Slide Down</option>
						<option value="slide-left">Slide Left</option>
						<option value="slide-right">Slide Right</option>
						<option value="zoom-out">Zoom Out</option>
					</select>
				</div>
				<Input
					className="max-w-10"
					id="animation-time"
					value={animationTime}
					min="0"
					onChange={handleAnimationTimeChange}
				/>
			</div>

			{/*  */}
			{/* <label htmlFor="animation-in">Select In Animation:</label>
			<select
				id="animation-in"
				value={inAnimation}
				onChange={handleInAnimationChange}
			>
				<option value="none">None</option>
				<option value="fade-in">Fade In</option>
				<option value="roll-in">Roll In</option>
				<option value="slide-up">Slide Up</option>
				<option value="slide-down">Slide Down</option>
				<option value="slide-left">Slide Left</option>
				<option value="slide-right">Slide Right</option>
				<option value="zoom-in">Zoom In</option>
			</select>
			<label htmlFor="animation-out">Select Out Animation:</label>
			<select
				id="animation-out"
				value={outAnimation}
				onChange={handleOutAnimationChange}
			>
				<option value="none">None</option>
				<option value="fade-out">Fade Out</option>
				<option value="roll-out">Roll Out</option>
				<option value="slide-up">Slide Up</option>
				<option value="slide-down">Slide Down</option>
				<option value="slide-left">Slide Left</option>
				<option value="slide-right">Slide Right</option>
				<option value="zoom-out">Zoom Out</option>
			</select>

			<label htmlFor="animation-time">Animation Time (seconds):</label>
			<input
				type="number"
				id="animation-time"
				value={animationTime}
				min="0"
				step="0.1"
				onChange={handleAnimationTimeChange}
			/> */}

			<Button onClick={handleFireAnimation}>Fire Animation</Button>
		</>
	);
};

export default Animations;
