export const generateCode = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const digits = "0123456789";

	const getRandomChar = (chars) =>
		chars.charAt(Math.floor(Math.random() * chars.length));

	let newCode = "";

	// Add two random uppercase letters
	for (let i = 0; i < 2; i++) {
		newCode += getRandomChar(letters);
	}

	// Add four random digits
	for (let i = 0; i < 4; i++) {
		newCode += getRandomChar(digits);
	}

	// Add two more random uppercase letters
	for (let i = 0; i < 2; i++) {
		newCode += getRandomChar(letters);
	}

	return newCode;
};
