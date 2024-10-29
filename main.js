const logo = document.getElementById('logo');
function revealLogo() {
	logo.style.display = 'flex';
	setTimeout(() => {
		logo.style.opacity = '1';
		logo.style.top = '0';
	}, 100);
}

// Google Font Loaded
window.onload = revealLogo;
