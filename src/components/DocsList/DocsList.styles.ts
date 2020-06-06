import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    link: {
      height: 32,
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
  }),
);
