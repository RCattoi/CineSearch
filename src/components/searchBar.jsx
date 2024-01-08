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
          Authorization: import.meta.env.API_KEY,
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
