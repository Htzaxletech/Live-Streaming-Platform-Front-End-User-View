import Heading from "@components/ui/Heading";
// import gamingImg from "@assets/images/gaming.svg";
// import irlImg from "@assets/images/irl.svg";
// import musicImg from "@assets/images/music.svg";
// import esportsImg from "@assets/images/esports.svg";
import Tab from "@components/ui/Tab";
import BrowsePage from "./BrowsePage";
import DirectoryCategory from "@components/shared/DirectoryCategory";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DirectoryPage = () => {
	const { state } = useLocation();
	const { t } = useTranslation();
	
	return (
		<div className="container py-6 pb-20 px-4">
			<Heading className="my-4 text-5xl">{t("navbar.link2")}</Heading>

			<DirectoryCategory />

			<Tab
				active={state?.directory?.active}
				tabs={[
					{
						label: t("pages.categories"),
						content: <BrowsePage status="categories" />,
					},
					{
						label: t("pages.lc"),
						content: <BrowsePage status="live" />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default DirectoryPage;
