import React from 'react';
import { connect } from 'react-redux'
import { socket }  from '../reducers'

const Deal = ({ style, makeTableVisible }) => (
  <div>
    <button id="deal" className="btn btn-default"
      style={style} onClick={makeTableVisible}>
      Deal
    </button>
  </div>
);

function mapDispatchToProps(dispatch) {
  return {
    makeTableVisible : () => {
      socket.emit('DEAL_CARDS')
      
      socket.on('NEW_CARDS',(player) => {
        dispatch({type:'DEAL_CARDS', player});
        dispatch({type:'VISIBLE_TABLE'});
      })
      
    }
  };
};



export default connect(null,mapDispatchToProps)(Deal);
