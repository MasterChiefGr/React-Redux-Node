import React from 'react';
import { Card } from './';

let key = 0;

const Hand = ({ cards , player }) => (
  <div className="playingCards simpleCards">
    {cards.map(({rank, suit, pick ,id}) => (
      <Card rank={rank} suit={suit} key={`Hand-Id-${key++}`} player={player} pick={pick} id={id}/>
    ))}
  </div>
);

export default Hand;
