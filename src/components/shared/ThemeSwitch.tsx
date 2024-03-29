import { useContext } from "react";

import { ThemeContext } from "./ThemeProvider";
import { Switch } from "@components/ui/Switch";
import { IoMoonOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ThemeSwitch = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { t } = useTranslation();
	
	return (
		<div className="flex px-2 py-2 w-full justify-between">
			<div className="flex gap-2 items-center">
				<IoMoonOutline className="icon" />
				<label htmlFor="dark-theme-switch" className="cursor-pointer">
					{t("navbar.theme")}
				</label>
			</div>
			<Switch
				id="dark-theme-switch"
				onClick={toggleTheme}
				checked={theme === "dark"}
			/>
		</div>
	);
};

export default ThemeSwitch;
