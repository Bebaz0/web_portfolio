import { useTranslation } from "react-i18next";
import "./languageSwitch.css";

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const isPt = i18n.language === "pt";

    const toggle = () => {
        i18n.changeLanguage(isPt ? "en" : "pt");
    };

    return (
        <button
            className="language-toggle glass"
            onClick={toggle}
            aria-label={isPt ? "Mudar para inglês" : "Switch to Portuguese"}
        >
            {isPt ? "PT" : "EN"}
        </button>
    );
}