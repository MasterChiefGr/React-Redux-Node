import { combineReducers, createStore } from 'redux';
import { playerHand, cardVisibility, visibility } from './State';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3005');

const reducers = combineReducers({ cardVisibility, playerHand, visibility });

const store = createStore(reducers);

export {
  store,
  socket
};
