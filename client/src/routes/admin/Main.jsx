import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Meals from './Meals';
import Reserves from './Reserves';
import axios from 'axios';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      mode: 'reserves',
      meals: [],
      reserves: []
    };
  }

  getData(type){
    const headers = {
      'Content-type': 'application/json',
      'x-auth-token': window.localStorage.getItem('token') || '',
    };

    axios.get(`/api/${type}`, {headers})
      .then((response) => {
        console.log(2, response)
        const { data } = response;
        this.setState({ [type]: data });
      })

  }

  componentDidMount() {
    this.getData('reserves');
    this.getData('meals');

  }

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.setState({ loggedIn: true });
    }
  }

  redirect() {
    return this.state.loggedIn ? (
      null
    ) : <Redirect to="/auth"/>;
  }

  handleChangeMode = (mode) => (e) => {
    this.setState({mode})
  }

  render() {
    const cnToggleButton = (mode) => {
      return `btn btn-secondary ${this.state.mode === mode ? 'active' : ''}`
    }

    return (
      <div>
        { this.redirect() }
        <h1>Панель управления</h1>

        <div className="btn-group btn-group-toggle">
          <label className={cnToggleButton('reserves')}>
            <input type="radio" name='mode' onChange={this.handleChangeMode('reserves')}/ > Резервирования
          </label>
          <label className={cnToggleButton('meals')}>
            <input type="radio" name='mode' onChange={this.handleChangeMode('meals')}/> Меню ресторана
          </label>
        </div>

        { this.state.mode === 'reserves' ? <Reserves data={this.state.reserves}/> : null }
        { this.state.mode === 'meals' ? <Meals data={this.state.meals}/> : null }
      </div>
    );
  }
}

export default Admin;
