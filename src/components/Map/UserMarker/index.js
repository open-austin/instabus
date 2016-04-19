import styles from './styles.scss';

const html = `<div class="${styles.pulse}"></div><div class="${styles.dot}"></div>`;

const UserMarker = {
  className: styles.user,
  iconSize: [24, 24],
  html,
};
export default UserMarker;
