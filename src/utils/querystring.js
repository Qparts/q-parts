import queryString from 'qs';

export const getQuery = (location) => (
    queryString.parse(location.search.slice(1))
);

export const replaceQuery = (location,str) => {
  let obj = queryString.parse(location.search.slice(1));
  let page;
  if(str === "nextPage"){
     page = Number(obj.page);
  }else{
     page = Number(obj.page);
  }
  return page;
};
