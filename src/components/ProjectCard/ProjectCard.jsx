import React from 'react';
import './ProjectCard.css'

function ProjectCard({title,imgsrc,description,link}) {
    return (
        <div className={'card-wrapper'}>
            <h2>{title}</h2>
            <img alt={"project-image"}/>
            <div className={"project-info"}>
                <p>
                    {description}
                </p>
                <a href={link} target={"_blank"}>See more</a>
            </div>
        </div>
    );
}

export default ProjectCard;