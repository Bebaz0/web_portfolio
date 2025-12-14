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
            imgsrc: "/projects/restaurantapp.png",
            description: t("projects.list.ReservationApp.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/RestaurantReservationsApp"
        },
        {
            title: t("projects.list.Photography.title"),
            imgsrc: "/projects/photography.png",
            description: t("projects.list.Photography.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/MariaBragancaFotografia"
        },
        {
            title: t("projects.list.Portfolio.title"),
            imgsrc: "/projects/portfolio.png",
            description: t("projects.list.Portfolio.description"),
            link: "https://github.com/Bebaz0/web_portfolio"
        },
        {
            title: t("projects.list.Scrim.title"),
            imgsrc: "",
            description: t("projects.list.Scrim.description"),
            link: "https://github.com/Bebaz0/Scrim-Image-Editor"
        },
        {
            title: t("projects.list.Country.title"),
            imgsrc: "/projects/country.png",
            description: t("projects.list.Country.description"),
            link: "https://github.com/Bebaz0/country-info-with-themes"
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