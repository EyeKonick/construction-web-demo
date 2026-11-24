import { DURATION, SPRING, finePointer, reduceMotion } from './motion';
import { onScroll } from './smooth';

/**
 * Scroll reveals. Elements with [data-reveal] get `.is-in` once, the first time they
 * enter the viewport; CSS keyframes do the rest (see "Motion system" in global.css).
 *
 * [data-reveal-scope] marks a container whose reveals fire together when the container
 * itself becomes visible (the fixed curtain footer needs this).
 */
export function initReveals() {
	const scopes = [...document.querySelectorAll<HTMLElement>('[data-reveal-scope]')];
	const inScope = (el: Element) => scopes.some((s) => s.contains(el));
	const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => !inScope(el));

	if (reduceMotion || !('IntersectionObserver' in window)) {
		document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
	);
	items.forEach((el) => io.observe(el));

	const scopeIo = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
				scopeIo.unobserve(entry.target);
			}
		},
		{ threshold: 0.3 },
	);
	scopes.forEach((s) => scopeIo.observe(s));
}

/** Format a figure with a fixed number of decimals and thousands separators. */
const fmt = (n: number, decimals: number) =>
	n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Figures marked [data-count] count up once when they come into view. */
export function initCounters() {
	const counters = document.querySelectorAll<HTMLElement>('[data-count]');
	if (!counters.length) return;

	const run = (el: HTMLElement) => {
		const target = Number(el.dataset.count);
		const decimals = Number(el.dataset.decimals ?? 0);
		const duration = DURATION.hero + 700;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 4);
			el.textContent = fmt(target * eased, decimals);
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	if (reduceMotion) return;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				io.unobserve(entry.target);
				run(entry.target as HTMLElement);
			}
		},
		{ threshold: 0.6 },
	);

	counters.forEach((el) => {
		el.textContent = fmt(0, Number(el.dataset.decimals ?? 0));
		io.observe(el);
	});
}

/**
 * The company statement: its words fill in as the paragraph scrolls through the
 * middle of the screen, and empty again if you scroll back up.
 */
export function initScrubText() {
	const blocks = document.querySelectorAll<HTMLElement>('[data-scrub]');
	if (!blocks.length || reduceMotion) return;

	blocks.forEach((block) => {
		const words = [...block.querySelectorAll<HTMLElement>('.wd')];
		block.classList.add('is-scrubbing');
		let last = -1;
		onScroll(() => {
			const r = block.getBoundingClientRect();
			const vh = window.innerHeight;
			// 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 45%
			const start = vh * 0.85;
			const end = vh * 0.45;
			const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
			const lit = Math.round(p * words.length);
			if (lit === last) return;
			last = lit;
			words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
		});
	});
}

/**
 * Photographs marked [data-parallax] drift slowly inside their frame while the frame
 * is on screen (desktop only). The image is oversized in CSS so no edge ever shows.
 */
export function initParallax() {
	if (reduceMotion) return;
	const items = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
	if (!items.length) return;
	const desktop = window.matchMedia('(min-width: 901px)');

	onScroll(() => {
		const vh = window.innerHeight;
		for (const el of items) {
			if (!desktop.matches) {
				el.style.translate = '';
				continue;
			}
			const frame = el.parentElement!.getBoundingClientRect();
			if (frame.bottom < -100 || frame.top > vh + 100) continue;
			const strength = Number(el.dataset.parallax || 0.12);
			// -1 when the frame is below the screen, 1 when above it
			const progress = (vh / 2 - (frame.top + frame.height / 2)) / (vh / 2 + frame.height / 2);
			// The image is 18% taller than its frame, so the drift stays within ±9% of the frame
			const shift = Math.max(-0.09, Math.min(0.09, progress * strength * 0.5));
			el.style.translate = `0 ${(shift * frame.height).toFixed(1)}px`;
		}
	});
}

/**
 * Buttons marked [data-magnetic] lean slightly towards the pointer (hover only),
 * using the "standard" spring. Runs a rAF loop only while moving.
 */
export function initMagnetic() {
	if (reduceMotion || !finePointer) return;
	document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
		let tx = 0;
		let ty = 0;
		let x = 0;
		let y = 0;
		let raf = 0;
		const loop = () => {
			x += (tx - x) * SPRING.standard;
			y += (ty - y) * SPRING.standard;
			el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
			raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(loop) : 0;
			if (!raf && tx === 0 && ty === 0) el.style.translate = '';
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(loop);
		};
		el.addEventListener('pointermove', (e) => {
			const r = el.getBoundingClientRect();
			tx = (e.clientX - (r.left + r.width / 2)) * 0.2;
			ty = (e.clientY - (r.top + r.height / 2)) * 0.3;
			kick();
		});
		el.addEventListener('pointerleave', () => {
			tx = 0;
			ty = 0;
			kick();
		});
	});
}
