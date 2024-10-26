export function formatNumber(num, maxLength = 13) {
	if (!num) return 'ERROR';

	let str = num.toString();

	// Check if the result length is within the specified maxLength
	if (str.length <= maxLength) {
		return str;
	} else {
		// Handle small fractions with limited decimals to fit the display
		if (Math.abs(num) < 1) {
			return parseFloat(num.toFixed(maxLength - 2))
				.toString()
				.slice(0, maxLength); // Limit decimals
		}
		// Handle larger numbers with precision
		if (
			Math.abs(num) >= Math.pow(10, maxLength) ||
			Math.abs(num) < Math.pow(10, -maxLength)
		) {
			return num.toExponential(maxLength - 7); // Scientific notation for extremes
		} else {
			return parseFloat(num.toPrecision(maxLength)).toString(); // Fit into specified significant digits
		}
	}
}
