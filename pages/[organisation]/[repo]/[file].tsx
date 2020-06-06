import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideProps } from '../../../src/utils/readFile';
import Docs from '../../../src/components/DocPage';

const Doc: FC<any> = (props) => {
  const router = useRouter();

  const {
    query: { file },
  } = router;

  return <Docs {...props} header={`${file}`} />;
};

export default Doc;

export const getServerSideProps: GetStaticProps = serverSideProps;
