import React from 'react';
import { connect } from 'react-redux'
import '../../css/cards.css';

let CardSimple = ({ rank, suit, cardVisibility, player, id, pickCards }) => {

  let card = cardVisibility ? `card rank-${rank.toLowerCase()} ${suit}`: `card back`;

  if(player){
    card = `card rank-${rank.toLowerCase()} ${suit}`
  }

  const pick = () => {
    pickCards(id);
  }

  return(
    <div onClick={pick} className={card}>
      <span className="rank">{rank}</span>
      <span className="suit" dangerouslySetInnerHTML={{__html: `&${suit};` }} />
    </div>);
};

let Card = (props) => {
  
  const card = <CardSimple {...props} />;
  return props.pick ? <strong>{card}</strong> : card;

};

function mapStateToProps({ cardVisibility }){
  return {
    cardVisibility,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pickCards : (id) => {
      dispatch({ type:'PICK_CARDS', id });
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Card);
