import style from '../styles/background.module.css';

function Background(prop) {
  let bg = '../assets/background.jpg';
  if (prop.prop) {
    bg = prop.prop;
  }
  return (
    <>
      <img src={bg} className={style.background}></img>
    </>
  );
}

export default Background;
