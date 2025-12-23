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

    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Force slick slider to reinitialize after the page loads
        const onResize = () => setReady(false); // First reset state
        const onLoad = () => setReady(true);   // Then trigger a re-render

        window.addEventListener("resize", onResize);
        window.addEventListener("load", onLoad);

        // Cleanup event listeners
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("load", onLoad);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true,
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

    // Render slider only after everything is ready
    return (
        ready && (
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
        )
    );
}

export default PauseOnHover;