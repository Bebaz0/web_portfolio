import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./RouletteButton.css"

function RouletteButton({ sliderRef, projectCount }) {
    const { t } = useTranslation();
    const [isSpinning, setIsSpinning] = useState(false);
    const timerRef = useRef(null);
    const remainingStepsRef = useRef(0);

    const rouletteLabel = t("projects.roulette.button", { defaultValue: "Pick a random project" });
    const spinningLabel = t("projects.roulette.spinning", { defaultValue: "Spinning..." });

    const spinRoulette = () => {
        if (isSpinning || !sliderRef?.current || !projectCount) return;

        const total = projectCount;
        const extraLoops = 2; // quantas voltas rápidas antes de parar
        const target = Math.floor(Math.random() * total);
        const totalSteps = extraLoops * total + target;
        const intervalMs = 300;

        setIsSpinning(true);
        remainingStepsRef.current = totalSteps;

        timerRef.current = setInterval(() => {
            if (remainingStepsRef.current > 0) {
                sliderRef.current?.slickNext();
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