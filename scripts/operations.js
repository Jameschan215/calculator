function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return b === 0 ? undefined : a / b;
}

export function binaryOperate(operand, firstNum, secondNum) {
	switch (operand) {
		case '+':
			return add(firstNum, secondNum);
		case '-':
			return subtract(firstNum, secondNum);
		case '*':
			return multiply(firstNum, secondNum);
		case '/':
			return divide(firstNum, secondNum);

		default:
			return undefined;
	}
}

export function unaryOperate(num) {
	return -1 * num;
}