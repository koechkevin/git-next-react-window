import { createContext, useContext, useEffect } from 'react';

export const HeadContext = createContext<(value: string) => void>(() => {});

export const useHeader = (val: string) => {
  const setHeader = useContext(HeadContext);
  useEffect(() => {
    setHeader(val);
  }, []);
};
