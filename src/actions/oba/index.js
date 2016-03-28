import { setGlobalError } from 'actions/ui';

export function handleError(dispatch, err) {
  // FIXME: Send error to Sentry in production
  dispatch(setGlobalError(err.message));
  console.error(err);
  throw err;
}
