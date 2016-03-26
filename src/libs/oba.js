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

  const options = {
    timeout: 10 * 1000,
  };

  return fetch(`${url}?${qs}`, options)
    .then(res => res.json())
    .catch(err => {
      // FIXME: Throw these as OBAError so we can filter in Sentry and elsewhere
      console.error(err);
      throw err;
    });
}
