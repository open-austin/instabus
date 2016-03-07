import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MapLayer.scss';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import polyline from 'polyline';

@CSSModules(styles)
@observer
export default class MapLayer extends React.Component {
  constructor() {
    super();
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';
  }

  state = {
    loading: true,
  }

  componentDidMount() {
    let mapInit = {
      center: [30.291708, -97.746557],
      zoom: 13,
      attributionControl: false,
      zoomControl: false
    };
    this.map = L.mapbox.map(this.refs.map, 'mapbox.streets', mapInit);
    this.map.on('ready', () => {
      this.markers = new L.FeatureGroup();
      this.map.addLayer(this.markers);
      this.setState({
        loading: false
      });
      this.stops = autorun(() => {
        this.markers.clearLayers();
        this.props.data.stops.map((stop) => {
          let marker = L.marker([stop.lat, stop.lon]);
          this.markers.addLayer(marker);
        });
      });
      this.polyline = autorun(() => {
        let route = polyline.decode(this.props.data.polyline);
        this.polyline = L.polyline(route, { color: 'blue' }).addTo(this.map);
      });
    });
  }

  render() {
    return (
      <div styleName="wrap">
        <div styleName="map" ref="map">
        </div>
      </div>
    );
  }
}
