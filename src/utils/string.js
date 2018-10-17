export const upperCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toUpperCase());
}

export const lowerCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toLowerCase());
}