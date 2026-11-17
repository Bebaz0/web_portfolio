import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import "./HomelabStatus.css"

const API = 'https://status.afonsolima.dev/api/status';
const POLL_MS = 60_000;
const DAY_MS = 86_400_000;

// Colour step for the 30 day strip; the tooltip carries the exact number
const level = (a) => a == null ? 0 : a >= 0.99 ? 3 : a >= 0.9 ? 2 : 1;

function Meter({ label, percent, detail, fmt }) {
    return (
        <div className={"hsMeter"}>
            <span>{label}</span>
            <div
                className={"hsTrack"}
                role={"progressbar"}
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-valuetext={fmt.format(percent / 100)}
            >
                <i style={{ width: `${Math.min(100, percent)}%` }}/>
            </div>
            <span className={"hsValue"}>{fmt.format(percent / 100)}</span>
            {detail && <small>{detail}</small>}
        </div>
    );
}

// CPU and RAM over the last 24 h, drawn by hand. x is real time, so gaps in the data stay visible
function Chart({ hourly, end }) {
    const W = 300, H = 80;
    const start = Date.parse(end) - DAY_MS;
    const x = (h) => Math.min(W, Math.max(0, (Date.parse(h.hour) - start) / DAY_MS * W)).toFixed(1);
    const y = (v) => (H - v / 100 * H).toFixed(1);
    const series = [['cpu_percent', 'hsCpu'], ['memory_percent', 'hsRam']];

    return (
        <svg className={"hsChart"} viewBox={`0 -4 ${W} ${H + 8}`} aria-hidden={"true"}>
            {[0, H / 2, H].map((gy) => <line key={gy} x1={0} x2={W} y1={gy} y2={gy}/>)}
            {series.map(([key, cls]) => hourly.length > 1
                ? <polyline key={key} className={cls} points={hourly.map((h) => `${x(h)},${y(h[key])}`).join(' ')}/>
                : hourly.map((h) => <circle key={key + h.hour} className={cls} cx={x(h)} cy={y(h[key])} r={3}/>)
            )}
        </svg>
    );
}

