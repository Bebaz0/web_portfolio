import React from 'react';
import './TechStack.css';

function TechStack() {
    const icons = [
        "devicon-react-original",
        "devicon-css3-plain",
        "devicon-tailwindcss-original",
        "devicon-nodejs-plain-wordmark",
        "devicon-postgresql-plain",
        "devicon-cplusplus-plain"
    ];

    return (
        <div className="techStack-container">
            <div className="techStack-icons">
                {icons.map((iconClass, index) => (
                    <i
                        key={index}
                        className={iconClass}
                        style={{ '--i': index }}
                    ></i>
                ))}
            </div>
        </div>
    );
}

export default TechStack;