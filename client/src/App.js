import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

import Main from './routes/Main';
import Meals from './routes/Meals';
import Auth from './routes/admin/Auth';
import Admin from './routes/admin/Main';
import Reserve from './routes/Reserve';
import Contact from './routes/Contact';

class App extends React.Component {
  componentWillMount() {
    axios.interceptors.request.use((config) => {
      const token = window.localStorage.getItem('token');
      const headers = {
        'Content-type': 'application/json',
        'x-auth-token': token || '',
      };

      if (token != null) {
        return {
          ...config,
          headers,
        };
      }

      return config;
    }, err => Promise.reject(err));
  }


  render() {
    return (<div className="main-container">
      <Router>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className='nav-link' exact to="/">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/meals">
              Меню ресторана
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/reserve">
              Резервирование
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/contact">
              Контакты
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/admin">
              Панель управления
            </NavLink>
          </li>
        </ul>

        <Route path="/" exact component={Main}/>
        <Route path="/meals/" component={Meals}/>
        <Route path="/contact/" component={Contact}/>
        <Route path="/reserve/" component={Reserve}/>

        <Route path="/auth/" component={Auth}/>
        <Route path="/admin/" component={Admin}/>
      </Router>
    </div>);
  }
}

export default App;
