import style from '../styles/background.module.css';

function Background(prop) {
  return (
    <>
      <img src={prop.prop} className={style.background}></img>
    </>
  );
}

export default Background;
