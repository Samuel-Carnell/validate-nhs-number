const isValidDigit = (digit: unknown): boolean => {
	return typeof digit === 'number' && !isNaN(digit) && isFinite(digit) && digit < 10 && digit >= 0;
};

function parse(nhsNumber: unknown): number[] | null {
	if (
		Array.isArray(nhsNumber) &&
		nhsNumber.length === 10 &&
		nhsNumber.every((digit) => isValidDigit(digit))
	) {
		return nhsNumber;
	}

	if (typeof nhsNumber !== 'string') {
		return null;
	}

	const withoutSpace: string = nhsNumber.replace(/\s/g, '');
	if (withoutSpace.length !== 10) {
		return null;
	}

	const digits: number[] = withoutSpace.split('').map((digit: string): number => parseInt(digit));

	if (digits.some((digit: number) => isNaN(digit))) {
		return null;
	}

	return digits;
}

function calcCheckDigit(digits: number[]): number {
	const total =
		digits
			.slice(0, 9)
			.map((digit, ind) => digit * (11 - (ind + 1)))
			.reduce((acc, cur) => acc + cur) % 11;
	const remainder = total % 11;
	const checkDigit = remainder > 0 ? 11 - remainder : 0;
	return checkDigit;
}

function validate(nhsNumber: string | number[]): boolean {
	const digits: number[] | null = parse(nhsNumber);
	if (digits === null) {
		return false;
	}

	const expectedCheckDigit: number = digits[9];
	const actualCheckDigit: number = calcCheckDigit(digits);
	if (actualCheckDigit === 10) {
		return false;
	}

	return expectedCheckDigit === actualCheckDigit;
}

export default validate;
