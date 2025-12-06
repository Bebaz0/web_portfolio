import React from 'react';
import {useTranslation} from "react-i18next";

function AboutMe() {

    const t = useTranslation()

    return (
        <div>
            <h2>{t("about.title")}</h2>
            <p>{t("about.description")}</p>
        </div>
    );
}

export default AboutMe;