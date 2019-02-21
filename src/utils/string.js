import { AR } from '../constants';

export const upperCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toUpperCase());
}

export const lowerCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toLowerCase());
}

export const getTranslatedString = (object, language, name, nameAr) => {
	return language === AR ? object[nameAr] : object[name];
}