import React, { FC } from 'react';
import { createContext, useContext } from 'react';
import { Theme } from '@material-ui/core';

export const Context = createContext<any>(null);

interface ThemeOptions {
  changeTheme: (value: Partial<Theme>) => void;
  dark: Partial<Theme>;
  light: Partial<Theme>;
  isDark?: boolean;
}

export const useCustomTheme = (): ThemeOptions => {
  return useContext(Context) as ThemeOptions;
};

export const connectTheme = (Component: any): FC<any> => (props) => {
  const value = useCustomTheme();
  return <Component {...props} customTheme={value} />;
};

/*
  Function component
 const { isDark, dark, light, changeTheme } = useCustomTheme();
*/
/*
  Class component
 connectTheme(Component)
 then const { isDark, dark, light, changeTheme } = props.customTheme;
*/
