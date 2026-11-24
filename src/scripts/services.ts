import { onScroll, reduceMotion } from './smooth';

/**
 * Services: on desktop the photograph frame is sticky, and the service whose row crosses
 * the middle of the screen becomes active; its photograph wipes in over the previous one.
 * Hovering or focusing a row also selects it. On small screens every row shows its own photo.
 */
export function initServices() {
	const root = document.querySelector<HTMLElement>('[data-services]');
	if (!root) return;

	const rows = [...root.querySelectorAll<HTMLElement>('[data-service]')];
	const shots = [...root.querySelectorAll<HTMLElement>('[data-service-shot]')];
	const counter = root.querySelector<HTMLElement>('[data-service-index]');
	const meter = root.querySelector<HTMLElement>('[data-service-meter]');
	let current = -1;

	const set = (i: number) => {
		if (i === current || i < 0) return;
		const prev = current;
		current = i;
		rows.forEach((r, j) => r.classList.toggle('is-active', j === i));
		shots.forEach((s, j) => {
			s.classList.toggle('is-active', j === i);
			s.classList.toggle('is-prev', j === prev);
			// Direction of the wipe follows the scroll direction
			s.dataset.dir = i > prev ? 'up' : 'down';
		});
		if (counter) counter.textContent = String(i + 1).padStart(2, '0');
		if (meter) meter.style.scale = `${(i + 1) / rows.length} 1`;
	};

	set(0);

	rows.forEach((row, i) => {
		row.addEventListener('pointerenter', () => set(i));
		row.addEventListener('focusin', () => set(i));
	});

	const desktop = window.matchMedia('(min-width: 961px)');
	onScroll(() => {
		if (!desktop.matches) return;
		const mid = window.innerHeight * 0.5;
		let best = current;
		for (let i = 0; i < rows.length; i++) {
			const r = rows[i].getBoundingClientRect();
			if (r.top <= mid && r.bottom > mid) {
				best = i;
				break;
			}
		}
		if (!root.matches(':hover') || reduceMotion) set(best);
	});
}
