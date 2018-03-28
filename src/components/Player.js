import { Hand } from './';
import React from 'react';

const Player = ({ name, cards, flag }) => (
    <div>
      <h4>{name}</h4>
      <Hand cards={cards} player={flag}/>
    </div>
)


export default Player
