import React from 'react';
import ReactDOM from 'react-dom/client';
import Background from './components/background';
import SearchBar from './components/searchBar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background />
    <SearchBar />
  </React.StrictMode>
);
