import fetch from 'isomorphic-fetch';
import queryString from 'query-string';


export default function request(endpoint, query = {}) {
  const url = `http://localhost:8080/api/where/${endpoint}.json`;
  // const url = `http://api.tampa.onebusaway.org/api/where/${endpoint}.json`;
  const qs = queryString.stringify({
    key: 'TEST',
    ...query
  });

  // return fetch(`https://crossorigin.me/${url}?${qs}`)
  return fetch(`${url}?${qs}`)
    .catch(err => {
      console.error(err);
      throw err;
    })
}
