window.addEventListener('load', function() {
	// Get DOM elements
	const landing = document.getElementById('landing-container');
	const logo = document.getElementById('logo');
	const arrow = document.getElementById('arrow');
	const splash = document.getElementById('splash');

	// Reveal Logo
	logo.style.display = 'flex';
	setTimeout(() => {
		logo.style.opacity = '1';
		// logo.style.transform = 'translateY(0)';
	}, 100);

	// Animate down arrow
	function arrowPulse() {
		arrow.style.transform = 'scale(1)';
		setTimeout(() => {
			arrow.style.transform = 'scale(1.2)';
		}, 1000);
	}
	arrowPulse();
	setInterval(arrowPulse, 2000);

	// Track landing scrolling
	const landingTracker = new ScrollTracker(landing);

	// Fade splash image
	const splashMaxOpacity = 0.6;
	// splash.style.opacity = splashMaxOpacity;

	function updateLanding() {
		const opacity = splashMaxOpacity * (1 - landingTracker.t);
		splash.style.opacity = opacity.toString();
	}
	updateLanding();

	function onScroll() {
		landingTracker.onScroll();
		if (landingTracker.changed) {
			// updateLogo();
			updateLanding();
		}
	}

	function onResize() {
		landingTracker.onResize();
		landingTracker.outPadding = 0.3 * window.innerHeight;
		onScroll();
	}
	onResize();

	window.onscroll = onScroll;
	window.onresize = onResize;
});
