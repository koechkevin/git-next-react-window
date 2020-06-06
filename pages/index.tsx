import React, {FC, Fragment, useEffect} from 'react';
import { useRouter } from 'next/router';

const Home: FC<any> = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/koechkevin').then();
  });
  return <Fragment />;
};

export default Home;
