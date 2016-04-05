import { Marker } from 'react-leaflet';
import { polyline } from 'leaflet';

import styles from './styles.scss';

export default class PolylineLayer extends Marker {
  componentWillMount() {
    this.leafletElement = polyline(this.props.position, {
      ...this.props,
    });
  }
}
