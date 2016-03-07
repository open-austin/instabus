import { observable, autorun } from 'mobx';
import Queries from 'lib/Queries';

export class DataStore {
  @observable routes = []
  @observable trips = []
  @observable stops = []
  @observable polyline = ''

  loadAllRoutes = () => {
    Queries.getAllRoutes().then(routes => {
      this.routes = routes.data.list.sort((a, b) => {
        return a.shortName - b.shortName;
      });
    });
  }

  clearStops = () => {
    this.stops = [];
    this.polyline = [];
  }

  loadTripsForRoute = (route) => {
    Promise.all([
      Queries.getTripsForRoute(route),
      Queries.getStopsForRoute(route)
    ]).then((values) => {
      const trips = values[0],
        stops = values[1];
      this.polyline = stops.data.entry.polylines[0].points;
      this.stops = stops.data.references.stops;
      this.trips = trips.data.list;
    });
  }
}

const store = new DataStore();
export default store;
