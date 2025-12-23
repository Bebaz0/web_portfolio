import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";
import RouletteButton from "../RouletteButton/RouletteButton.jsx";

function PauseOnHover() {
    const { t } = useTranslation();
    const sliderRef = useRef(null);

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
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    arrows: false,
                },
            },
        ],
    };

    const projects = [
        {
            title: t("projects.list.PortoBox.title"),
            imgsrc: "/projects/portobox.png",
            description: t("projects.list.PortoBox.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/PortoBoxCup",
        },
        {
            title: t("projects.list.ReservationApp.title"),
            imgsrc: "/projects/restaurantapp.png",
            description: t("projects.list.ReservationApp.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/RestaurantReservationsApp",
        },
        {
            title: t("projects.list.Scrim.title"),
            imgsrc: "",
            description: t("projects.list.Scrim.description"),
            link: "https://github.com/Bebaz0/Scrim-Image-Editor",
        },
        {
            title: t("projects.list.Photography.title"),
            imgsrc: "/projects/photography.png",
            description: t("projects.list.Photography.description"),
            link: "https://github.com/Bebaz0/client-work-showcase/tree/main/MariaBragancaFotografia",
        },
        {
            title: t("projects.list.Portfolio.title"),
            imgsrc: "/projects/portfolio.png",
            description: t("projects.list.Portfolio.description"),
            link: "https://github.com/Bebaz0/web_portfolio",
        },
        {
            title: t("projects.list.Country.title"),
            imgsrc: "/projects/country.png",
            description: t("projects.list.Country.description"),
            link: "https://github.com/Bebaz0/country-info-with-themes",
        },
        {
            title: t("projects.list.Dean.title"),
            imgsrc: "/projects/dean.png",
            description: t("projects.list.Dean.description"),
            link: "https://deanrok.com/",
        },
    ];

    return (
        <div className="slider-container">
            <h2 className="projects-title">{t("projects.title")}</h2>
            <Slider ref={sliderRef} {...settings}>
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

            <RouletteButton
                sliderRef={sliderRef}
                projectCount={projects.length}
            />
        </div>
    );
}

export default PauseOnHover;