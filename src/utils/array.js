export const isEmpty = (array) => {
 return array ? array.length === 0 : -1;
}

export const filterObject = (array, key) => {
 let newArray = [];
 array.forEach(filter => {
  newArray.push({
   [key]: filter[key],
  })
 });
 return newArray;
}

export const shiftArrayToRight = (arr, places) => {
 for (var i = 0; i < places; i++) {
  arr.unshift(arr.pop());
 }
}

export const toUpperCaseForEach = (array) => {
 const upperCaseArray = array.map(string => {
  return string.replace(/^\w/, c => c.toUpperCase());
 });
 return upperCaseArray;
}

export const replaceAll = (array, searchValue, replaceValue) => {
 const replace = array.map(string => {
  return string.replace(searchValue, replaceValue);
 });
 return replace;
}