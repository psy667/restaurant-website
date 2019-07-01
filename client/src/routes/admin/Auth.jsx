import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      formMessage: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;

    axios.post('/api/auth', {email, password}).then(response => {
      console.log(response);
      if(response.data.result !== 'error'){
        localStorage.setItem('token', response.data.token);
        this.setState({formMessage: 'Вы успешно авторизировались'});
        this.setState({loggedIn: true});
      }
    })
    .catch(err => {
      console.log("error", err);
    });
  }

  handleInput = type => e => {
    const { value } = e.target;
    this.setState({[type]: value});
  }

  redirect = () => {
    return this.state.loggedIn ? (
      <Redirect to='/admin/Admin'/>
    ) : null;
  }

  render() {
    return (
      <div>

        { this.redirect() }
        <form onSubmit={this.handleSubmit}>
          <label>
            Логин:
            <input onChange={this.handleInput('email')} type='text' value={this.state.email}></input>
          </label>
          <label>
            Пароль:
            <input onChange={this.handleInput('password')} type='password' value={this.state.password}></input>
          </label>
          <button type='submit'>Войти</button>
        </form>
        { this.state.formMessage }
      </div>
    );
  }
}

export default Auth;
