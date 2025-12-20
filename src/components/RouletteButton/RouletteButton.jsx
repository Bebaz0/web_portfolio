import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./RouletteButton.css";
import useSound from 'use-sound';
import select from "/sounds/select.mp3"


function RouletteButton({ sliderRef, projectCount }) {
    const { t } = useTranslation();
    const [isSpinning, setIsSpinning] = useState(false);
    const timerRef = useRef(null);
    const remainingStepsRef = useRef(0);

    const rouletteLabel = t("projects.roulette.button", { defaultValue: "Pick a random project" });
    const spinningLabel = t("projects.roulette.spinning", { defaultValue: "Spinning..." });

    const [playSelect] = useSound(select);

    const spinRoulette = () => {
        if (isSpinning || !sliderRef?.current || !projectCount) return;

        const total = projectCount;
        const extraLoops = 1; // how many turns
        const target = Math.floor(Math.random() * total);
        const totalSteps = extraLoops * total + target;
        const intervalMs = 1000;

        setIsSpinning(true);
        remainingStepsRef.current = totalSteps;

        timerRef.current = setInterval(() => {
            if (remainingStepsRef.current > 0) {
                sliderRef.current?.slickNext();
                playSelect();
                remainingStepsRef.current -= 1;
            } else {
                clearInterval(timerRef.current);
                setIsSpinning(false);
            }
        }, intervalMs);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <button
            className="roulette-button"
            onClick={spinRoulette}
            disabled={isSpinning}
            aria-live="polite"
        >
            {isSpinning ? spinningLabel : rouletteLabel}
        </button>
    );
}

export default RouletteButton;