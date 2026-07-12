import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";
import RouletteButton from "../RouletteButton/RouletteButton.jsx";

const PROJECTS = [
    { key: "HabitWar", imgsrc: "/projects/habitwar.png", link: "https://habitwar.app", tags: ["React Native", "Expo", "Supabase"] },
    { key: "PortoBox", imgsrc: "/projects/portobox.png", link: "https://portoboxcup.com", tags: ["React", "Supabase"] },
    { key: "Dean", imgsrc: "/projects/dean.png", link: "https://deanrok.com", tags: ["React", "Motion", "Tailwind"] },
    { key: "ReservationApp", imgsrc: "/projects/restaurantapp.png", link: "https://github.com/Bebaz0/client-work-showcase/tree/main/RestaurantReservationsApp", tags: ["React", "Supabase", "PWA"] },
    { key: "Photography", imgsrc: "/projects/photography.png", link: "https://mariabragancafotografia.pt/", tags: ["HTML", "CSS", "SEO"] },
    { key: "mm", imgsrc: "/projects/mmwatches.png", link: "https://mm-watches.netlify.app/", tags: ["React", "E-commerce"] },
];

const COUNT = PROJECTS.length;

function Carousel() {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const dragStartX = useRef(null);
    const dragged = useRef(false);

    const goTo = useCallback((i) => setIndex(((i % COUNT) + COUNT) % COUNT), []);
    const next = useCallback(() => setIndex((i) => (i + 1) % COUNT), []);
    const prev = useCallback(() => setIndex((i) => (i - 1 + COUNT) % COUNT), []);

    useEffect(() => {
        if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(next, 4500);
        return () => clearInterval(id);
    }, [paused, next]);

    // Signed circular distance from the active card, in (-COUNT/2, COUNT/2]
    const offsetOf = (i) => {
        let d = (i - index + COUNT) % COUNT;
        if (d > COUNT / 2) d -= COUNT;
        return d;
    };

    const onPointerDown = (e) => {
        dragStartX.current = e.clientX;
        dragged.current = false;
        setPaused(true);
    };
    const onPointerMove = (e) => {
        if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 8) {
            dragged.current = true;
        }
    };
    const onPointerUp = (e) => {
        if (dragStartX.current === null) return;
        const dx = e.clientX - dragStartX.current;
        dragStartX.current = null;
        if (dx > 40) prev();
        else if (dx < -40) next();
    };
    const onClickCapture = (e) => {
        if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };

    return (
        <div className="coverflow-container">
            <h2 className="projects-title">{t("projects.title")}</h2>

            <div
                className="coverflow-stage"
                role="region"
                aria-roledescription="carousel"
                aria-label={t("projects.title")}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onClickCapture={onClickCapture}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {PROJECTS.map((project, i) => {
                    const off = offsetOf(i);
                    const abs = Math.abs(off);
                    return (
                        <div
                            key={project.key}
                            className={`coverflow-item${off === 0 ? " is-active" : ""}${abs > 2 ? " is-hidden" : ""}${abs === 2 ? " is-far" : ""}`}
                            style={{ "--off": off, "--abs": abs }}
                            aria-hidden={off !== 0}
                            onClick={off !== 0 ? () => goTo(i) : undefined}
                        >
                            <ProjectCard
                                title={t(`projects.list.${project.key}.title`)}
                                imgsrc={project.imgsrc}
                                description={t(`projects.list.${project.key}.description`)}
                                link={project.link}
                                tags={project.tags}
                                interactive={off === 0}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="coverflow-controls">
                <button className="coverflow-arrow glass" onClick={prev} aria-label={t("projects.prev")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                </button>
                <div className="coverflow-dots">
                    {PROJECTS.map((project, i) => (
                        <button
                            key={project.key}
                            className={`coverflow-dot${i === index ? " is-active" : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`${t("projects.goToSlide")} ${i + 1}`}
                            aria-current={i === index}
                        />
                    ))}
                </div>
                <button className="coverflow-arrow glass" onClick={next} aria-label={t("projects.next")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            </div>

            <RouletteButton onStep={next} projectCount={COUNT} />
        </div>
    );
}

export default Carousel;
