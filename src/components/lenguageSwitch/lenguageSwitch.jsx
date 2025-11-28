import { useTranslation } from "react-i18next";
import "./lenguageSwitch.css";

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
    };

    return (
        <button className="language-toggle" onClick={toggle}>
            {i18n.language === "pt" ? "EN" : "PT"}
        </button>
    );
}