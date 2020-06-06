import React, { FC, Fragment } from 'react';
import { useCustomTheme } from '../utils/useTheme';
import lightStyle from './light.module.scss';
import darkStyle from './dark.module.scss';

const MarkdownStyles: FC<any> = (props) => {
  const { isDark, dark, light, changeTheme } = useCustomTheme();
  const classes = isDark ? darkStyle : lightStyle;
  return (
    <Fragment>
      <div className={classes['markdown-body']}>{props.children}</div>
    </Fragment>
  );
};

export default MarkdownStyles;
