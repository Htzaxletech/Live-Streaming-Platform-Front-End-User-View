// import HomeCarousel from "@components/shared/HomeCarousel";
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";
import { endpoints as ep } from "@services/endpoints";
import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { socket } from "@socket/index";
import { generateStreamUrl } from "@utils/helpers";

const HomeCarousel = lazy(() => import("@components/shared/HomeCarousel"));

const HomePage = () => {
	const { t } = useTranslation();

	const handleDonate = () => {
		console.log("handleDonate");

		console.log(
			"generateStreamUrl",
			generateStreamUrl("4414661d-6cce-434f-812e-474ca947")
		);

		return;
		
		const reqData = {
			streamKey: "4414661d-6cce-434f-812e-474ca947",
			item_variantID: "",
			bits: 250,
			variantID: 2,
		};

		socket.emit("follow", reqData, onSocketFollow);

		// const array = [100, 50, 89, 200, 221, 124, 304, 94];
		// const bit = 220;

		// const filteredArray = array.filter((value) => value < bit);
		// filteredArray.sort((a, b) => b - a);

		// const result = filteredArray[0];
		// console.log("Value closest to less than 90:", result);
	};

	const onSocketFollow = () => {
		console.log("onSocketFollow");
	};

	return (
		<div className="container mx-auto py-10 pb-16 px-4">
			<button onClick={handleDonate} className="bg-danger p-3 text-white">Donate</button>;
			
			<div className="hidden md:block">
				<HomeCarousel />
			</div>
			<LivePage url={ep.homeLive} title={t("pages.lc")} />
			<CategoryCardList url={ep.homeCategory} />
		</div>
	);
};

export default HomePage;
