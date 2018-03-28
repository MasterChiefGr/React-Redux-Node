import React from 'react';
import { connect } from 'react-redux'
import { Menu, Table, Deal } from './';
import '../css/App.css';

const App = ({ visibility: { deal, table } }) => (
  <div className="App" id="body">
    <Menu />
    <div className="about-section">
      <Deal style={{opacity:deal}}/>
      <Table style={{opacity:table}}/>
    </div>
  </div>
);

const mapStateToProps = ({ visibility }) => ({
  visibility,
});


export default connect(mapStateToProps)(App);
