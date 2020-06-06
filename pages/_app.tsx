import React, { FC, useState, useEffect, useReducer, ReactNode } from 'react';
import Head from 'next/head';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Box, Paper, SwipeableDrawer } from '@material-ui/core';
import { Context } from '../src/utils/useTheme';
import styles from '../src/styles.module.scss';
import '../src/components/markdown.module.scss';
import Header from '../src/components/Header/Header';
import { useMedia } from 'react-use';
import { createStyles, makeStyles } from '@material-ui/styles';
import { HeadContext } from '../src/utils/useHeader';
import { SideBarContext } from '../src/utils/useSideBar';

const useStyles = makeStyles(() =>
  createStyles({
    sider: {
      minHeight: '100vh',
      height: '100vh',
      overflow: 'auto',
      top: 0,
      borderRadius: 0,
      position: 'sticky',
    },
  }),
);

const MyApp: FC<{
  Component: FC<any>;
  pageProps: object;
}> = (props) => {
  const { Component, pageProps } = props;

  const classes = useStyles();

  const [userTheme, setTheme] = useState<Partial<Theme> | any>(theme.dark);
  const [title, setTitle] = useState<string>('Docs');

  const [sideBar, dispatch] = useReducer((state: any, action: any) => {
    if (action.type === 'update') {
      return action.payload;
    }
    return state;
  }, null);

  useEffect(() => {
    const initialValue = JSON.parse(localStorage['theme'] || '{}');
    setTheme(() => ({ ...theme.light, ...initialValue }));
  }, []);

  const changeTheme = (val: any) => {
    setTheme(val);
    localStorage.setItem('theme', JSON.stringify(val));
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side') as HTMLDivElement;
    // @ts-ignore
    jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isTouchable = useMedia('(max-width: 768px)');

  return (
    <HeadContext.Provider value={setTitle}>
      <SideBarContext.Provider value={(payload: ReactNode) => dispatch({ type: 'update', payload })}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Context.Provider value={{ ...theme, changeTheme, isDark: userTheme.palette.background.paper === '#001629' }}>
          <ThemeProvider theme={createMuiTheme(userTheme)}>
            <CssBaseline>
              <Paper
                className={styles.body}
                style={{ width: '100vw', height: '100vh', overflow: 'scroll', borderRadius: 0 }}
              >
                {isTouchable && (
                  <SwipeableDrawer
                    anchor="left"
                    onClose={() => setDrawerOpen(false)}
                    onOpen={() => setDrawerOpen(true)}
                    open={drawerOpen}
                  >
                    <Box style={{ width: 268 }}>
                      <Box style={{ height: 64 }} />
                      {sideBar}
                    </Box>
                  </SwipeableDrawer>
                )}
                <Box
                  style={{
                    display: 'flex',
                    position: 'relative',
                    maxWidth: '100vw',
                    flex: 1,
                    boxSizing: 'border-box',
                  }}
                >
                  <Box style={{ maxWidth: '100vw', boxSizing: 'border-box' }}>
                    {!isTouchable && (
                      <Paper elevation={2} className={classes.sider}>
                        <Box style={{ width: 268 }}>
                          <Box style={{ height: 64 }} />
                          {sideBar}
                        </Box>
                      </Paper>
                    )}
                  </Box>
                  <div
                    style={{
                      maxWidth: 768,
                      margin: '0 auto',
                      marginTop: 48,
                      width: '100%',
                      padding: 16,
                      boxSizing: 'border-box',
                    }}
                  >
                    <Component {...pageProps} />
                  </div>
                </Box>
              </Paper>
              <Header title={title} hideMenu={!isTouchable} onClickMenu={() => setDrawerOpen((val) => !val)} />
            </CssBaseline>
          </ThemeProvider>
        </Context.Provider>
      </SideBarContext.Provider>
    </HeadContext.Provider>
  );
};

export default MyApp;
