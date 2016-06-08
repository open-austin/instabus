import Worker from 'worker!./obaWorker.js';

const oba = new Worker();

export const vehiclesForAgency = (agencyId) => (new Promise((resolve) => {
  const requestId = `v${agencyId}${Date.now()}`;
  const onVehicles = (e) => {
    if (e.data.requestId === requestId) {
      oba.removeEventListener('message', onVehicles);
      resolve(e.data);
    }
  };
  oba.addEventListener('message', onVehicles);
  oba.postMessage({
    type: 'vehicles',
    requestId,
    agencyId,
  });
}));
