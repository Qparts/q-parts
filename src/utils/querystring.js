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

export const addQuery = (param) => {
  const searchQueries = getUniqueSearchQuery();
  const hasSameQuery = searchQueries.includes(param);
  const newQuery = [...searchQueries, param];

  return hasSameQuery ? null : `${window.location.pathname}?${newQuery.join('&')}`;
}

export const removeQuery = (param) => {
  const searchQueries = getUniqueSearchQuery();
  const shouldRemoveQuery = searchQueries.includes(param);
  const newQuery = searchQueries.filter(searchQuery => searchQuery !== param);

  return shouldRemoveQuery ? `${window.location.pathname}?${newQuery.join('&')}` : null;
}

const getUniqueSearchQuery = () => {
  const set = new Set(window.location.search.slice(1).split("&"));

  return [...set];

}
