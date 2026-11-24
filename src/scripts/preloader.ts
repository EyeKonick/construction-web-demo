import { reduceMotion } from './motion';
import { lockScroll, unlockScroll } from './smooth';

/**
 * Short intro: a counter runs to 100 over ~1s (or until the hero photo has loaded, if
 * later, capped at 2.4s), then the panel lifts away. Shown once per browser session.
 */
export function initPreloader() {
	const root = document.documentElement;
	const el = document.querySelector<HTMLElement>('[data-preloader]');
	const done = () => {
		root.classList.remove('is-loading');
		document.dispatchEvent(new Event('preloader:done'));
	};

	if (!el || !root.classList.contains('is-loading')) {
		el?.remove();
		return done();
	}

	const count = el.querySelector<HTMLElement>('[data-preloader-count]');
	const bar = el.querySelector<HTMLElement>('[data-preloader-bar]');
	const heroImg = document.querySelector<HTMLImageElement>('[data-hero] img');

	if (reduceMotion) {
		el.remove();
		return done();
	}

	lockScroll();
	const minTime = 1000;
	const maxTime = 2400;
	const t0 = performance.now();
	let imgReady = !heroImg || heroImg.complete;
	heroImg?.addEventListener('load', () => (imgReady = true), { once: true });

	const tick = (now: number) => {
		const elapsed = now - t0;
		// Run to 90 on time; the last 10 wait for the hero photo (or the cap).
		const timeP = Math.min(1, elapsed / minTime);
		const target = imgReady || elapsed > maxTime ? timeP : Math.min(timeP, 0.9);
		const eased = 1 - Math.pow(1 - target, 3);
		const value = Math.round(eased * 100);
		if (count) count.textContent = String(value).padStart(3, '0');
		if (bar) bar.style.scale = `${eased} 1`;

		if (value >= 100) {
			el.classList.add('is-done');
			try {
				sessionStorage.setItem('haligi-intro', '1');
			} catch {
				/* storage blocked: the intro simply plays again next time */
			}
			window.setTimeout(() => {
				unlockScroll();
				done();
			}, 280);
			el.addEventListener('transitionend', () => el.remove(), { once: true });
			window.setTimeout(() => el.remove(), 1600);
			return;
		}
		requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
}
