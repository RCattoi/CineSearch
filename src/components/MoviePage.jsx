import useFetch from '../hooks/useFetch';
import { useEffect, useState, useCallback, useContext } from 'react';
import Background from './background';
import { searchBarContext } from '../context/mycontext';
import style from '../styles/moviepage.module.css';

const MoviePage = () => {
  const [movieData, setMovieData] = useState();
  const [streamingAvaliable, setStreamingAvaliable] = useState();
  const [imdbID, setidmbID] = useState();
  const { request } = useFetch();

  const { search, searchMethod, setCurrentPage, currentPage } =
    useContext(searchBarContext);

  const fetchData = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };
    const resp = await request(
      `https://api.themoviedb.org/3/movie/${currentPage}?language=en-US`,
      options
    );
    setMovieData(resp.json);
  }, [currentPage, request]);

  useEffect(() => {
    fetchData();
    // console.log('fez request');
  }, [fetchData]);

  useEffect(() => {
    const optionsStreaming = async () => {
      if (movieData && movieData.imdb_id !== imdbID) {
        const optionsStreaming = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_STREAMING,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          },
        };
        const stream = await request(
          `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${movieData.imdb_id}`,
          optionsStreaming
        );

        const services = [
          'apple',
          'hbo',
          'mubi',
          'netflix',
          'peacock',
          'prime',
          'hulu',
          'disney',
        ];
  
        if (stream.json.result.streamingInfo.us) {
          const streaming = stream.json.result.streamingInfo.us.filter((e) => {
            return services.includes(e.service);
          });
          setStreamingAvaliable(streaming);
          setidmbID(movieData.imdb_id);
        }
      }
    };

    optionsStreaming();
  }, [request, imdbID, movieData]);

  useEffect(() => {
    if (
      searchMethod !== 'load' &&
      currentPage !== null
    ) {
      setMovieData(null);
      setCurrentPage(null);
    }
  }, [search, currentPage, setCurrentPage, searchMethod]);

  return (
    <>
      {movieData ? (
        <>
          <Background
            prop={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          />
          <div className={style.movieData}>
            <div className={style.posterContainer}>
              <img
                src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                alt=""
              />
            </div>
            <div className={style.movieData__Details}>
              <h1>{movieData.title}</h1>
              <div className={style.container_tag}>
                <div className={style.votes}>
                  {movieData.vote_average.toFixed(1)}
                </div>
                <div className={style.vote_count}>{movieData.vote_count}</div>
                <span className={style.movie_runtime}>
                  {movieData.runtime} Min.
                </span>
                <span className={style.movie_bugdet}>
                  {movieData.budget > 0
                    ? `$${(movieData.budget / 1000000).toFixed(0)}M`
                    : `-`}
                </span>
                <span className={style.movie_revenue}>
                  {movieData.revenue > 0
                    ? `$${(movieData.revenue / 1000000).toFixed(0)}M`
                    : `-`}
                </span>
              </div>
              <span className={style.movie_overview}>
                <h3>Overview</h3>
                {movieData.overview}
              </span>
              <div className={style.genreContainer}>
                {movieData.genres.map((e) => {
                  return (
                    <span key={e.id} className={style.movie_genres}>
                      {e.name}
                    </span>
                  );
                })}
              </div>
              {streamingAvaliable ? (
                <>
                  <div className={style.streamingAvaliable}>
                    <h3 className={style.streaming__title}>Avaliable at:</h3>
                    {streamingAvaliable.map((e) => {
                      return (
                        <>
                          <div className={style.individualStreaming}>
                            <img
                              src={`src/assets/streaming_logo/${e.service}.svg`}
                            ></img>
                            <span>{e.streamingType}</span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className={style.streamingAvaliable}>
                    <h3 className={style.streaming__title}>Avaliable at:</h3>
                    <h3 className={style.streaming__title}>
                      Not avaliable in any streaming.
                    </h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
  // }
};

export default MoviePage;
