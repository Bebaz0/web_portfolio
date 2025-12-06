import React from 'react';
import './ProjectCard.css'

function ProjectCard({title,imgsrc,description,link}) {

    const handleClick = () =>{
        window.open(link, "_blank");
    }

    return (
        <div onClick={handleClick} className={'card-wrapper'}>
            <img alt={"project-image"}/>
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