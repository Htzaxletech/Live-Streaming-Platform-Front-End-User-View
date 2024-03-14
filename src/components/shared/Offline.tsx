import { HiOutlineStatusOffline } from "react-icons/hi";

const Offline = () => {
	return (
		<div className="bg-black text-gray-400 w-full h-full flex flex-col items-center justify-center gap-2">
			<HiOutlineStatusOffline className="text-xl" />
			<p className="uppercase tracking-wide">offline</p>
		</div>
	);
};

export default Offline;
