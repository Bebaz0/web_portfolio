import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import "./Spotlight.css";

const TECH = ["React Native", "Expo", "Supabase", "RevenueCat", "PostHog"];

function Spotlight() {
    const { t } = useTranslation();
    const videoRef = useRef(null);

    // preload="none" + play on visibility: the 8MB video only downloads when scrolled into view
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }, { threshold: 0.3 });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="spotlight glass">
            <div className="spotlight-phone">
                <video
                    ref={videoRef}
                    src="/projects/habitwar-flow.mp4"
                    poster="/projects/habitwar.png"
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="HabitWar app flow demo"
                />
            </div>
            <div className="spotlight-content">
                <span className="spotlight-label">{t("spotlight.label")}</span>
                <h2>{t("spotlight.title")}</h2>
                <p>{t("spotlight.description")}</p>
                <div className="spotlight-tags">
                    {TECH.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                    ))}
                </div>
                <a className="spotlight-cta" href="https://habitwar.app" target="_blank" rel="noopener noreferrer">
                    {t("spotlight.cta")}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10"/>
                        <path d="M7 17 17 7"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default Spotlight;
