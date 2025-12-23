import React, { useRef, useEffect, useState } from "react";
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

    // State to manage the slidesToShow dynamically
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        // Function to determine slidesToShow based on screen width
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 600) {
                // Small mobile screens
                setSlidesToShow(1);
            } else if (window.innerWidth <= 1024) {
                // Tablets
                setSlidesToShow(2);
            } else {
                // Desktops
                setSlidesToShow(3);
            }
        };

        // Run on initial load
        updateSlidesToShow();

        // Add a resize event listener to update dynamically
        window.addEventListener("resize", updateSlidesToShow);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: slidesToShow, // Dynamically set based on screen size
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true,
        arrows: slidesToShow > 1, // Hide arrows for one-slide layout
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

            <RouletteButton sliderRef={sliderRef} projectCount={projects.length} />
        </div>
    );
}

export default PauseOnHover;