function HomelabStatus() {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [fetchedAt, setFetchedAt] = useState(0);
    const [failed, setFailed] = useState(false);
    const [now, setNow] = useState(Date.now);
    const [tip, setTip] = useState(null);
    const rootRef = useRef(null);

    // Poll every minute, but only while the tab is visible
    useEffect(() => {
        let timer;
        const load = () => fetch(API)
            .then((res) => res.ok ? res.json() : Promise.reject(res.status))
            .then((d) => { setData(d); setFetchedAt(Date.now()); setFailed(false); })
            .catch(() => setFailed(true));
        const start = () => { load(); timer = setInterval(load, POLL_MS); };
        const stop = () => clearInterval(timer);
        const onVisibility = () => document.hidden ? stop() : start();
        if (!document.hidden) start();
        document.addEventListener('visibilitychange', onVisibility);
        return () => { stop(); document.removeEventListener('visibilitychange', onVisibility); };
    }, []);

    // Drives the "updated Xs ago" counter
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const lang = i18n.language;
    const pct = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 1 });
    const gb = new Intl.NumberFormat(lang, { style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 });
    const rel = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    const dayFmt = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const timeFmt = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit' });

    // Same single tooltip as the contributions card
    const showTip = (e) => {
        const cell = e.target.closest('[data-day]');
        if (!cell) return setTip(null);
        const c = cell.getBoundingClientRect();
        const root = rootRef.current.getBoundingClientRect();
        const x = c.left + c.width / 2 - root.left;
        const value = cell.dataset.value;
        setTip({
            text: `${dayFmt.format(new Date(cell.dataset.day))} · ${value ? pct.format(Number(value)) : t('homelabStatus.noData')}`,
            x,
            y: c.top - root.top,
            shift: (x / root.width) * 100,
        });
    };

    let body;
    if (!data && failed) {
        body = <p className={"hsNote"}>{t('homelabStatus.error')}</p>;
    } else if (!data) {
        body = (
            <div className={"hsCard hsLoading"} role={"status"} aria-label={t('homelabStatus.loading')}>
                {[40, 100, 100, 100, 70].map((w, i) => <span key={i} style={{ width: `${w}%` }}/>)}
            </div>
        );
    } else {
        const m = data.metrics;
        const a30 = data.availability['30d'];
        const daily = data.history.daily;
        const hourly = data.history.hourly;
        const last = hourly.at(-1);

        const ago = data.last_seen_seconds_ago == null ? null
            : data.last_seen_seconds_ago + Math.max(0, Math.round((now - fetchedAt) / 1000));
        const when = ago == null ? null
            : ago < 60 ? rel.format(-ago, 'second')
            : ago < 3600 ? rel.format(-Math.floor(ago / 60), 'minute')
            : rel.format(-Math.floor(ago / 3600), 'hour');
        const state = data.status === 'offline' && data.offline_since
            ? t('homelabStatus.offlineSince', { time: timeFmt.format(new Date(data.offline_since)) })
            : t(`homelabStatus.${data.status}`);
        const gbPair = (used, total) => `${gb.format(used / 1e9)} / ${gb.format(total / 1e9)}`;

        body = (
            <div className={"hsCard"}>
                <div className={"hsHead"}>
                    <p className={"hsState"} data-status={data.status}>
                        <span className={"hsDot"} aria-hidden={"true"}/>
                        <strong>{state}</strong>
                        {data.host && <span className={"hsMuted"}>{data.host}</span>}
                    </p>
                    {when && (
                        <p className={"hsMuted"}>
                            {t('homelabStatus.updated', { when })}
                            {failed && `. ${t('homelabStatus.stale')}`}
                        </p>
                    )}
                </div>

                <div className={"hsGrid"}>
                    <div className={"hsCol"}>
                        <dl className={"hsStats"}>
                            {m && (
                                <div>
                                    <dt>{t('homelabStatus.uptime')}</dt>
                                    <dd>{t('homelabStatus.uptimeValue', {
                                        d: Math.floor(m.uptime_seconds / 86400),
                                        h: Math.floor(m.uptime_seconds % 86400 / 3600),
                                    })}</dd>
                                </div>
                            )}
                            {m && (
                                <div>
                                    <dt>{t('homelabStatus.containers')}</dt>
                                    <dd>{m.containers.running}/{m.containers.total}</dd>
                                </div>
                            )}
                            <div>
                                <dt>{t('homelabStatus.availability')}</dt>
                                <dd>{a30 == null ? t('homelabStatus.noData') : pct.format(a30)}</dd>
                            </div>
                        </dl>
                        {m && (
                            <div className={"hsMeters"}>
                                <Meter label={"CPU"} percent={m.cpu_percent} fmt={pct}
                                       detail={m.cpu_cores && t('homelabStatus.cores', { count: m.cpu_cores })}/>
                                <Meter label={"RAM"} percent={m.memory.percent} fmt={pct}
                                       detail={gbPair(m.memory.used_bytes, m.memory.total_bytes)}/>
                                <Meter label={t('homelabStatus.disk')} percent={m.disk.percent} fmt={pct}
                                       detail={gbPair(m.disk.used_bytes, m.disk.total_bytes)}/>
                            </div>
                        )}
                    </div>

                    <div className={"hsCol"}>
                        {daily.length > 0 && (
                            <div>
                                <h4>{t('homelabStatus.strip')}</h4>
                                <div
                                    className={"hsStrip"}
                                    role={"img"}
                                    aria-label={t('homelabStatus.stripLabel', { value: a30 == null ? t('homelabStatus.noData') : pct.format(a30) })}
                                    onPointerOver={showTip}
                                    onClick={showTip}
                                    onPointerLeave={() => setTip(null)}
                                >
                                    {daily.map((d) => (
                                        <span key={d.day} data-level={level(d.availability)} data-day={d.day} data-value={d.availability ?? ''}/>
                                    ))}
                                </div>
                            </div>
                        )}
                        {last && (
                            <div
                                role={"img"}
                                aria-label={t('homelabStatus.chartLabel', {
                                    cpu: pct.format(last.cpu_percent / 100),
                                    ram: pct.format(last.memory_percent / 100),
                                })}
                            >
                                <h4>{t('homelabStatus.chart')}</h4>
                                <Chart hourly={hourly} end={data.generated_at}/>
                                <div className={"hsAxis"} aria-hidden={"true"}>
                                    <span>{t('homelabStatus.ago24')}</span>
                                    <span className={"hsLegend"}>
                                        <i className={"hsCpu"}/>CPU
                                        <i className={"hsRam"}/>RAM
                                    </span>
                                    <span>{t('homelabStatus.now')}</span>
                                </div>
                            </div>
                        )}
                        {data.services.length > 0 && (
                            <div>
                                <h4>{t('homelabStatus.services')}</h4>
                                <ul className={"hsServices"}>
                                    {data.services.map((s) => (
                                        <li key={s.name} data-status={s.status}>
                                            <span className={"hsDot"} aria-hidden={"true"}/>
                                            {s.url ? <a href={s.url} target={"_blank"} rel={"noreferrer"}>{s.name}</a> : s.name}
                                            <span className={"hsMuted"}>{t(`homelabStatus.${s.status}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className={"hs"} id={"homelab-status"} ref={rootRef} aria-label={t('homelabStatus.region')}>
            <p className={"projPrompt"}>$ curl status.afonsolima.dev/api/status</p>
            {body}
            {tip && (
                <div className={"contribTip"} role={"tooltip"} style={{ left: tip.x, top: tip.y, '--shift': `${tip.shift}%` }}>
                    {tip.text}
                </div>
            )}
        </section>
    );
}

export default HomelabStatus;
