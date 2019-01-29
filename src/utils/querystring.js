import queryString from 'qs';

export const getQuery = (location) => (
    queryString.parse(location.search.slice(1))
);