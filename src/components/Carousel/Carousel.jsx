import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import ProjectCard from "../ProjectCard/ProjectCard";

function PauseOnHover() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const projects = [
        {
            title: "E-Commerce Platform",
            imgsrc: "",
            description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features user authentication and secure payments.",
            link: "https://github.com/yourusername/project1"
        },
        {
            title: "Task Management App",
            imgsrc: "",
            description: "Collaborative task tool built with React and Firebase. Real-time updates and drag-and-drop interface.",
            link: "https://github.com/yourusername/project2"
        },
        {
            title: "Weather Dashboard",
            imgsrc: "",
            description: "Interactive weather app using OpenWeather API. Displays current conditions and 7-day forecasts.",
            link: "https://github.com/yourusername/project3"
        },
        {
            title: "Portfolio Website",
            imgsrc: "",
            description: "Modern portfolio showcasing projects and skills. Built with React featuring smooth animations.",
            link: "https://github.com/yourusername/project4"
        }
    ];

    return (
        <div className="slider-container">
            <h2 className="projects-title">My Projects</h2>
            <Slider {...settings}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        imgsrc={project.imgsrc}
                        description={project.description}
                        link={project.link}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default PauseOnHover;