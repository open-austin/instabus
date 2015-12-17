import fetch from 'isomorphic-fetch';
import queryString from 'query-string';


export default function request(endpoint, query = {}) {
  // const url = `http://localhost:8080/api/where/${endpoint}.json`;
  // const url = `http://ec2-52-34-101-15.us-west-2.compute.amazonaws.com:8080/api/where/${endpoint}.json`;
  const url = `http://api.tampa.onebusaway.org/api/where/${endpoint}.json`;
  console.log('url', url)
  const qs = queryString.stringify({
    key: 'TEST',
    ...query
  });

  // return fetch(`${url}?${qs}`)
  return fetch(`https://crossorigin.me/${url}?${qs}`)
    .catch(err => {
      console.error(err);
      throw err;
    })
}
