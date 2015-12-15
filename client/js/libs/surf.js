import turfPoint from 'turf-point';
import turfDistance from 'turf-distance';

const _distanceBetweenCoordsCache = {};
export function distanceBetweenCoords(fromlatLng, toLatLng) {
  if (!fromlatLng || !toLatLng) { return 0; }

  const cacheKey = fromlatLng + ':' + toLatLng;
  if (_distanceBetweenCoordsCache[cacheKey]) {
    return _distanceBetweenCoordsCache[cacheKey];
  }

  const fromPoint = turfPoint([fromlatLng[1], fromlatLng[0]]);
  const toPoint = turfPoint([toLatLng[1], toLatLng[0]]);
  const distance = turfDistance(toPoint, fromPoint, 'miles');

  _distanceBetweenCoordsCache[cacheKey] = distance;
  return distance;
}


const _formatDistanceBetweenCoordsCache = {};
export function formatDistanceBetweenCoords(fromlatLng, toLatLng) {
  const cacheKey = fromlatLng + ':' + toLatLng;
  if (_formatDistanceBetweenCoordsCache[cacheKey]) {
    return _formatDistanceBetweenCoordsCache[cacheKey];
  }

  const distance = distanceBetweenCoords(fromlatLng, toLatLng);
  const result = (Math.round(distance * 100) / 100) + ' mi';

  _formatDistanceBetweenCoordsCache[cacheKey] = result;
  return result;
}
