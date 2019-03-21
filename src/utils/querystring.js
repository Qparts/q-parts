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

export const addQuery = (array, title, element = []) => {
  // const newArray=[];
  // for(var i = 0 ; i<array.length;i++){
  //   newArray.push(array[i].replace(/\s/g, ""))
  // }
  // if(newArray.length === 0){
  //   var regex = new RegExp(`brands=${element[0].toString().replace(/\s/g, "")}`, "gi");
  //   var url = window.location.search;
  //   console.log(url)
  //   var newUrl = url.replace(regex, "");
  //
  //   return newUrl;
  // }else{
  //
  //     let newUrl=window.location.origin+ '&'+'brands='+newArray
  //     let obj = queryString.parse(window.location.search.slice(1));
  //     console.log(obj);
  //     //let url = new URL(newUrl);
  //   if(element.length !== 0){
  //     var regex = new RegExp(`brands=${element[0].toString().replace(/\s/g, "")}`, "gi");
  //     //let options = url.searchParams.getAll("brands");
  //     var newUrl =  window.location.search.replace(regex, "raed");
  //     console.log(newUrl)
  //   }else{
  //       return "listing?"+window.location.search.slice(1)+'&'+'brands='+newArray;
  //   }
  //

  // }
  //  const newArray=[];
  //  for(var i = 0 ; i<array.length;i++){
  //    newArray.push(array[i].replace(/\s/g, ""))
  //  }
  // if(element.length !== 0){
  //   var regex = new RegExp(`&brands=${element[0].toString().replace(/\s/g, "")}`, "gi");
  //   var url = window.location.search;
  //   var newUrl = url.replace(regex, "");
  //   return window.location.pathname + newUrl;
  // }
  //
  //  const arr = newArray.map(encodeURIComponent);
  // console.log(array)
  //  for(var i =0;i<array.length;i++){
  //    var regex = new RegExp(`&${title}=${array[i]}`, "gi");
  //    var url = "listing?"+window.location.search.slice(1);
  //    console.log(regex)
  //    var newUrl = url.replace(regex, "");
  //  }
  //  const arr = array.map(encodeURIComponent)
  if (element.length !== 0) {
    var regex = new RegExp(`&${title}=${element[0]}`, "gi");
    var url = window.location.search;
    var newUrl = url.replace(regex, "");
    return window.location.pathname + newUrl;
  }
  // return '?'+key+'[]=' + arr.join('&'+key+'[]=')
  return "listing?" + window.location.search.slice(1) + '&' + `${title}` + '=' + array;
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
