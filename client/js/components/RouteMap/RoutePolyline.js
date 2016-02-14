import {Polyline} from 'react-leaflet';

export default class RoutePolyline extends Polyline {
  componentDidMount() {
    this.leafletElement.bringToBack();
  }
}
