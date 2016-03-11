import fetch from 'fetch-jsonp';
import queryString from 'query-string';

export default function oba(endpoint, query = {}) {
  // const url = `http://localhost:8080/api/where/${endpoint}.json`;
  const url = `http://52.88.82.199:8080/onebusaway-api-webapp/api/where/${endpoint}.json`;
  // const url = `http://api.tampa.onebusaway.org/api/where/${endpoint}.json`;
  const qs = queryString.stringify({
    key: 'TEST',
    ...query,
  });

  return fetch(`${url}?${qs}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
}
