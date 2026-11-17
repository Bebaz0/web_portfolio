import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from "react-i18next";
import "./Projects.css"
import HomelabStatus from "../HomelabStatus/HomelabStatus.jsx";

const PROJECTS = [
    {
        id: 'homelab',
        stack: ['Docker', 'Caddy', 'Tailscale', 'Cloudflare Tunnel', 'AdGuard Home', 'Python', 'Playwright'],
        links: [['github.com/Bebaz0/HomeLab', 'https://github.com/Bebaz0/HomeLab']],
    },
    {
        id: 'homelab-status',
        img: '/projects/homelab-status.svg',
        stack: ['Cloudflare Workers', 'D1', 'TypeScript', 'Python', 'Docker'],
        links: [
            ['github.com/Bebaz0/homelab-status', 'https://github.com/Bebaz0/homelab-status'],
            // In page link: label is an i18n key, target lives in another tab
            ['projects.seeLive', '#homelab-status', 'homelab'],
        ],
    },
    {
        id: 'habitwar',
        stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'RevenueCat'],
        links: [
            ['habitwar.app', 'https://habitwar.app'],
            ['App Store', 'https://apps.apple.com/pt/app/habitwars/id6760320345'],
            ['Google Play', 'https://play.google.com/store/apps/details?id=com.anonymous.habitwar'],
        ],
    },
    {
        id: 'portobox',
        stack: ['React', 'Supabase', 'Framer Motion', 'i18next'],
        links: [['portoboxcup.com', 'https://portoboxcup.com']],
    },
    {
        id: 'minix',
        stack: ['C', 'MINIX 3', 'Device drivers', 'VBE'],
        links: [['github.com/Bebaz0/minix-boxing', 'https://github.com/Bebaz0/minix-boxing']],
    },
];

const KEY_STEP = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
const imgOf = (p) => p.img ?? `/projects/${p.id}.webp`;

function Projects() {
    const { t } = useTranslation();
    const [active, setActive] = useState(0);
    const [zoomed, setZoomed] = useState(false);  // screenshot takes over the whole window
    const select = (i) => { setActive(i); setZoomed(false); };
    const tabsRef = useRef(null);

    // Arrow keys move through the list while it has focus; selection follows focus
    const onKeyDown = (e) => {
        const last = PROJECTS.length - 1;
        let next;
        if (e.key in KEY_STEP) next = (active + KEY_STEP[e.key] + PROJECTS.length) % PROJECTS.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        else return;
        e.preventDefault();
        select(next);
        tabsRef.current.children[next].focus();
    };

    // Open the tab that holds the target, then scroll to it once it is rendered
    const jumpTo = (e, href, tab) => {
        e.preventDefault();
        flushSync(() => select(PROJECTS.findIndex((p) => p.id === tab)));
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelector(href).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };

    return (
        <div className={"projects"}>
            <h2>{t('projects.title')}</h2>
            <div className={"projLayout"}>
                <div className={"projTabs"} role={"tablist"} aria-label={t('projects.title')} ref={tabsRef} onKeyDown={onKeyDown}>
                    {PROJECTS.map((p, i) => (
                        <button
                            key={p.id}
                            role={"tab"}
                            id={`proj-tab-${p.id}`}
                            aria-selected={i === active}
                            aria-controls={`proj-panel-${p.id}`}
                            tabIndex={i === active ? 0 : -1}
                            onClick={() => select(i)}
                        >
                            {t(`projects.list.${p.id}.title`)}
                        </button>
                    ))}
                </div>
                <div className={"projWindow"}>
                    <div className={"projBar"} aria-hidden={"true"}>
                        <span/><span/><span/>
                        <b>{zoomed ? imgOf(PROJECTS[active]).split('/').pop() : `${PROJECTS[active].id}.md`}</b>
                    </div>
                    {/* Only the open panel takes space, so the window fits it (HomeLab is much taller with the live status) */}
                    <div className={"projPanels"}>
                        {PROJECTS.map((p, i) => (
                            <div
                                key={p.id}
                                role={"tabpanel"}
                                id={`proj-panel-${p.id}`}
                                aria-labelledby={`proj-tab-${p.id}`}
                                className={i === active ? "projPanel is-active" : "projPanel"}
                                inert={zoomed}
                            >
                                <p className={"projPrompt"}>$ cat {p.id}.md</p>
                                <h3>{t(`projects.list.${p.id}.title`)}</h3>
                                <p>{t(`projects.list.${p.id}.description`)}</p>
                                <ul>
                                    {t(`projects.list.${p.id}.bullets`, { returnObjects: true }).map((b) => <li key={b}>{b}</li>)}
                                </ul>
                                <p className={"projStack"}>{p.stack.join(' · ')}</p>
                                <p className={"projLinks"}>
                                    {p.links.map(([label, href, tab]) => tab
                                        ? <a key={href} href={href} onClick={(e) => jumpTo(e, href, tab)}>{t(label)}</a>
                                        : <a key={href} href={href} target={"_blank"} rel={"noreferrer"}>{label}</a>
                                    )}
                                </p>
                                <div className={"projShot"}>
                                    <button className={"projZoom"} onClick={() => setZoomed(true)} aria-label={t('projects.zoom')}>
                                        <img
                                            src={imgOf(p)}
                                            alt={t(`projects.list.${p.id}.alt`)}
                                            width={1200}
                                            height={750}
                                            loading={"lazy"}
                                        />
                                    </button>
                                    {/* Scribbled notes pointing at the thumbnail; decorative, the button already has a label */}
                                    <div className={"projHints"} aria-hidden={"true"}>
                                        {[0, 1, 2].map((n) => (
                                            <span key={n}>
                                                <svg viewBox="0 0 60 30" width="56" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M57 7C41 2 22 9 5 21M5 21l10-2M5 21l4-9"/>
                                                </svg>
                                                {t('projects.zoomHint')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {p.id === 'homelab' && <HomelabStatus/>}
                            </div>
                        ))}
                        {zoomed && (
                            <button
                                className={"projZoomed"}
                                autoFocus
                                onClick={() => setZoomed(false)}
                                onKeyDown={(e) => e.key === 'Escape' && setZoomed(false)}
                                aria-label={t('projects.zoomClose')}
                            >
                                <img src={imgOf(PROJECTS[active])} alt={t(`projects.list.${PROJECTS[active].id}.alt`)}/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
