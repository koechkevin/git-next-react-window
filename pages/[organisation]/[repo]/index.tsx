import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideProps } from '../../../src/utils/readFile';
import Docs from '../../../src/components/DocPage';

const Repo: FC<any> = (props) => {
  const router = useRouter();

  const { query: { organisation, repo } } = router;

  return <Docs {...props} header={`${organisation} / ${repo}`} />;
};

export default Repo;

export const getServerSideProps: GetStaticProps = serverSideProps;
