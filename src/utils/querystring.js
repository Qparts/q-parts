import queryString from 'qs';

export const getQuery = (location) => (
    queryString.parse(location.search.slice(1))
);

export const replaceQuery = (location,str) => {
  let obj = queryString.parse(location.search.slice(1));
  let newPageNumber;
  if(str === "nextPage"){
    newPageNumber = Number(obj.page) + 1;
  }else if(str === "prePage"){
    console.log(str)
    newPageNumber = Number(obj.page) - 1;
  }else{
    newPageNumber = Number(obj.page);
  }

  var regex = new RegExp(`(page=${obj.page})`, "gi");
  var url = location.search;

  var newUrl = url.replace(regex, "page=" + newPageNumber);
  return location.pathname+newUrl;
};
