import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation()

    const projects = [
        {
            title: t("projects.list.PortoBox.title"),
            imgsrc: "/projects/portobox.png",
            description: t("projects.list.PortoBox.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/PortoBoxCup"
        },
        {
            title: t("projects.list.ReservationApp.title"),
            imgsrc: "",
            description: t("projects.list.ReservationApp.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/RestaurantReservationsApp"
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
            <h2 className="projects-title">{t('projects.title')}</h2>
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