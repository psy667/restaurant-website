import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className='main-page-container'>
        <div className='main-page'>
          <h1>Restaurant Rossini</h1>
          <p>Glass-fronted restaurant with outdoor tables in chic arcade, for wood-fired pizze & pasta.</p>
          <button className='btn'>Зарезервировать столик</button>
        </div>
      </div>
    );
  }
}

export default Main;
