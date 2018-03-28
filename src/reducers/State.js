import { Player } from '../behavior/Poker'
import { Deck } from '../behavior/Poker'
import { default_player } from '../behavior/Poker'



const pickCard = (state,id) =>{
  let cards = state[0].cards.slice();

  cards = cards.map((card) => {
    if(id == card.id){
      card.pick = !card.pick;
    }
    return card;
  });

  return cards;
}

const playerHand = (state = [default_player(),default_player()], action) => {

  if(action.type == 'PICK_CARDS'){
    let cards = pickCard(state,action.id)
    return [ {...state[0], cards}, state[1] ];
  }

  if(action.type == 'EXCHANGE_CARDS'){
    let { cards, combination, score } = action.hand
    return [ {...state[0], cards, combination, score}, state[1] ];
  }

  if(action.type == 'EXCHANGE_CARDS_OPPONENT'){
    let { cards, combination, score } = action.hand
    return [ state[0], {...state[1], cards, combination, score} ];
  }

  if(action.type == 'DEAL_CARDS'){
    return [ action.player, default_player('random player') ]
  }

  return state
  
}

const cardVisibility = (state = false, action) => {
  switch (action.type) {
    case 'FRONT':
      return true;

    case 'BACK':
      return false;

    default:
      return state;
  }
}

const visibility = (state = { table:0, deal:0, score:0, evaluate:1, dealNext:0, isDisabled:false } ,action) => {

  switch (action.type) {
    case 'VISIBLE_TABLE':
      return {...state,table:1};

    case 'INVISIBLE_TABLE':
      return {...state,table:0};

    case 'VISIBLE_DEAL':
      return {...state,deal:1};

    case 'INVISIBLE_DEAL':
      return {...state,deal:0};

    case 'VISIBLE_DEAL_NEXT':
      return {...state,dealNext:1};

    case 'INVISIBLE_DEAL_NEXT':
      return {...state,dealNext:0};

    case 'VISIBLE_SCORE':
      return {...state,score:1};

    case 'INVISIBLE_SCORE':
      return {...state,score:0};

    case 'VISIBLE_EVALUATE':
      return {...state,evaluate:1};

    case 'INVISIBLE_EVALUATE':
      return {...state,evaluate:0};

    case 'DISABLE_EVALUATE':
      return {...state,isDisabled:true};

    case 'ENABLE_EVALUATE':
      return {...state,isDisabled:false};

    default:
      return state;

  }
}


export {
  cardVisibility,
  playerHand,
  visibility,
}
