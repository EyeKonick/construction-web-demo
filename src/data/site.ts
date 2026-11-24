import type { ImageMetadata } from 'astro';

import craneSkyline from '../assets/images/crane-skyline.jpg';
import crewLineup from '../assets/images/crew-lineup.jpg';
import concretePour from '../assets/images/concrete-pour.jpg';
import frameWorker from '../assets/images/frame-worker.jpg';
import concreteFrame from '../assets/images/concrete-frame.jpg';
import blueprintReview from '../assets/images/blueprint-review.jpg';
import steelStructure from '../assets/images/steel-structure.jpg';
import roomFitout from '../assets/images/room-fitout.jpg';
import industrialDoor from '../assets/images/industrial-door.jpg';
import aerialIndustrial from '../assets/images/aerial-industrial.jpg';
import yellowCrane from '../assets/images/yellow-crane.jpg';
import siteAerial from '../assets/images/site-aerial.jpg';
import powerTool from '../assets/images/power-tool.jpg';
import glassOffice from '../assets/images/glass-office.jpg';
import glassTowers from '../assets/images/glass-towers.jpg';
import cliffVilla from '../assets/images/cliff-villa.jpg';
import cedarResidence from '../assets/images/cedar-residence.jpg';
import poolHouse from '../assets/images/pool-house.jpg';
import palmVilla from '../assets/images/palm-villa.jpg';
import loadingDocks from '../assets/images/loading-docks.jpg';
import solarWarehouse from '../assets/images/solar-warehouse.jpg';
import openPlanInterior from '../assets/images/open-plan-interior.jpg';
import workersSunset from '../assets/images/workers-sunset.jpg';
import siteCrew from '../assets/images/site-crew.jpg';
import craneLow from '../assets/images/crane-low.jpg';

/* ------------------------------------------------------------------ */
/*  Company details: a made-up contractor for this demo.              */
/*  Haligi is Filipino for "pillar" or "main post".                    */
/* ------------------------------------------------------------------ */

