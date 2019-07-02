import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

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

    axios.post('/api/auth', {email, password}, {validateStatus: false}).then(response => {
      console.log(response);
      if (response.data.result !== 'error') {
        localStorage.setItem('token', response.data.token);
        this.setState({formMessage: 'Вы успешно авторизировались'});
        this.setState({loggedIn: true});
      } else {
        this.setState({formMessage: response.data.err})
      }
    }).catch(err => {
      console.log("error", err);
    });
  }

  handleInput = type => e => {
    const {value} = e.target;
    this.setState({[type]: value});
  }

  redirect = () => {
    return this.state.loggedIn
      ? (<Redirect to='/admin/Admin'/>)
      : null;
  }

  render() {
    return (<div className='container'>
      {this.redirect()}
      <div className='card col-6 offset-3 mt-5'>
        <form onSubmit={this.handleSubmit} className='my-4'>
          <div className="form-group">
            <label htmlFor="inputEmail">E-mail</label>
            <input onChange={this.handleInput('email')} type='email' value={this.state.email} className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Введите email"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Пароль</label>
            <input onChange={this.handleInput('password')} type='password' value={this.state.password} className="form-control" id="inputPassword" placeholder="Пароль"/>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">Войти</button>
        </form>
        {this.state.formMessage}
      </div>
    </div>);
  }
}

export default Auth;
