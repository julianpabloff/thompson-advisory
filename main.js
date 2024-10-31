function submitForm(event, form, button, message) {
	function showSubmitSuccess(text) {
		button.style.display = 'none';
		message.innerText = text;
		message.style.opacity = '1';
	}
	event.preventDefault();
	button.innerText = 'Submitting...';

	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);

	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: json
	};

	setTimeout(() => {
		showSubmitSuccess('Message sent successfully.');
	}, 1000);
	/*
	fetch('https://api.web3forms.com/submit', request)
		.then(async response => {
			const json = await response.json();
			if (response.status == 200) {
				console.log(json.message);
			} else {
				console.log('ERROR:');
				console.log(response);
				console.log(json.message);
			}
		})
		.catch(error => console.log(error))
		.then(() => {
			console.log('do something visually now');
			button.innerText = 'Done.';
		});
		*/
}

window.addEventListener('load', function() {
	// Get DOM elements
	// TODO: landing should read clientheight then set the height, so it doesn't change on mobile
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
		arrow.style.transform = 'translateY(0.5rem)';
		setTimeout(() => {
			arrow.style.transform = 'translateY(0)';
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

	// FORM
	const form = document.getElementById('form');
	const submitButton = document.getElementById('submit-button');
	const successMessage = document.getElementById('success-message');
	submitButton.onmouseup = () => submitButton.blur();
	form.onsubmit = event => submitForm(event, form, submitButton, successMessage);

	window.onscroll = onScroll;
	window.onresize = onResize;
});