export const company = {
	name: 'Haligi Builders',
	short: 'Haligi',
	legal: 'Haligi Builders Corp.',
	founded: 2004,
	email: 'projects@haligibuilders.example',
	careersEmail: 'careers@haligibuilders.example',
	office: 'Meralco Avenue, Ortigas Center, Pasig',
	region: 'Metro Manila, Philippines',
	hours: 'Mon to Sat, 07:00 to 17:00',
	description:
		'Haligi Builders is a general contractor in Metro Manila. We build homes, offices, warehouses and plants under one fixed-price contract, from permits to handover.',
	socials: [
		{ label: 'Facebook', href: 'https://www.facebook.com/' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/' },
		{ label: 'Instagram', href: 'https://www.instagram.com/' },
	],
};

export const nav = [
	{ label: 'Company', href: '#company' },
	{ label: 'Services', href: '#services' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Process', href: '#process' },
	{ label: 'Safety', href: '#safety' },
	{ label: 'Contact', href: '#contact' },
];

export const images = {
	hero: craneSkyline,
	crewLineup,
	concretePour,
	frameWorker,
	workersSunset,
	siteCrew,
	craneLow,
};

/** Key figures. Shown in the hero strip and counted up in the company section. */
export const figures = [
	{ value: 412, suffix: '', label: 'Projects handed over since 2004' },
	{ value: 1.8, suffix: 'M m²', label: 'Floor area built', decimals: 1 },
	{ value: 94, suffix: '%', label: 'Handed over on or before the contract date' },
	{ value: 650, suffix: '+', label: 'Engineers, foremen and trades on our payroll' },
];

export interface Service {
	code: string;
	title: string;
	summary: string;
	scope: string[];
	image: ImageMetadata;
	alt: string;
}

export const services: Service[] = [
	{
		code: 'GC',
		title: 'General contracting',
		summary:
			'We take the architect’s drawings and build them, at a fixed price. One project manager runs the site, the trades, the schedule and the budget.',
		scope: ['Fixed-price bids', 'Site management', 'Cost control', 'Weekly reports'],
		image: concreteFrame,
		alt: 'A concrete-framed apartment block under construction, its floors open to the sky',
	},
	{
		code: 'DB',
		title: 'Design and build',
		summary:
			'Bring a site and a budget. Our in-house architects and engineers draw the building, get the permits and then build it, under one contract.',
		scope: ['Feasibility', 'Architecture', 'Permits', 'Construction'],
		image: blueprintReview,
		alt: 'An engineer holds a sheet of plans up to the window of an unfinished room',
	},
	{
		code: 'SC',
		title: 'Structural steel and civil works',
		summary:
			'Earthworks, piling, foundations and steel frames for long spans. We own our cranes and welding crews, so the frame goes up on our timetable.',
		scope: ['Earthworks', 'Bored piles', 'Steel frames', 'Roads and drainage'],
		image: steelStructure,
		alt: 'A grid of steel roof beams seen from below against a pale sky',
	},
	{
		code: 'FO',
		title: 'Fit-out and renovation',
		summary:
			'Offices, clinics and shops fitted out inside occupied buildings, at night and on weekends when needed, so the people next door keep working.',
		scope: ['Office fit-out', 'Retrofit', 'MEP upgrades', 'Finishing'],
		image: roomFitout,
		alt: 'A site lead stands in a bright room halfway through its fit-out',
	},
	{
		code: 'IN',
		title: 'Industrial and warehouses',
		summary:
			'Pre-engineered steel warehouses, cold rooms and light-industrial plants, with the slab, the docks and the power supply ready on the first day of operations.',
		scope: ['Warehouses', 'Cold storage', 'Factory slabs', 'Loading docks'],
		image: industrialDoor,
		alt: 'A new steel-clad industrial unit with a large roller door',
	},
];

export type Sector = 'Residential' | 'Commercial' | 'Industrial';

export interface Project {
	slug: string;
	title: string;
	location: string;
	year: number;
	sector: Sector;
	floorArea: string;
	duration: string;
	scope: string;
	summary: string;
	cover: ImageMetadata;
	coverAlt: string;
	detail: ImageMetadata;
	detailAlt: string;
}

export const projects: Project[] = [
	{
		slug: 'alabang-hillside-house',
		title: 'Hillside House',
		location: 'Alabang, Muntinlupa',
		year: 2025,
		sector: 'Residential',
		floorArea: '640 m²',
		duration: '14 months',
		scope: 'Design and build',
		summary:
			'A three-level house on a sloping lot, with a post-tensioned slab that lets the upper floor overhang the pool by four metres without a column.',
		cover: cliffVilla,
		coverAlt: 'A white three-storey house with timber soffits above a long pool',
		detail: openPlanInterior,
		detailAlt: 'The open-plan living room with a timber wall and full-height glazing',
	},
	{
		slug: 'ortigas-office-tower',
		title: 'Emerald Office Tower',
		location: 'Ortigas Center, Pasig',
		year: 2024,
		sector: 'Commercial',
		floorArea: '28,400 m²',
		duration: '31 months',
		scope: 'General contracting',
		summary:
			'A 24-storey office tower with a curved curtain wall. We built the core with a self-climbing form, one floor every six working days.',
		cover: glassOffice,
		coverAlt: 'The curved glass facade of an office tower against a blue sky',
		detail: yellowCrane,
		detailAlt: 'A yellow tower crane above the building during construction',
	},
	{
		slug: 'calamba-logistics-hub',
		title: 'Calamba Logistics Hub',
		location: 'Calamba, Laguna',
		year: 2024,
		sector: 'Industrial',
		floorArea: '42,000 m²',
		duration: '11 months',
		scope: 'Design and build',
		summary:
			'Three cross-dock warehouses with 36 loading bays, a 12-metre clear height and a rooftop solar array that covers the daytime load.',
		cover: loadingDocks,
		coverAlt: 'A row of loading docks along the side of a warehouse',
		detail: solarWarehouse,
		detailAlt: 'The warehouse roof seen from above, covered in solar panels',
	},
	{
		slug: 'tagaytay-ridge-residence',
		title: 'Ridge Residence',
		location: 'Tagaytay, Cavite',
		year: 2023,
		sector: 'Residential',
		floorArea: '410 m²',
		duration: '12 months',
		scope: 'General contracting',
		summary:
			'A family house of timber-clad volumes on a white plinth. The cladding is treated narra, fixed on a ventilated batten system made for the ridge’s rain.',
		cover: cedarResidence,
		coverAlt: 'A modern house with a timber-clad upper volume and a white rendered base',
		detail: palmVilla,
		detailAlt: 'A white house with a pool and palm trees in the garden',
	},
	{
		slug: 'bgc-twin-towers',
		title: 'Fort Twin Towers',
		location: 'Bonifacio Global City, Taguig',
		year: 2022,
		sector: 'Commercial',
		floorArea: '61,000 m²',
		duration: '38 months',
		scope: 'Structural frame and envelope',
		summary:
			'The structural frame and glazed envelope of two residential towers. Our crews poured 48,000 m³ of concrete without a lost-time injury.',
		cover: glassTowers,
		coverAlt: 'Glass towers seen from street level under a grey sky',
		detail: siteAerial,
		detailAlt: 'Workers in orange vests tying steel reinforcement on a slab',
	},
	{
		slug: 'batangas-industrial-park',
		title: 'Batangas Industrial Park, Phase 2',
		location: 'Santo Tomas, Batangas',
		year: 2025,
		sector: 'Industrial',
		floorArea: '86 ha site',
		duration: '22 months',
		scope: 'Civil works',
		summary:
			'Roads, drainage, power and the slabs for nine factory lots, built while the tenants of Phase 1 kept running next door.',
		cover: aerialIndustrial,
		coverAlt: 'An aerial view of a large industrial site with roads and new buildings',
		detail: powerTool,
		detailAlt: 'A carpenter in safety gear cuts timber on a workbench',
	},
	{
		slug: 'antipolo-garden-house',
		title: 'Garden House',
		location: 'Antipolo, Rizal',
		year: 2022,
		sector: 'Residential',
		floorArea: '380 m²',
		duration: '10 months',
		scope: 'Renovation and extension',
		summary:
			'A 1990s house opened up and extended with a new veranda wing and a pool, while the family lived in the old half.',
		cover: poolHouse,
		coverAlt: 'A white two-storey house with a veranda above a pool lined with palms',
		detail: concretePour,
		detailAlt: 'Workers finishing a freshly poured concrete slab',
	},
];

export const process = [
	{
		title: 'Site visit and estimate',
		weeks: 'Week 1 to 2',
		text: 'An engineer walks the site with you, checks the soil, the access and the drawings, and returns a priced estimate within ten working days.',
	},
	{
		title: 'Contract and permits',
		weeks: 'Week 3 to 8',
		text: 'We sign one fixed-price contract with a dated schedule, then file the building permit, the fencing and the excavation permits for you.',
	},
	{
		title: 'Mobilisation and foundations',
		weeks: 'Month 2 to 4',
		text: 'Fencing, site office, survey and piling. A safety officer is on site from the first day, and you get a photo report every Friday.',
	},
	{
		title: 'Structure and envelope',
		weeks: 'Month 4 onwards',
		text: 'Frame, roof, walls and windows, with the mechanical, electrical and plumbing works coordinated in one model, so nothing is chipped out later.',
	},
	{
		title: 'Handover and warranty',
		weeks: 'Final month',
		text: 'Snag lists closed, as-built drawings and manuals handed over, then a one-year defects warranty with a named engineer to call.',
	},
];

export const safety = [
	{ value: 3.2, decimals: 1, suffix: 'M', label: 'Work hours since our last lost-time injury' },
	{ value: 100, decimals: 0, suffix: '%', label: 'Of workers inducted and fitted with PPE before their first shift' },
	{ value: 15, decimals: 0, suffix: ' min', label: 'Toolbox talk at the start of every shift, every site' },
];

export const commitments = [
	{
		icon: 'helmet',
		title: 'A safety officer on every site',
		text: 'Full-time from mobilisation to handover, with the authority to stop any task.',
	},
	{
		icon: 'clipboard',
		title: 'A report every Friday',
		text: 'Progress photos, the schedule, the cost to date and next week’s plan, in one page.',
	},
	{
		icon: 'peso',
		title: 'One fixed price',
		text: 'Variations are priced and signed before the work starts, never added at the end.',
	},
	{
		icon: 'wrench',
		title: 'Our own crews',
		text: 'Formwork, rebar and steel teams are on our payroll, not hired by the day.',
	},
] as const;

export const testimonials = [
	{
		quote:
			'They gave us a date for the handover on the day we signed, and they kept it, through two typhoon seasons. The Friday reports meant I never had to chase anyone.',
		name: 'Ramon Villanueva',
		role: 'Operations director, logistics client',
		project: 'Calamba Logistics Hub',
	},
	{
		quote:
			'We lived in half the house while they rebuilt the other half. The site was swept every evening and the crew knew our kids by name.',
		name: 'Celeste Aquino',
		role: 'Homeowner',
		project: 'Garden House',
	},
	{
		quote:
			'The core went up a floor a week, and their engineers caught two clashes in the services drawings before a single sleeve was cast.',
		name: 'Engr. Paolo Mendoza',
		role: 'Project manager for the developer',
		project: 'Emerald Office Tower',
	},
];

export const projectTypes = ['House or villa', 'Office or retail', 'Warehouse or plant', 'Fit-out or renovation', 'Civil works', 'Other'];
export const budgets = ['Under ₱10M', '₱10M to ₱50M', '₱50M to ₱200M', 'Above ₱200M', 'Not sure yet'];

export const openRoles = ['Site engineers', 'Safety officers', 'Quantity surveyors', 'Foremen'];

export const credits =
	'Photographs: Unsplash (Unsplash License), by EJ Yao, Scott Blake, Hammilton Ojijo, Josh Olalde, Wasif Ali, James Sullivan, Jeriden Villegas, Florian Haider, Heye Jensen, GN Group, Shivendu Shukla, Tolu Olubode, Kenrick Baksh, Bernd Dittrich, Esphera ArqEng, Matthew Jackson, Roman Serdyuk and others.';
