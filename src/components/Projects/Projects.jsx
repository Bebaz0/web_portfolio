import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from "react-i18next";
import "./Projects.css"
import HomelabStatus from "../HomelabStatus/HomelabStatus.jsx";

const PROJECTS = [
    {
        id: 'homelab',
        stack: ['Docker', 'Caddy', 'Tailscale', 'Cloudflare Tunnel', 'AdGuard Home', 'Python'],
        links: [['GitHub', 'https://github.com/Bebaz0/HomeLab']],
    },
    {
        id: 'homelab-status',
        img: '/projects/homelab-status.svg',
        stack: ['Cloudflare Workers', 'D1', 'TypeScript', 'Python', 'Docker'],
        links: [
            ['GitHub', 'https://github.com/Bebaz0/homelab-status'],
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
        links: [['GitHub', 'https://github.com/Bebaz0/minix-boxing']],
    },
];

const KEY_STEP = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
const GRIPS = ['w', 'e', 's', 'sw', 'se'];
const MIN_W = 360;
const MIN_H = 240;
const imgOf = (p) => p.img ?? `/projects/${p.id}.webp`;

function Projects() {
    const { t } = useTranslation();
    const [active, setActive] = useState(0);
    const [size, setSize] = useState({});  // dragged window size; empty means fit the content
    // Each project has its own height, so a dragged one does not carry over. Width does
    const select = (i) => { setActive(i); setSize((s) => ({ w: s.w })); };
    const tabsRef = useRef(null);
    const winRef = useRef(null);

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

    // Drag an edge or corner. The window stays centred, so its width is twice the distance to the pointer
    const onGripDown = (e) => {
        e.preventDefault();  // no text selection while dragging
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onGripMove = (e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        const dir = e.currentTarget.dataset.dir;
        const r = winRef.current.getBoundingClientRect();
        const maxW = winRef.current.parentElement.clientWidth;
        const w = Math.min(maxW, Math.max(MIN_W, 2 * Math.abs(e.clientX - (r.left + r.width / 2))));
        const h = Math.max(MIN_H, e.clientY - r.top);
        setSize((s) => ({ w: dir === 's' ? s.w : w, h: dir.includes('s') ? h : s.h }));
    };

    return (
        <div className={"projects"}>
            <h2>{t('projects.title')}</h2>
            <div className={"projLayout"}>
                {/* The size goes in as custom properties so the phone frame on mobile can ignore it */}
                <div
                    className={"projWindow"}
                    ref={winRef}
                    style={{ '--w': size.w && `${size.w}px`, '--h': size.h && `${size.h}px` }}
                >
                    {/* Desktop: a tab bar inside the window, under the title bar. Mobile: a row above the phone */}
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
                    {/* The phone on mobile; no box of its own on desktop */}
                    <div className={"projFrame"}>
                        {/* Double click puts the window back to its own size */}
                        <div className={"projBar"} aria-hidden={"true"} onDoubleClick={() => setSize({})}>
                            <span/><span/><span/>
                            <b>{PROJECTS[active].id}.md</b>
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
                                >
                                    <h3>{t(`projects.list.${p.id}.title`)}</h3>
                                    <img
                                        className={"projShot"}
                                        src={imgOf(p)}
                                        alt={t(`projects.list.${p.id}.alt`)}
                                        width={1200}
                                        height={750}
                                        loading={"lazy"}
                                    />
                                    <p className={"projDesc"}>{t(`projects.list.${p.id}.description`)}</p>
                                    {p.id === 'homelab' && <HomelabStatus/>}
                                    <p className={"projStack"}>{p.stack.join(' · ')}</p>
                                    <p className={"projLinks"}>
                                        {p.links.map(([label, href, tab]) => tab
                                            ? <a key={href} href={href} onClick={(e) => jumpTo(e, href, tab)}>{t(label)}</a>
                                            : <a key={href} href={href} target={"_blank"} rel={"noreferrer"}>{label}</a>
                                        )}
                                    </p>
                                </div>
                            ))}
                    </div>
                    </div>
                    {GRIPS.map((dir) => (
                        <span
                            key={dir}
                            className={"projGrip"}
                            data-dir={dir}
                            aria-hidden={"true"}
                            onPointerDown={onGripDown}
                            onPointerMove={onGripMove}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;
