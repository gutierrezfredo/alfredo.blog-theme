(function() {
	const toggle = document.getElementById('theme-toggle');
	const html = document.documentElement;
	let isAnimating = false;

	const DARK_ICON = '🏙️';
	const LIGHT_ICON = '🌆';

	// Check for saved preference or system preference
	function getPreferredTheme() {
		const saved = localStorage.getItem('theme');
		if (saved) return saved;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Apply theme without animation
	function setTheme(theme) {
		html.setAttribute('data-theme', theme);
		toggle.textContent = theme === 'dark' ? DARK_ICON : LIGHT_ICON;
		localStorage.setItem('theme', theme);
	}

	// Fade transition
	function fadeToggle(newTheme) {
		isAnimating = true;
		toggle.classList.add('fading');

		setTimeout(() => {
			html.setAttribute('data-theme', newTheme);
			toggle.textContent = newTheme === 'dark' ? DARK_ICON : LIGHT_ICON;
			localStorage.setItem('theme', newTheme);
			toggle.classList.remove('fading');
			isAnimating = false;
		}, 200);
	}

	// Initialize
	setTheme(getPreferredTheme());

	// Toggle on click with fade
	toggle.addEventListener('click', () => {
		if (isAnimating) return;
		const current = html.getAttribute('data-theme');
		const newTheme = current === 'dark' ? 'light' : 'dark';
		fadeToggle(newTheme);
	});

	// Listen for system preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			setTheme(e.matches ? 'dark' : 'light');
		}
	});
})();
