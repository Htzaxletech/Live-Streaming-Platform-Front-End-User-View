import { useState } from "react";
import { useTranslation } from "react-i18next";
import { lngs } from "@utils/i18n";
import { Dropdown } from "@components/ui/Dropdown";

interface LanguageSwitchProps {
	openLanguage?: boolean;
	setOpenLanguage?: (open: boolean) => void;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = () => {
	const { i18n } = useTranslation();

	const [currentLng, setCurrentLng] = useState(i18n.resolvedLanguage);

	const handleChangeLng = (lng: string) => {
		setCurrentLng(lng);
		i18n.changeLanguage(lng);
	};

	const handleOnSelect = (e: Event, lng: string) => {
		e.preventDefault();
		handleChangeLng(lng);
	}

	return (
		<div>
			{Object.keys(lngs).map((lng) => (
				<Dropdown.Item
					key={lng}
					onSelect={(e) => handleOnSelect(e, lng)}
					className={`${
						currentLng === lng
							? "bg-primary text-white hover:bg-primary"
							: ""
					} p-3 cursor-pointer`}
				>
					{lngs[lng].nativeName}
				</Dropdown.Item>
			))}
		</div>
	);
};

export default LanguageSwitch;
