import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useHeader } from '../utils/useHeader';
import { useSideBar } from '../utils/useSideBar';
import { DocsList } from './DocsList';
import MarkdownStyles from './StyledMarkdown';
import MarkDownViewer from 'react-markdown';

interface Props {
  docs: any[];
  header: string;
  data: string;
}
const Docs: FC<Props> = (props) => {
  const router = useRouter();
  const { docs, header } = props;

  const {
    query: { organisation, repo },
  } = router;
  useHeader(header);

  const list = docs.map((each: any) => {
    const displayName = each.name.split('.')[0];
    return { displayName, linkTo: `/${organisation}/${repo}/${displayName}` };
  });

  useSideBar(<DocsList list={list} />);

  return (
    <MarkdownStyles>
      <MarkDownViewer className="markdown" escapeHtml={false} source={props.data} />
    </MarkdownStyles>
  );
};

export default Docs;
