import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Meals from './Meals';
import Reserves from './Reserves';
import axios from 'axios';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      mode: 'reserves',
      meals: [],
      reserves: []
    };
  }

  getData(type) {
    axios.get(`/api/${type}`, {validateStatus: false}).then((response) => {
      if (response.status === 401 || response.status === 400) {
        this.redirectToAuth();
        return null;
      }
      const {data} = response;
      this.setState({[type]: data});
    }).catch(err => {
      console.log('Ошибка при запросе:', err);
    });

  }

  redirectToAuth() {
    setTimeout(() => this.setState({loggedIn: false}), 100);
  }

  componentDidMount() {
    this.getData('reserves');
    this.getData('meals');
  }

  redirect() {
    return this.state.loggedIn
      ? (null)
      : <Redirect to="/auth"/>;
  }

  handleChangeMode = (mode) => (e) => {
    this.setState({mode});
  }

  render() {
    const cnToggleButton = (mode) => {
      return `btn btn-secondary ${this.state.mode === mode
        ? 'active'
        : ''}`;
    };

    return (<div className='admin container'>
      {this.redirect()}
      <h1>Панель управления</h1>

      <div className="btn-group btn-group-toggle">
        <label className={cnToggleButton('reserves')}>
          <input type="radio" name='mode' onChange={this.handleChangeMode('reserves')}/>
            Резервирования
          </label>
          <label className={cnToggleButton('meals')}>
            <input type="radio" name='mode' onChange={this.handleChangeMode('meals')}/>
            Меню ресторана
          </label>
        </div>

        {
          this.state.mode === 'reserves'
            ? <Reserves data={this.state.reserves} update={() => this.getData('reserves')}/>
            : null
        }
        {
          this.state.mode === 'meals'
            ? <Meals data={this.state.meals} update={() => this.getData('meals')}/>
            : null
        }
      </div>
      );
  }
}

export default Admin;
