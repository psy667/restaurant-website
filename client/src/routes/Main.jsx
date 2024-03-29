import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div className='main-page-container'>
        <div className='main-page'>
          <h1>Restaurant Rossini</h1>
          <p>Glass-fronted restaurant with outdoor tables in chic arcade, for wood-fired pizze & pasta.</p>
          <Link to='/reserve' className='btn btn-reserve'>Зарезервировать столик</Link>
        </div>
      </div>
    );
  }
}

export default Main;
