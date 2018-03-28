import React from 'react';
import { Player } from './'
import { connect } from 'react-redux'
import { socket }  from '../reducers'


const Table = ({ playerHand, visibility, style, evaluate, dealNextHand, dispatch }) => {

  const player = (num) =>{
    return playerHand[num];
  }

  const winner = () => {
    return player(0).score > player(1).score
           ? player(0).name : player(1).name
  }

  socket.on('NEW_CARDS',(player) => {
    dispatch({type:'DEAL_CARDS', player})
    dispatch({type:'VISIBLE_TABLE'})
  })

  
  socket.on('CARDS_EXCHANGED',(hand) => {
    dispatch({type:'EXCHANGE_CARDS',hand})
  })

  return (
    <div style={style}>
      <Player name={player(0).name} cards={player(0).cards} flag={true} />

      <Player name={player(1).name} cards={player(1).cards} flag={false} />

      <button style={{opacity:visibility.evaluate}} disabled={visibility.isDisabled} id="Evaluate" className="btn btn-default"
        onClick={() => evaluate(playerHand)}>Evaluate
      </button>

      <div style={{opacity:visibility.score}}>
        winner: {winner()}<br/>
        {player(0).name}: {player(0).combination}<br/>
        {player(1).name}: {player(1).combination}
      </div>

      <br/>

      <button style={{opacity:visibility.dealNext}} className="btn btn-default"
        onClick={dealNextHand}>Deal next hand
      </button>
    </div>);
};

function mapStateToProps({ playerHand, visibility }) {
  return {
    playerHand,
    visibility
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    evaluate : (playerHand) => {
      socket.emit('EXCHANGE_CARDS',playerHand)

      //giati to socket mesa sto component vgazei to default state?
      socket.on('EXCHANGE_CARDS_OPPONENT',(clientCards) => {
        let hand = clientCards.filter(hand => hand.name != playerHand[0].name)[0]
        dispatch({type:'EXCHANGE_CARDS_OPPONENT',hand})
        dispatch({type:'FRONT'})
        dispatch({type:'VISIBLE_SCORE'})
        dispatch({type:'INVISIBLE_EVALUATE'})
        dispatch({type:'VISIBLE_DEAL_NEXT'})
        dispatch({type:'INVISIBLE_DEAL'})
        dispatch({type:'DISABLE_EVALUATE'})
      })
    },

    dealNextHand : () => {
      dispatch({type:'BACK'});
      dispatch({type:'INVISIBLE_SCORE'})
      dispatch({type:'INVISIBLE_DEAL_NEXT'})
      dispatch({type:'VISIBLE_EVALUATE'})
      dispatch({type:'ENABLE_EVALUATE'})
      socket.emit('DEAL_CARDS')

    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
