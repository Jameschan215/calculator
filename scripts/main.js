import { handleInputs } from './handlers.js';

// Handle click input
document.querySelectorAll('button').forEach((btn) => {
	btn.addEventListener('click', () => {
		handleInputs(btn.value);
	});
});

// Handle keyboard input
document.addEventListener('keydown', (event) => {
	event.preventDefault();
	handleInputs(event.key);
});

// Forbid selecting on page
document.addEventListener('selectstart', (event) => {
	event.preventDefault();
});
