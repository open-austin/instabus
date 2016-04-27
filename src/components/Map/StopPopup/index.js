import styles from './styles.scss';

export default function stopPopup(name) {
  return `<div class='${styles.wrap}'><div class='${styles.popup}'><div class='${styles.arrowWrap}'><div class='${styles.arrow}'></div></div><div class='${styles.text}'>${name}</div></div>`;
}
