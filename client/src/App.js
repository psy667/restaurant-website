import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Main from './routes/Main';
import Meals from './routes/Meals';
import Auth from './routes/admin/Auth';
import Admin from './routes/admin/Main';
import css from './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>

          <ul className="nav">
            <li className="nav-item">
              <Link className='nav-link' to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/meals">Меню ресторана</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/admin">Панель управления</Link>
            </li>
          </ul>

          <Route path="/" exact component={Main} />
          <Route path="/meals/" component={Meals} />
          <Route path="/auth/" component={Auth} />
          <Route path="/admin/" component={Admin} />

        </Router>


      </div>
    );
  }
}


export default App;
