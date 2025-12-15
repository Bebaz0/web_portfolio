import React from 'react';
import './ProjectCard.css'
import {useTranslation} from "react-i18next";

function ProjectCard({title,imgsrc,description,link}) {

    const {t} = useTranslation()

    const handleClick = () =>{
        window.open(link, "_blank");
    }

    return (
        <div onClick={handleClick} className={'card-wrapper'}>
            {imgsrc === ""? <span></span>
                : <img alt={"project-image"} src={imgsrc}/>
            }
            <h2>{title}</h2>
            <div className={"project-info"}>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default ProjectCard;