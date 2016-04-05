import { Marker } from 'react-leaflet';
import { Util, DomUtil } from 'leaflet';

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

export default class AnimatedMarker extends Marker {

  componentDidUpdate(prevProps) {
    this.options = {
      distance: 200,
      interval: 1000,
      autoStart: true,
      onEnd: function(){},
      clickable: false,
    };

    const [lat, lng] = this.props.position;
    const [prevLat, prevLng] = prevProps.position;
    const animateSteps = 200;

    if (lat !== prevLat && lng !== prevLng) {
      this.setLine([prevProps.position, this.props.position]);
      this.animate();
      // const deltaLatLng = [lat - prevLat, lng - prevLng];
    }
  }

  setLine(latlngs) {
    if (DomUtil.TRANSITION) {
      // No need to to check up the line if we can animate using CSS3
      this.leafletElement._latlngs = latlngs;
    } else {
      // Chunk up the lines into options.distance bits
      this.leafletElement._latlngs = this.leafletElement._chunk(latlngs);
      this.options.distance = 10;
      this.options.interval = 30;
    }
    this.leafletElement._i = 0;
  }

  animate() {
    var self = this;
    var len = this.leafletElement._latlngs.length;
    var speed = this.options.interval;

    // Normalize the transition speed from vertex to vertex
    if (this.leafletElement._i < len && this.i > 0) {
      speed = this.leafletElement._latlngs[this.leafletElement._i-1].distanceTo(this.leafletElement._latlngs[this.leafletElement._i]) / this.options.distance * this.options.interval;
    }

    // Only if CSS3 transitions are supported
    if (DomUtil.TRANSITION) {
      if (this.leafletElement._icon) {
        this.leafletElement._icon.style[DomUtil.TRANSITION] = ('all ' + speed + 'ms linear');
      }
      if (this.leafletElement._shadow) {
        this.leafletElement._shadow.style[DomUtil.TRANSITION] = 'all ' + speed + 'ms linear';
      }
    }

    // Move to the next vertex
    this.leafletElement.setLatLng(this.leafletElement._latlngs[this.leafletElement._i]);
    this.leafletElement._i++;

    // Queue up the animation to the next next vertex
    this.leafletElement._tid = setTimeout(function(){
      if (self._i === len) {
        self.options.onEnd.apply(self, Array.prototype.slice.call(arguments));
      } else {
        self.animate();
      }
    }, speed);
  }
}
