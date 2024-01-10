import { Fragment, useContext } from 'react';
import genresName from '../utils/getGenres';
import MoviePage from './MoviePage';
import { searchBarContext } from '../context/mycontext';

import style from '../styles/card.module.css';

const Card = () => {
  const { search, searchMethod, setCurrentPage, currentPage, setSearchMethod } =
    useContext(searchBarContext);
  const data = search;
  console.log(data);
  const type = searchMethod;
  // console.log(data);
  if (data && data.length > 0) {
    data.map((e) => {
      if (e.genre_ids) {
        const genre = genresName(e.genre_ids);
        e.genre_ids = genre;
      }
    });
  }
  const handleClick = (e) => {
    setCurrentPage(e.nativeEvent.srcElement.name);
    setSearchMethod('load');
  };
  console.log('rendering cards');
  return (
    <>
      {currentPage ? (
        <MoviePage />
      ) : (
        <div className={style.cards}>
          <div className={style.container}>
            {type === 'load' ? (
              <span className={style.searchTitle}>Most popular movies now</span>
            ) : (
              <span className={style.searchTitle}>Searching for {type}...</span>
            )}
            {data.length > 0
              ? data.map((e) => {
                  return (
                    <Fragment key={e.id}>
                      <div className={style.movieCard}>
                        <div className={style.teste}>
                          <img
                            className={style.img}
                            src={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                          ></img>
                          <button name={e.id} onClick={handleClick}>
                            See more
                          </button>
                        </div>
                        <div className={style.cardText}>
                          <span className={style.title}>
                            {e.original_title}
                          </span>
                          <div className={style.genreContainer}>
                            {e.genre_ids.map((i) => {
                              return (
                                <span className={style.genre} key={i.id}>
                                  {i.name}
                                </span>
                              );
                            })}
                          </div>
                          <div className={style.imdbDiv}>
                            <span className={style.votes}>
                              {e.vote_average.toFixed(1)}
                            </span>
                          </div>
                          <span>Year: {e.release_date.slice(0, 4)}</span>
                        </div>
                      </div>
                    </Fragment>
                  );
                })
              : ''}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
