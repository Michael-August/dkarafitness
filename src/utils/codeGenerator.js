export const generateCode = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const digits = "0123456789";

	const getRandomChar = (chars) =>
		chars.charAt(Math.floor(Math.random() * chars.length));

	let newCode = "TF5";

	// Add four random digits
	for (let i = 0; i < 3; i++) {
		newCode += getRandomChar(digits);
	}

	// Add two more random uppercase letters
	for (let i = 0; i < 2; i++) {
		newCode += getRandomChar(letters);
	}

	return newCode;
};
