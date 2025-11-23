import React, { useState, createContext, useContext } from 'react';

export const RouterContext = createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, element }) => {
  const { currentPath } = useContext(RouterContext);
  return currentPath === path ? element : null;
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};
