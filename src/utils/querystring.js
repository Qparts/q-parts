import queryString from 'qs';

export const getQuery = (location) => (
  queryString.parse(location.search.slice(1))
);

export const replaceQuery = (location, str) => {
  let obj = queryString.parse(location.search.slice(1));
  let newPageNumber;
  if (str === "nextPage") {
    newPageNumber = Number(obj.page) + 1;
  } else if (str === "prePage") {
    newPageNumber = Number(obj.page) - 1;
  } else {
    newPageNumber = Number(obj.page);
  }

  var regex = new RegExp(`(page=${obj.page})`, "gi");
  var url = location.search;

  var newUrl = url.replace(regex, "page=" + newPageNumber);
  return location.pathname + newUrl;
};

export const addQuery = (id, title) => {
  const searchQuery = getUniqueSearchQuery();
  const newQuery = `${searchQuery}&${title}=${id}`
  const hasSameQuery = compareLastValue(searchQuery, newQuery);
  

  return hasSameQuery ? `listing?${searchQuery}` : `listing?${newQuery}`;
}

export const clearQuery = (titleArray, idArray) => {
  let regex;
  let url = window.location.search;
  let newUrl;
  for (var i = 0; i < titleArray.length; i++) {
    for (var j = 0; j < idArray.length; j++) {
      regex = new RegExp(`&${titleArray[i].substring(0, titleArray[i].indexOf(' '))}=${idArray[j]}`, "gi");
      newUrl = url.replace(regex, "");
      url = newUrl;
    }
  }

  return window.location.pathname + newUrl;
}

const getUniqueSearchQuery = () => {
  const set = new Set(window.location.search.slice(1).split("&"));

  return [...set].join("&");

}

const compareLastValue = (oldQuery, newQuery) => {
  const oldQueryArray = oldQuery.split("&");
  const newQueryArray = newQuery.split("&");
  const oldLastIndex = oldQueryArray.length - 1;
  const newLastIndex = newQueryArray.length - 1;

  return oldQueryArray[oldLastIndex] === newQueryArray[newLastIndex];
  
}
