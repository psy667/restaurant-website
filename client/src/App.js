import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Main from './routes/Main';
import Meals from './routes/Meals';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Link to="/">Главная</Link>
        <Link to="/meals">Меню ресторана</Link>

        <Route path="/" exact component={Main} />
        <Route path="/meals/" component={Meals} />
      </Router>
    );
  }
}


export default App;
