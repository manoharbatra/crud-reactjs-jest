import React, { useState, useEffect } from 'react';

import Login from '../Login/Login';
import Dashboard from '../Dashboard';

import { IS_AUTHENTICATED } from '../../utils/Constants';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem(IS_AUTHENTICATED)));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
