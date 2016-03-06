import fetch from 'fetch-jsonp'

export default class Queries {
  static getAllRoutes(agency = 1) {
    return fetch(`http://52.88.82.199:8080/onebusaway-api-webapp/api/where/routes-for-agency/${agency}.json?key=TEST`)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      throw err
    })
  }

  static getTripsForRoute(route, agency = 1) {
    return fetch(`http://52.88.82.199:8080/onebusaway-api-webapp/api/where/trips-for-route/${agency}_${route}.json?key=TEST&includeSchedules=true&includeStatus=true`)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      throw err
    })
  }

  static getStopsForRoute(route, agency = 1) {
    return fetch(`http://52.88.82.199:8080/onebusaway-api-webapp/api/where/stops-for-route/${agency}_${route}.json?key=TEST`)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      throw err
    })
  }
}