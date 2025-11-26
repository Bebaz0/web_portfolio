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
            <svg className="techStack-track" viewBox="0 0 300 300">
                <path d="M 150,35 L 250,93 L 250,208 L 150,265 L 50,208 L 50,93 Z" />
            </svg>

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