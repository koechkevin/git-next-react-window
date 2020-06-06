import React, { ChangeEvent, FC, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { Box, CircularProgress, createStyles, TextField, Theme } from '@material-ui/core';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { AxiosResponse } from 'axios';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import { useHeader } from '../../src/utils/useHeader';
import { secs } from '../../src/sec';

interface Props {
  data: any[];
  pagination: {
    isNext: boolean;
    page: number;
  };
}

const fetch = async (params: any) => {
  const { default: xmlRequest } = await import('axios');
  const { organisation, ...restParams } = params;
  const par = {
    ...restParams,
    ...secs,
  };

  const response = (res: AxiosResponse) => {
    return {
      data: res.data,
      pagination: {
        page: par.page || 1,
        isNext: res.data.length === (par.per_page || 30),
      },
    };
  };
  return await xmlRequest
    .get(`https://api.github.com/orgs/${organisation}/repos`, { params: par })
    .then(response)
    .catch((error) => {
      if (error?.response?.status === 404) {
        return xmlRequest
          .get(`https://api.github.com/users/${organisation}/repos`, { params: par })
          .then(response)
          .catch((error) => Promise.reject(error));
      }
      return Promise.reject(error.message);
    });
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    repo: {
      border: `1px solid ${theme.palette.grey['400']}`,
      height: 48,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const Organization: FC<Props> = (props) => {
  const { data, pagination: pag } = props;
  const [lst, setList] = useState<any[]>(() => data || []);
  const [search, setSearch] = useState('');
  const list = lst.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const [pagination, setPagination] = useState(
    () =>
      pag || {
        page: 1,
        isNext: true,
      },
  );
  const router = useRouter();

  const {
    query: { organisation },
  } = router;

  useHeader(organisation as string);

  const fetcher = async () => {
    const { data, pagination: newPage } = await fetch({ organisation, page: pagination.page + 1, per_page: 10 });
    setPagination(newPage);
    setList((v) => [...v, ...data]);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Box style={{ marginTop: 32 }}>
        <TextField
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setSearch(e.target.value);
          }}
          size="small"
          style={{ width: '100%', marginBottom: 16 }}
          placeholder="search"
          variant="outlined"
        />
        <InfiniteLoader
          isItemLoaded={(index) => index < list.length}
          itemCount={pagination?.isNext ? list.length + 1 : list.length}
          loadMoreItems={() => fetcher()}
          threshold={8}
        >
          {({ onItemsRendered, ref }) => (
            <List
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemCount={pagination?.isNext ? list.length + 1 : list.length}
              height={800}
              itemSize={() => 48}
              width={'100%'}
            >
              {({ index, style }): JSX.Element => {
                const each = list[index];
                return (
                  <div className={classes.repo} style={style}>
                    {each && (
                      <Link href={`/${organisation}/${each.name}`}>
                        <span style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{each.name}</span>
                      </Link>
                    )}
                    {!each && (
                      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                        <CircularProgress size={24} />
                      </div>
                    )}
                  </div>
                );
              }}
            </List>
          )}
        </InfiniteLoader>
      </Box>
    </Fragment>
  );
};

export const getStaticPaths = async () => ({
  paths: [
    { params: { organisation: 'koechkevin', per_page: 10, page: 1 } },
    { params: { organisation: 'facebook', per_page: 10, page: 1 } },
  ],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (req: any) => {
  try {
    const res = await fetch({ ...req.params, per_page: 10, page: 1 });
    return {
      props: { ...res },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        pagination: {
          page: 1,
          isNext: false,
        },
      },
    };
  }
};

export default Organization;
