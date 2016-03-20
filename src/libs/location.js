let watchID = null;

export function watchPosition() {
  return new Promise((resolve, reject) => {
    watchID = navigator.geolocation.watchPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }),
      (err) => {
        console.error(err);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 0,
      }
    );
  });
}

export function stopWatching() {
  navigator.geolocation.clearWatch(watchID);
}
