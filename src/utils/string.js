import { AR } from '../constants';

export const upperCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toUpperCase());
}

export const lowerCaseFirstChar = (string) => {
	return string.replace(/^\w/, c => c.toLowerCase());
}

export const getTranslatedObject = (object, language, name, nameAr) => {
	return language === AR ? object[nameAr] : object[name];
}

export const getTranslatedString = (language, name, nameAr) => {
	return language === AR ? nameAr : name;
}