import { GetStaticProps } from 'next';
import { secs } from '../sec';
import { getDocs } from '../getDocs';

export const serverSideProps: GetStaticProps = async (req: any) => {
  const { default: xmlRequest } = await import('axios');
  const { default: atob } = await import('atob');
  const {
    params: { organisation, repo, file },
  } = req;
  const response = await xmlRequest.get(
    `https://api.github.com/repos/${organisation}/${repo}/${file ? 'contents/docs/' + file + '.md' : 'readme'}`,
    {
      params: { ...secs },
    },
  );
  const docs = await getDocs({ organisation, repo });
  if (response.data) {
    const data = atob(response.data.content);
    return {
      props: {
        file: response.data,
        data,
        docs,
      },
    };
  }
  return {
    props: {
      file: {},
      data: ``,
      docs,
    },
  };
};
