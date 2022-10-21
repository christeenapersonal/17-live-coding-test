import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import Streamer from './index';
import React from 'react';

import  {streamers}  from '../../constants/testData';
import { dataTestIds } from '../../constants/testIds';

test('renders streamer correctly', () => {
  const streamer = streamers[0];
  render(<Streamer {...streamer} index={0}/>);

   // Index
   const indexNameContainer = screen.getByTestId(
    `${dataTestIds.streamerComponent}-index`,
  );
  const index = within(indexNameContainer).getByText(1);

  expect(index).toBeInTheDocument();


  // Display Name
  const displayNameContainer = screen.getByTestId(
    `${dataTestIds.streamerComponent}-display-name`,
  );
  const displayName = within(displayNameContainer).getByText(streamer.displayName);

  expect(displayName).toBeInTheDocument();


    // Score
    const scoreContainer = screen.getByTestId(
        `${dataTestIds.streamerComponent}-scoreContainer`,
      );

      const point = within(scoreContainer).getByText('pt');
      expect(point).toBeInTheDocument()

    //   const scoreSubContainer = screen.getByTestId(
    //     `${dataTestIds.streamerComponent}-score`,
    //   );
    //   const score = within(scoreSubContainer).getByText(streamer.score)

    //   expect(score).toBeInTheDocument()
});
