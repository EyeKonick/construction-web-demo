import { onScroll } from './smooth';

/**
 * Process timeline: a yellow line fills the rail as you scroll through the stages, and
 * each stage marker lights up once the line has passed it. Reversible, scroll-linked.
 */
export function initProcess() {
	const root = document.querySelector<HTMLElement>('[data-timeline]');
	if (!root) return;

	const fill = root.querySelector<HTMLElement>('[data-timeline-fill]');
	const steps = [...root.querySelectorAll<HTMLElement>('[data-stage]')];
	const readout = document.querySelector<HTMLElement>('[data-timeline-readout]');

	onScroll(() => {
		const r = root.getBoundingClientRect();
		const line = window.innerHeight * 0.55;
		const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
		if (fill) fill.style.scale = `1 ${p.toFixed(4)}`;

		let active = 0;
		steps.forEach((s, i) => {
			const sr = s.getBoundingClientRect();
			const passed = sr.top + 24 < line;
			s.classList.toggle('is-passed', passed);
			if (passed) active = i + 1;
		});
		if (readout) readout.textContent = `${String(Math.max(1, active)).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
	});
}
