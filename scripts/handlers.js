import { formatNumber } from './utils.js';
import { unaryOperate, binaryOperate } from './operations.js';

const displayDom = document.querySelector('#display p');

const MAX_DISPLAY_LENGTH = 13;
let firstOperand = undefined;
let secondOperand = undefined;
let operator = '';
let currentDisplay = '0';
let currentInputNum = '0';

function handleClear() {
	currentDisplay = '0';
	currentInputNum = '';
	firstOperand = undefined;
	secondOperand = undefined;
	operator = '';
}

function handleDelete() {
	if (currentDisplay.includes('E') || currentDisplay.includes('e')) return;

	if (currentDisplay.length >= 1) {
		currentDisplay = currentDisplay.slice(0, -1);
	}

	if (
		currentDisplay.length === 0 ||
		(currentDisplay.length === 1 && currentDisplay.startsWith('-')) // Handle negative number
	) {
		currentDisplay = '0';
	}

	currentInputNum = currentDisplay;
}

function handleSignToggle() {
	currentInputNum = String(unaryOperate(parseFloat(currentDisplay)));
	currentDisplay = currentInputNum.toString();
}

function handlePointInput(str) {
	if (!currentInputNum.includes('.')) {
		currentInputNum += str;
		if (currentInputNum.startsWith('.')) {
			currentInputNum = '0' + currentInputNum;
		}
	}
	currentDisplay = currentInputNum;
}

function handleOperatorInput(str) {
	if (operator) {
		// If existing operator, check if user-input number exits
		if (currentInputNum) {
			// If there is a user-input number,
			// calculate the result using it as the second operand
			secondOperand = parseFloat(currentInputNum);
			const result = binaryOperate(operator, firstOperand, secondOperand);

			// Populate the result to screen;
			currentDisplay = formatNumber(result);

			// Store the result, in case user use it as a operand to calculate
			firstOperand = result;
		}
		// If no user-input number exists, do nothing here.
	} else {
		// If no operator exists, then check if no first operand exists,
		if (!firstOperand) {
			// If no first operand exists, make current input number as first operand,
			// or make current display as first operand if there is no user input number
			firstOperand = currentInputNum
				? parseFloat(currentInputNum)
				: parseFloat(currentDisplay);
		}
	}

	// Set current input as user input operator
	operator = str;

	// And clear the current input-number variable for taking the next user input
	currentInputNum = '';

	// Update button state
	const btn = [...document.querySelectorAll('button')].find(
		(button) => button.value === str
	);

	if (btn) {
		btn.classList.add('activated');
	}
}

function handleEquals() {
	if (operator && firstOperand !== undefined && currentInputNum) {
		secondOperand = parseFloat(currentInputNum);
		const result = binaryOperate(operator, firstOperand, secondOperand);
		currentDisplay = formatNumber(result);

		firstOperand = undefined;
		currentInputNum = '';
		operator = '';
	}
}

function handleDigitInput(str) {
	if (currentInputNum.length < MAX_DISPLAY_LENGTH) {
		currentInputNum += str;
	}

	// Remove leading zeros
	if (currentInputNum.startsWith('0') && !currentInputNum.startsWith('0.')) {
		currentInputNum = parseFloat(currentInputNum).toString();
	}

	// Display user input
	currentDisplay = currentInputNum;
}

function updateDisplay() {
	displayDom.textContent = currentDisplay;
}

function removeBtnActiveEffect() {
	document.querySelectorAll('button').forEach((operator) => {
		operator.classList.remove('activated');
	});
}

export function handleInputs(input) {
	removeBtnActiveEffect();

	if (input === 'clear' || input === 'Escape') {
		handleClear();
	} else if (input === 'delete' || input === 'Backspace') {
		handleDelete();
	} else if (input === '+/-') {
		handleSignToggle();
	} else if (input === '.') {
		handlePointInput(input);
	} else if (input === '=' || input === 'Enter') {
		handleEquals();
	} else if (['+', '-', '*', '/'].includes(input)) {
		handleOperatorInput(input);
	} else if (!isNaN(input)) {
		handleDigitInput(input);
	}

	updateDisplay();
}
