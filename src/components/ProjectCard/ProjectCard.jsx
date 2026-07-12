import React from 'react';
import './ProjectCard.css'

function ProjectCard({title, imgsrc, description, link, tags = [], interactive = true}) {

    const handleClick = () => {
        if (interactive) window.open(link, "_blank", "noopener");
    }

    return (
        <div onClick={handleClick} className={'card-wrapper glass'}>
            {imgsrc && <img alt={title} src={imgsrc} loading="lazy"/>}
            <h2>{title}</h2>
            <p className="project-description">
                {description}
            </p>
            {tags.length > 0 && (
                <div className="project-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectCard;
