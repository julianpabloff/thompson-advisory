function setLandingHeight(landing, splash) {
	let height = window.innerHeight;
	if (height < 400) height = 400;
	landing.style.height = `${height}px`;
	splash.style.height = `${height}px`;
}

function revealLogo(logo) {
	logo.style.display = 'flex';
	setTimeout(() => logo.style.opacity = '1', 100);
}

function animateArrow(arrow) {
	function arrowPulse() {
		arrow.style.transform = 'translateY(0.5rem)';
		setTimeout(() => {
			arrow.style.transform = 'translateY(0)';
		}, 1000);
	}
	arrowPulse();
	setInterval(arrowPulse, 2000);
}

function autoScrollDown(target) {
	target.scrollIntoView({ behavior: 'smooth' });
}

function showSubmitMessage(button, message, text) {
	button.style.display = 'none';
	message.innerText = text;
	message.style.opacity = '1';
}

function submitForm(event, form, button, message) {
	event.preventDefault();
	form.onsubmit = e => e.preventDefault(); // Prevent button spamming
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

	fetch('https://api.web3forms.com/submit', request)
		.then(response => {
			if (response.status == 200) {
				showSubmitMessage(button, message, 'Message sent successfully.');
				form.reset();
			} else
				showSubmitMessage(button, message, 'There was an error submitting. Please try again later.');
		})
		.catch(() => showSubmitMessage(button, message, 'There was an error submitting. Please try again later.'));
}

const delay = 2000;
const holdTime = 2000;
function animateExpertise(expertise) {
	const count = expertise.children.length;
	for (let i = 0; i < count; i++) {
		const child = expertise.children[i];
		function runAnimation() {
			setTimeout(() => {
				child.style.transform = 'scale(1.05)';
				child.className = 'bright';
				setTimeout(() => {
					child.style.transform = 'scale(1)';
					child.className = '';
				}, holdTime);
			}, delay * i);
		}
		runAnimation();
		setInterval(runAnimation, delay * count);
	}
}

const splashMaxOpacity = 0.6;
function setSplashFade(splash, t = 0) {
	const opacity = splashMaxOpacity * (1 - t);
	splash.style.opacity = opacity.toString();
}

window.addEventListener('load', function() {
	// Get DOM elements
	const landing = document.getElementById('landing-container');
	const logo = document.getElementById('logo');
	const learnMore = document.getElementById('learn-more');
	const arrow = document.getElementById('arrow');
	const splash = document.getElementById('splash');
	const content = document.getElementById('content');
	const expertise = document.getElementById('expertise');

	// Startup
	setLandingHeight(landing, splash);
	revealLogo(logo);
	animateArrow(arrow);
	animateExpertise(expertise);

	// Scroll down to content
	learnMore.onclick = () => autoScrollDown(content);

	// Splash image fade on scroll
	const landingTracker = new ScrollTracker(landing);
	function onScroll() {
		landingTracker.onScroll();
		setSplashFade(splash, landingTracker.t);
	}
	function onResize() {
		landingTracker.onResize();
		landingTracker.outPadding = 0.3 * window.innerHeight;
		onScroll();
	}
	onResize();

	window.onscroll = onScroll;
	window.onresize = onResize;

	// FORM
	const form = document.getElementById('form');
	const submitButton = document.getElementById('submit-button');
	const successMessage = document.getElementById('success-message');

	submitButton.onmouseup = () => submitButton.blur();
	form.onsubmit = event => submitForm(event, form, submitButton, successMessage);
});
