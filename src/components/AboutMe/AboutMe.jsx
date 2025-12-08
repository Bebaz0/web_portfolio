import React from 'react';
import {useTranslation} from "react-i18next";
import "./AboutMe.css"

function AboutMe() {

    const {t} = useTranslation()  // Destructure to get the 't' function

    return (
        <div className={"aboutContent"}>
            <h2>{t("about.title")}</h2>
            <p>{t("about.description")}</p>
        </div>
    );
}

export default AboutMe;