import { onScroll, reduceMotion } from './smooth';
import { HERO_READY_DELAY } from './motion';

/**
 * Hero: after the headline lands, the "on site now" card fills its progress bar and the
 * figures strip counts up. While scrolling away, the photo drifts down (parallax) and the
 * copy lifts and fades, so the next section slides over a scene that is already leaving.
 */
export function initHero() {
	const hero = document.querySelector<HTMLElement>('[data-hero]');
	if (!hero) return;

	const media = hero.querySelector<HTMLElement>('[data-hero-media]');
	const copy = hero.querySelector<HTMLElement>('[data-hero-copy]');

	const counters = [...hero.querySelectorAll<HTMLElement>('[data-hero-count]')];
	const pct = hero.querySelector<HTMLElement>('[data-live-pct]');
	const fmt = (n: number, d: number) =>
		n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

	if (!reduceMotion) {
		counters.forEach((el) => (el.textContent = fmt(0, Number(el.dataset.decimals))));
		if (pct) pct.textContent = '0';
	}

	const countUp = () => {
		if (reduceMotion) return;
		const targets = counters.map((el) => ({ el, to: Number(el.dataset.heroCount), d: Number(el.dataset.decimals) }));
		if (pct) targets.push({ el: pct, to: Number(pct.closest('.live')?.querySelector<HTMLElement>('.live__bar')?.style.getPropertyValue('--p') ?? 0) * 100, d: 0 });
		const t0 = performance.now();
		const duration = 1600;
		const tick = (now: number) => {
			const t = Math.min(1, (now - t0) / duration);
			const e = 1 - Math.pow(1 - t, 4);
			targets.forEach(({ el, to, d }) => (el.textContent = fmt(to * e, d)));
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	const start = () => {
		hero.classList.add('is-ready');
		countUp();
	};
	// Wait for the preloader to lift (if there is one), then let the headline land first.
	const begin = () => window.setTimeout(start, reduceMotion ? 0 : HERO_READY_DELAY);
	if (document.documentElement.classList.contains('is-loading')) {
		document.addEventListener('preloader:done', begin, { once: true });
	} else {
		begin();
	}

	if (reduceMotion) return;
	const desktop = window.matchMedia('(min-width: 901px)');

	onScroll((y) => {
		const h = hero.offsetHeight;
		if (y > h) return;
		const p = y / h;
		if (media) media.style.translate = desktop.matches ? `0 ${(y * 0.28).toFixed(1)}px` : '';
		if (copy) {
			copy.style.translate = `0 ${(-y * 0.12).toFixed(1)}px`;
			copy.style.opacity = String(Math.max(0, 1 - p * 1.6).toFixed(3));
		}
	});
}
