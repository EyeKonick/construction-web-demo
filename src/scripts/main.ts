import { initAnchors, onScroll, scrollToTarget } from './smooth';
import { initPreloader } from './preloader';
import { initHeader, initMobileMenu } from './header';
import { initHero } from './hero';
import { initCounters, initMagnetic, initParallax, initReveals, initScrubText } from './reveal';
import { initServices } from './services';
import { initProjects } from './projects';
import { initProcess } from './process';
import { initTestimonials } from './testimonials';
import { initContactForm } from './contact';

// Tell the fail-safe in Layout.astro that the motion system is running.
document.documentElement.classList.add('motion-ready');

// Button labels: wrap the text so CSS can roll a copy of it up on hover.
document.querySelectorAll<HTMLElement>('.btn__label').forEach((label) => {
	const text = label.textContent?.trim() ?? '';
	const inner = document.createElement('span');
	inner.dataset.text = text;
	inner.textContent = text;
	label.replaceChildren(inner);
});

initAnchors();
initHeader();
initMobileMenu();
initHero();
initPreloader();
initReveals();
initCounters();
initScrubText();
initParallax();
initMagnetic();
initServices();
initProjects();
initProcess();
initTestimonials();
initContactForm();
initBackToTop();
initTapes();

function initBackToTop() {
	const btn = document.querySelector<HTMLButtonElement>('[data-to-top]');
	if (!btn) return;

	const footer = document.querySelector('[data-reveal-scope]');
	onScroll((y) => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		btn.classList.toggle('is-visible', y > window.innerHeight * 0.9);
		if (footer) document.documentElement.classList.toggle('footer-in-view', footer.getBoundingClientRect().top < window.innerHeight * 0.85);
		btn.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
	});

	btn.addEventListener('click', () => {
		scrollToTarget(0);
		history.replaceState(null, '', location.pathname);
		document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
	});
}

/** Caution-tape marquees: a pause button for each, as anything moving past 5s needs one. */
function initTapes() {
	document.querySelectorAll<HTMLElement>('[data-tape]').forEach((tape) => {
		const btn = tape.querySelector<HTMLButtonElement>('[data-tape-toggle]');
		btn?.addEventListener('click', () => {
			const paused = tape.classList.toggle('is-paused');
			btn.setAttribute('aria-pressed', String(paused));
			btn.setAttribute('aria-label', paused ? 'Play the moving banner' : 'Pause the moving banner');
		});
	});
}
