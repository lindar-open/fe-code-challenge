import React from 'react';
import './topHeadlines.css';

import type { Bias } from '@/lib/types';

import { Row } from '@/components/Row';
import TopHeadline from './_components/TopHeadline';

type Headline = {
  bias: Bias;
  headline: string;
};

const data: Headline[] = [
  {
    bias: 'POSITIVE',
    headline: 'RegionX: to the moon and beyond!'
  },
  {
    bias: 'NEGATIVE',
    headline: 'Investors are worried about Potato Inc?'
  },
  {
    bias: 'NEUTRAL',
    headline: 'The Tangerine: We are not sure what is going on...'
  },
  {
    bias: 'POSITIVE',
    headline: 'WoodAxe: self driving is the future!'
  }
];

export const TopHeadlines = () => {
  return (
    <Row spacing="md" className="topHeadlines">
      {data.map(({ headline, bias }) => {
        return <TopHeadline key={headline} bias={bias} headline={headline} />;
      })}
    </Row>
  );
};
