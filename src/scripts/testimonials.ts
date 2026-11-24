import { reduceMotion } from './motion';

/**
 * Client quotes: one at a time, changed only by the arrows, the numbered tabs or the
 * arrow keys. The outgoing quote slides up and out while the next one rises in.
 */
export function initTestimonials() {
	const root = document.querySelector<HTMLElement>('[data-quotes]');
	if (!root) return;

	const slides = [...root.querySelectorAll<HTMLElement>('[data-quote]')];
	const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-quote-dot]')];
	const current = root.querySelector<HTMLElement>('[data-quote-current]');
	let index = 0;

	const go = (i: number) => {
		const next = (i + slides.length) % slides.length;
		if (next === index) return;
		const dir = i > index ? 1 : -1;
		slides.forEach((s, j) => {
			s.classList.remove('is-in', 'is-out');
			s.style.setProperty('--dir', String(dir));
			if (j === index && !reduceMotion) s.classList.add('is-out');
			if (j === next) s.classList.add('is-in');
			s.setAttribute('aria-hidden', String(j !== next));
		});
		dots.forEach((d, j) => d.setAttribute('aria-pressed', String(j === next)));
		index = next;
		if (current) current.textContent = String(index + 1).padStart(2, '0');
	};

	root.querySelector('[data-quote-prev]')?.addEventListener('click', () => go(index - 1));
	root.querySelector('[data-quote-next]')?.addEventListener('click', () => go(index + 1));
	dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
	root.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') go(index + 1);
		if (e.key === 'ArrowLeft') go(index - 1);
	});
}
