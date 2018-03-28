import React from 'react';
import { connect } from 'react-redux'

const Menu = ({ makeDealVisible }) => (
  <div>
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div>
                <a className="navbar-brand page-scroll">Poker Planet</a>
            </div>
            <div>
                <ul className="nav navbar-nav">
                    <li>
                        <a><button onClick={makeDealVisible}
                            id="startGame" className="button">Start Game</button>
                        </a>
                    </li>
                    <li>
                        <a><button className="button">Login</button></a>
                    </li>
                    <li>
                        <a><button className="button">Sign up</button></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
);

function mapDispatchToProps(dispatch) {
  return {
    makeDealVisible : () => {
      dispatch({type:'VISIBLE_DEAL'});
    }
  };
};

function mapStateToProps({ visibility }){
  return {
    visibility
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);
