import { finePointer, lockScroll, reduceMotion, scrollToTarget, unlockScroll } from './smooth';
import { DURATION, SPRING } from './motion';

export function initProjects() {
	initFilters();
	if (finePointer) initCursorBadge();
	initProjectDialog();
}

/* ---------- Sector filters, with a FLIP animation so cards glide to their new places ---------- */

function initFilters() {
	const root = document.querySelector<HTMLElement>('[data-projects]');
	if (!root) return;
	const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
	const cards = [...root.querySelectorAll<HTMLElement>('[data-sector]')];
	const count = root.querySelector<HTMLElement>('[data-project-count]');
	const indicator = root.querySelector<HTMLElement>('[data-filter-indicator]');

	const moveIndicator = (btn: HTMLElement) => {
		if (!indicator) return;
		indicator.style.width = `${btn.offsetWidth}px`;
		indicator.style.translate = `${btn.offsetLeft}px 0`;
	};
	const pressed = () => buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0];
	moveIndicator(pressed());
	window.addEventListener('resize', () => moveIndicator(pressed()));
	document.fonts?.ready.then(() => moveIndicator(pressed()));

	buttons.forEach((btn) =>
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter!;
			buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
			moveIndicator(btn);

			// FLIP: record positions, apply the filter, then animate from old to new.
			const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
			let visible = 0;
			cards.forEach((card) => {
				const show = filter === 'All' || card.dataset.sector === filter;
				card.hidden = !show;
				card.classList.remove('is-entering');
				if (show) visible++;
			});
			if (count) count.textContent = String(visible).padStart(2, '0');
			if (reduceMotion) return;

			cards.forEach((card) => {
				if (card.hidden) return;
				const was = first.get(card)!;
				const now = card.getBoundingClientRect();
				if (was.width === 0) {
					// Was hidden: rise in
					void card.offsetWidth;
					card.classList.add('is-entering');
					return;
				}
				const dx = was.left - now.left;
				const dy = was.top - now.top;
				if (!dx && !dy) return;
				card.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }], {
					duration: DURATION.section + 150,
					easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				});
			});
		}),
	);
}

/* ---------- "View" badge that follows the cursor over project cards ---------- */

function initCursorBadge() {
	const badge = document.querySelector<HTMLElement>('[data-cursor-badge]');
	if (!badge) return;
	let x = 0;
	let y = 0;
	let cx = 0;
	let cy = 0;
	let raf = 0;

	const loop = () => {
		cx += (x - cx) * SPRING.expressive;
		cy += (y - cy) * SPRING.expressive;
		badge.style.translate = `${cx}px ${cy}px`;
		raf = requestAnimationFrame(loop);
	};

	document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
		el.addEventListener('pointerenter', (e) => {
			x = cx = e.clientX;
			y = cy = e.clientY;
			badge.textContent = el.dataset.cursor || 'View';
			badge.classList.add('is-visible');
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(loop);
		});
		el.addEventListener('pointermove', (e) => {
			x = e.clientX;
			y = e.clientY;
		});
		el.addEventListener('pointerleave', () => {
			badge.classList.remove('is-visible');
			window.setTimeout(() => {
				if (!badge.classList.contains('is-visible')) cancelAnimationFrame(raf);
			}, DURATION.standard);
		});
	});
}

/* ---------- Project detail dialog with deep links (#p-slug) ---------- */

function initProjectDialog() {
	const dialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
	if (!dialog) return;
	dialog.setAttribute('data-lenis-prevent', '');

	const articles = [...dialog.querySelectorAll<HTMLElement>('[data-project]')];
	const slugs = articles.map((a) => a.dataset.project!);
	const count = dialog.querySelector<HTMLElement>('[data-dialog-count]');
	let current = -1;
	let opener: HTMLElement | null = null;
	let closing = false;

	const show = (i: number) => {
		current = (i + slugs.length) % slugs.length;
		articles.forEach((a, j) => (a.hidden = j !== current));
		const title = articles[current].getAttribute('aria-label') ?? '';
		dialog.setAttribute('aria-label', title);
		if (count) count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slugs.length).padStart(2, '0')}`;
		dialog.scrollTop = 0;
		history.replaceState(null, '', `#p-${slugs[current]}`);
	};

	const open = (slug: string, trigger?: HTMLElement | null) => {
		const i = slugs.indexOf(slug);
		if (i < 0) return;
		opener = trigger ?? null;
		show(i);
		if (!dialog.open) {
			dialog.showModal();
			lockScroll();
		}
		dialog.querySelector<HTMLElement>('[data-dialog-close]')?.focus();
	};

	const close = (after?: () => void) => {
		if (!dialog.open || closing) return;
		closing = true;
		const finish = () => {
			dialog.classList.remove('is-closing');
			dialog.close();
			closing = false;
			unlockScroll();
			history.replaceState(null, '', location.pathname);
			if (after) after();
			else opener?.focus({ preventScroll: true });
		};
		if (reduceMotion) return finish();
		dialog.classList.add('is-closing');
		window.setTimeout(finish, DURATION.section);
	};

	document.addEventListener('click', (e) => {
		const trigger = (e.target as Element).closest<HTMLElement>('[data-open-project]');
		if (!trigger) return;
		e.preventDefault();
		open(trigger.dataset.openProject!, trigger);
	});

	dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => close());
	dialog.querySelector('[data-dialog-prev]')?.addEventListener('click', () => show(current - 1));
	dialog.querySelector('[data-dialog-next]')?.addEventListener('click', () => show(current + 1));

	dialog.addEventListener('cancel', (e) => {
		e.preventDefault();
		close();
	});

	dialog.addEventListener('keydown', (e) => {
		const tag = (e.target as HTMLElement).tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA') return;
		if (e.key === 'ArrowRight') show(current + 1);
		if (e.key === 'ArrowLeft') show(current - 1);
	});

	// "Get a quote for a similar build": close, scroll to the form and pre-fill the message.
	dialog.querySelectorAll<HTMLAnchorElement>('[data-dialog-contact]').forEach((link) =>
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const title = articles[current].getAttribute('aria-label');
			close(() => {
				const message = document.querySelector<HTMLTextAreaElement>('#cf-message');
				if (message && !message.value.trim()) {
					message.value = `We are planning a project similar to ${title}. `;
				}
				scrollToTarget('#contact');
				window.setTimeout(() => document.querySelector<HTMLElement>('#cf-name')?.focus({ preventScroll: true }), DURATION.hero + 400);
			});
		}),
	);

	const fromHash = () => {
		const m = location.hash.match(/^#p-(.+)$/);
		if (m) open(m[1]);
	};
	fromHash();
	window.addEventListener('hashchange', fromHash);
}
