import React from 'react';
import Style from '../styles/search.module.css';
function SearchBar() {
  return (
    <>
      <div className={Style.teste}>
        <div className={Style.flex}>
          <div>
          <input
            className={Style.search}
            type="text"
            placeholder="Search the movie wanted to watch today"
            autoFocus
          ></input>
          <button className={Style.btn}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
