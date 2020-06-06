import React, { FC } from 'react';
import { Props } from './DocsList.interface';
import useStyles from './DocsList.styles';
import Link from 'next/link';

const DocsList: FC<Props> = (props) => {
  const { list } = props;
  const classes = useStyles();
  return (
    <div>
      {list.map((each, index) => {
        return (
          <Link key={index} href={each.linkTo}>
            <div className={classes.link}>{each.displayName}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default DocsList;
