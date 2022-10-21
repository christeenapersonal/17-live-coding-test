import { Streamer as StreamerType } from 'Streamer-Types';
import React from 'react';

import styled from 'styled-components';
import { dataTestIds } from '../../constants/testIds';
import { useSpring, animated } from 'react-spring';

const SubContainer = styled.div`
width: 320px;
height: 48px;
display:flex;
align-items:center;`;

const Img = styled.img`
width: 36px;
height: 36px;
border-radius: 18px;
border: 2px solid rgb(255, 255, 255);
`;

const Index = styled.div`
width: 24px;
text-align: center;`;

const Score = styled.div`
-moz-box-flex: 1;
flex-grow: 1;
text-align: right;
`;

type Props = {
  index: number;
} & StreamerType;

const Streamer = (props: Props) => {
  const {
    displayName,
    picture,
    userID,
    score,
    index
  } = props;

  const number = useSpring({ val: score, from: { val: 0 }});


  return (
    <SubContainer data-key={userID} data-testid={`${dataTestIds.streamerComponent}-streamerInfoContainer`}
    >
      <Index data-testid={`${dataTestIds.streamerComponent}-index`}
      >{index + 1}</Index>
      <Img src={picture} alt="dp" />
      <div data-testid={`${dataTestIds.streamerComponent}-display-name`}>{displayName}</div>

      <Score data-testid={`${dataTestIds.streamerComponent}-scoreContainer`}>
        <animated.span className="number" data-testid={`${dataTestIds.streamerComponent}-score`}>{number.val.to(x=>x.toFixed(0))}</animated.span>pt</Score>

    </SubContainer>
  );
};

export default Streamer;
