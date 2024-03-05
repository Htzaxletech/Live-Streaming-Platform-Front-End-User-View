import "@styles/GeneralSettingAnimations.css";
import * as Label from "@radix-ui/react-label";
import { changeFormData } from "@store/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";

const Animations = () => {
	const dispatch = useDispatch();

	const {
		inAnimationType,
		inAnimationTime,
		outAnimationType,
		outAnimationTime,
	} = useSelector((state: RootState) => state.alert.data);

	const handleInAnimationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedOption = e.target.selectedOptions[0];
		const animateValue = selectedOption.getAttribute("data-animate");

		dispatch(
			changeFormData({
				inAnimation: animateValue,
				inAnimationType: e.target.value,
			})
		);
	};

	const handleOutAnimationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(changeFormData({ outAnimation: e.target.value }));

		const selectedOption = e.target.selectedOptions[0];
		const animateValue = selectedOption.getAttribute("data-animate");

		dispatch(
			changeFormData({
				outAnimation: animateValue,
				outAnimationType: e.target.value,
			})
		);
	};

	const handleInAnimationTimeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(changeFormData({ inAnimationTime: e.target.value }));
	};

	const handleOutAnimationTimeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(changeFormData({ outAnimationTime: e.target.value }));
	};

	const animationIn = [
		{ title: "Fade In", type: "fade-in", animateClass: "fade-in" },
		{
			title: "Roll In",
			type: "roll-in",
			animateClass: "rotate-[360deg] slide-in-from-left",
		},
		{
			title: "Slide Up",
			type: "slide-up",
			animateClass: "slide-in-from-bottom",
		},
		{
			title: "Slide Down",
			type: "slide-down",
			animateClass: "slide-in-from-top",
		},
		{
			title: "Slide Left",
			type: "slide-left",
			animateClass: "slide-in-from-right",
		},
		{
			title: "Slide Right",
			type: "slide-right",
			animateClass: "slide-in-from-left",
		},
		{ title: "Zoom In", type: "zoom-in", animateClass: "zoom-in" },
	];

	const animationOut = [
		{ title: "Fade Out", type: "fade-out", animateClass: "fade-out" },
		{
			title: "Roll Out",
			type: "roll-out",
			animateClass: "-rotate-180 slide-out-to-right",
		},
		{
			title: "Slide Up",
			type: "slide-up",
			animateClass: "slide-out-to-top",
		},
		{
			title: "Slide Down",
			type: "slide-down",
			animateClass: "slide-out-to-bottom",
		},
		{
			title: "Slide Left",
			type: "slide-left",
			animateClass: "slide-out-to-left",
		},
		{
			title: "Slide Right",
			type: "slide-right",
			animateClass: "slide-out-to-right",
		},
		{ title: "Zoom Out", type: "zoom-out", animateClass: "zoom-out" },
	];

	return (
		<>
			<h6 className="mt-3 font-semibold">Animations (In seconds)</h6>
			<div className="flex items-center justify-between">
				<Label.Root className="font-semibold w-6">In</Label.Root>
				<div className="flex relative items-center h-8 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						value={inAnimationType}
						onChange={handleInAnimationChange}
					>
						<option value="none">None</option>
						{animationIn.map((i, index) => (
							<option
								key={i.type + index}
								value={i.type}
								data-animate={i.animateClass}
							>
								{i.title}
							</option>
						))}
					</select>
				</div>
				<div className="flex relative items-center h-8 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm max-w-10 h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						value={inAnimationTime}
						onChange={handleInAnimationTimeChange}
					>
						<option value="duration-1000">1</option>
						<option value="duration-2000">2</option>
						<option value="duration-3000">3</option>
						<option value="duration-4000">4</option>
						<option value="duration-5000">5</option>
					</select>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<Label.Root className="font-semibold w-6">Out</Label.Root>
				<div className="flex relative items-center h-8 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm w-full h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						value={outAnimationType}
						onChange={handleOutAnimationChange}
					>
						<option value="none">None</option>
						{animationOut.map((i, index) => (
							<option
								key={i.type + index}
								value={i.type}
								data-animate={i.animateClass}
							>
								{i.title}
							</option>
						))}
					</select>
				</div>
				<div className="flex relative items-center h-8 outline-none text-xl bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-1 hover:ring-border focus-within:ring-2 focus-within:ring-primary">
					<select
						className="text-sm max-w-10 h-full bg-background-base focus-within:ring-2 focus-within:ring-primary pl-3 rounded-md"
						value={outAnimationTime}
						onChange={handleOutAnimationTimeChange}
					>
						<option value="duration-1000">1</option>
						<option value="duration-2000">2</option>
						<option value="duration-3000">3</option>
						<option value="duration-4000">4</option>
						<option value="duration-5000">5</option>
					</select>
				</div>
			</div>
		</>
	);
};

export default Animations;
