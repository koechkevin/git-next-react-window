import { createContext, ReactNode, useContext, useEffect } from 'react';

export const SideBarContext = createContext<any>(null);

export const useSideBar = (val: ReactNode) => {
  const setSideBar = useContext(SideBarContext);
  useEffect(() => {
    setSideBar(val);
  }, []);
};
