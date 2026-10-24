import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import "./Contributions.css"

const API = 'https://github-contributions-api.jogruber.de/v4/Bebaz0?y=last';

function Contributions() {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [tip, setTip] = useState(null);
    const cardRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        fetch(API)
            .then((res) => res.ok ? res.json() : null)
            .then(setData)
            .catch(() => {});  // no data, no card
    }, []);

    // Mobile: show the most recent weeks first
    useEffect(() => {
        if (gridRef.current) gridRef.current.scrollLeft = gridRef.current.scrollWidth;
    }, [data]);

    if (!data?.contributions?.length) return null;

    const days = data.contributions;
    // Pad so the first column starts on Sunday, like GitHub
    const offset = new Date(days[0].date).getUTCDay();
    const dateFmt = new Intl.DateTimeFormat(i18n.language, { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const total = new Intl.NumberFormat(i18n.language).format(data.total.lastYear);

    // One tooltip for the whole grid, positioned over the hovered (or tapped) cell
    const showTip = (e) => {
        const cell = e.target.closest('[data-date]');
        if (!cell) return setTip(null);
        const c = cell.getBoundingClientRect();
        const card = cardRef.current.getBoundingClientRect();
        const x = c.left + c.width / 2 - card.left;
        setTip({
            count: Number(cell.dataset.count),
            date: dateFmt.format(new Date(cell.dataset.date)),
            x,
            y: c.top - card.top,
            // Shift the tooltip left in proportion to x so it never leaves the card
            shift: (x / card.width) * 100,
        });
    };

    return (
        <div className={"contributions glass"} ref={cardRef}>
            <h3>{t('contributions.total', { count: total })}</h3>
            <div
                className={"contribGrid"}
                ref={gridRef}
                onPointerOver={showTip}
                onClick={showTip}
                onPointerLeave={() => setTip(null)}
                onScroll={() => setTip(null)}
            >
                {Array.from({ length: offset }, (_, i) => <span key={`pad${i}`} className={"pad"}/>)}
                {days.map((d) => (
                    <span key={d.date} data-level={d.level} data-count={d.count} data-date={d.date}/>
                ))}
            </div>
            <div className={"contribLegend"}>
                {t('contributions.less')}
                {[0, 1, 2, 3, 4].map((l) => <span key={l} data-level={l}/>)}
                {t('contributions.more')}
            </div>
            {tip && (
                <div className={"contribTip"} role={"tooltip"} style={{ left: tip.x, top: tip.y, '--shift': `${tip.shift}%` }}>
                    {t('contributions.day', { count: tip.count, date: tip.date })}
                </div>
            )}
        </div>
    );
}

export default Contributions;
