import React, { FC } from 'react';
import { Props } from './Header.interface';
import useStyles from './Header.styles';
import { Menu } from '@material-ui/icons';
import { AppBar, IconButton, Paper, Toolbar, Switch, Box } from '@material-ui/core';
import { useCustomTheme } from '../../utils/useTheme';

const Header: FC<Props> = (props) => {
  const { onClickMenu, hideMenu, title } = props;
  const { isDark, dark, light, changeTheme } = useCustomTheme();
  const classes = useStyles();
  return (
    <AppBar>
      <Paper style={{ borderRadius: 0 }}>
        <Toolbar>
          {!hideMenu && <IconButton onClick={onClickMenu} edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>}
          <Box className={classes.content}>{title}</Box>
          <label htmlFor="app-theme">Light</label>
          <Switch
            id="app-theme"
            edge="end"
            onChange={() => changeTheme(isDark ? light : dark)}
            checked={isDark}
            color="primary"
          />
          <label htmlFor="app-theme">{'  '}Dark</label>
        </Toolbar>
      </Paper>
    </AppBar>
  );
};

export default Header;
