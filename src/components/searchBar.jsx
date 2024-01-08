import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Card from '../components/card';
import Style from '../styles/search.module.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [searchMethod, setSearchMethod] = useState('load');

  const { request } = useFetch();

  useEffect(() => {
    const callBack = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGU4NGYwYWVkYmVhZGQyMjRkNGU2ZGE1ZDVhNzAzNiIsInN1YiI6IjY1OGMyMTZiYjY4NmI5MjA0ZWRlNTlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6XIc8wLH8Xp6Lp_3gC9V8oElHWgusJFJciEpfjZCH2g',
        },
      };
      const fetchData = await request(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
      );
      setSearch(fetchData.json.results.slice(0, 12));
    };
    callBack();
  }, [request]);
  return (
    <>
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
      <Card data={search} type={searchMethod} />
    </>
  );
};

export default SearchBar;
