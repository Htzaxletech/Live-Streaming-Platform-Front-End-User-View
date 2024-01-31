import { cn } from "@utils/cn";
// import Logo from "./Logo"
import Button from "@components/ui/Button";
import { useDispatch } from "react-redux";
import { setOpenSignUp } from "@store/slices/modalSlice";

const Footer = () => {
	const dispatch = useDispatch();
	return (
		<footer
			className={cn(
				"fixed w-full left-0 bottom-0",
				"p-3 bg-primary-500 text-white",
				"font-bold",
				"z-40"
			)}
		>
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className={"flex justify-start items-end mb-3 md:mb-0"}>
					{/* <Logo /> */}
					<span className="text-3xl" aria-label="footer msc">
						😺
					</span>
					<p className="ms-2 text-lg">Join the BetaLiveStream community</p>
				</div>
				<div className="w-full md:w-auto">
					<Button
						color="white"
						className="w-full"
						aria-label="sign up"
						onClick={() => dispatch(setOpenSignUp(true))}
					>
						Sign Up
					</Button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
