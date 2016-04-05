import { Marker } from 'react-leaflet';
import { marker, DivIcon } from 'leaflet';

import styles from './styles.scss';

export default class VehicleMarker extends Marker {
  componentWillMount() {
    this.leafletElement = marker(this.props.position, {
      ...this.props,
      icon: new DivIcon({
        className: styles.vehicle,
        iconSize: [24, 24],
        html: `<div></div><div class="${styles.vehicleDot}"></div>`,
      }),
    });
  }

  componentDidUpdate(prevProps) {
    const [lat, lng] = this.props.position;
    const [prevLat, prevLng] = prevProps.position;

    if (lat !== prevLat && lng !== prevLng) {
      this.leafletElement.setLatLng(this.props.position);
    }
  }
}
