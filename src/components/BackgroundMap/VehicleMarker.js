import { Marker } from 'react-leaflet';
import { marker, DivIcon, Util } from 'leaflet';

import styles from './styles.scss';

function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}

function animateMarker(leafletElement, i, steps, startLatLng, deltaLatLng) {
  const x = easeInOutCubic(i, startLatLng[0], deltaLatLng[0], steps);
  const y = easeInOutCubic(i, startLatLng[1], deltaLatLng[1], steps);

  leafletElement.setLatLng([x, y]);

  if (i < steps) {
    Util.requestAnimFrame(animateMarker.bind(null, leafletElement, i + 1, steps, startLatLng, deltaLatLng), null, false, leafletElement._container);
  }
}

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
    const { lat, lng } = this.props.position;
    const { prevLat, prevLng } = prevProps.position;
    const animateSteps = 200;

    if (lat !== prevLat && lng !== prevLng) {
      const deltaLatLng = [lat - prevLat, lng - prevLng];
      if (document.visibilityState === 'visible') {
        animateMarker(
          this.getLeafletElement(),
          0,
          animateSteps,
          [prevLat, prevLng],
          deltaLatLng
        );
      }
      else {
        this.leafletElement.setLatLng(this.props.position);
      }
    }
  }
}
