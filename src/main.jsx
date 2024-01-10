import ReactDOM from 'react-dom/client';
import App from './App';

import { SearchBarProvider } from './context/mycontext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SearchBarProvider>
      <App />
    </SearchBarProvider>
  </>
);
