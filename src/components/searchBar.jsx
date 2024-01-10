import { useEffect, useState, useContext, useCallback } from 'react';
import { searchBarContext } from '../context/mycontext';
import useFetch from '../hooks/useFetch';
import Card from '../components/card';
import Style from '../styles/search.module.css';

const SearchBar = () => {
  // const [search, setSearch] = useState('');
  // const [searchMethod, setSearchMethod] = useState('load');
  const [searchTerm, setSearchTerm] = useState();
  const { request } = useFetch();

  const { setSearch, setSearchMethod } =
    useContext(searchBarContext);

  const fetch = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };
    const fetchData = await request(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      options
    );
    console.log('Fetching data...');
    setSearch(fetchData.json.results.slice(0, 12));
  }, [request, setSearch]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  // console.log(search);
  const callback = async (e) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };
    e.preventDefault();
    const resp = await request(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    );
    setSearch(resp.json.results);
    setSearchMethod(searchTerm);

  };

  return (
    <>
      <div className={Style.flex}>
        <form onSubmit={callback}>
          <input
            className={Style.search}
            type="text"
            placeholder="Search the movie wanted to watch today"
            autoFocus
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button formAction="submit" className={Style.btn}>
            Search
          </button>
        </form>
      </div>
      <Card />
    </>
  );
};

export default SearchBar;
