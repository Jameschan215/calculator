import { unaryOperate, binaryOperate } from './operations.js';

const displayDom = document.querySelector('#display p');
const buttonsDom = document.querySelectorAll('button');

let firstOperand = undefined;
let secondOperand = undefined;
let operator = '';
let currentDisplay = '0';

buttonsDom.forEach((btn) => {
	btn.addEventListener('click', handleInputs);
});

function handleInputs(event) {
	const btn = event.target;
	const input = btn.value;

	switch (input) {
		case 'clear':
			handleClear();
			break;

		case 'delete':
			handleDelete();
			break;

		case '+/-':
			handleSign();
			break;

		case '.':
			if (!currentDisplay.includes('.')) {
				currentDisplay += input;
			}
			break;

		case '=':
			handleEquals();
			break;

		case '+':
		case '-':
		case '*':
		case '/':
			handleOperatorInput(btn, input);
			break;

		default:
			handleDigitInput(input);
			break;
	}

	updateDisplay();
}

function handleClear() {
	currentDisplay = '0';
	firstOperand = undefined;
	secondOperand = undefined;
	operator = '';
	removeActiveEffect();
}

function handleDelete() {
	if (currentDisplay.length > 1) {
		currentDisplay = currentDisplay.slice(0, -1);
	} else if (currentDisplay.length === 1) {
		currentDisplay = '0';
	}
}

function handleOperatorInput(btn, str) {
	if (operator) {
		if (currentDisplay) {
			secondOperand = parseFloat(currentDisplay);
			firstOperand = binaryOperate(operator, firstOperand, secondOperand);
			currentDisplay = '0';
		}
	} else {
		if (firstOperand === undefined) {
			firstOperand = parseFloat(currentDisplay);
			currentDisplay = '0';
		}
	}

	removeActiveEffect();
	btn.classList.add('activated');
	operator = str;
}

function handleSign() {
	if (currentDisplay !== '0') {
		currentDisplay = unaryOperate(parseFloat(currentDisplay));
	} else {
		currentDisplay = unaryOperate(firstOperand);
	}

	removeActiveEffect();
}

function handleEquals() {
	if (operator && firstOperand !== undefined && currentDisplay) {
		firstOperand = binaryOperate(
			operator,
			firstOperand,
			parseFloat(currentDisplay)
		);
		currentDisplay = '0';
		operator = '';
	}
}

function handleDigitInput(str) {
	removeActiveEffect();
	currentDisplay += str;

	if (currentDisplay.startsWith('0') && !currentDisplay.startsWith('0.')) {
		currentDisplay = `${parseFloat(currentDisplay)}`;
	}
}

function updateDisplay() {
	let checked = '';

	if (currentDisplay !== '0') {
		if (currentDisplay.length > 13) {
			checked = currentDisplay.slice(0, 13);
		} else {
			checked = currentDisplay;
		}
	} else if (firstOperand) {
		if (String(firstOperand).length > 13) {
			checked = String(firstOperand).slice(0, 13);
		} else {
			checked = String(firstOperand);
		}
	} else {
		checked = '0';
	}

	displayDom.textContent = checked;
}

function removeActiveEffect() {
	document.querySelectorAll('.operator').forEach((op) => {
		op.classList.remove('activated');
	});
}
