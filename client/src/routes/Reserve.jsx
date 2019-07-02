import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class Reserve extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      day: '',
      count_of_guests: 2,
      tel: '',
      email: ''
    };
  }

  handleInput = (type) => event => {
    this.setState({[type]: event.target.value})
  }

  handleInputDate = event => {
    this.setState({day: event})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      name: this.state.name,
      day: this.state.day,
      count_of_guests: this.state.count_of_guests,
      tel: this.state.tel,
      email: this.state.email
    };
    axios({method: 'post', url: '/api/reserves', data: body}).then(res => {
      console.log(res);
      this.setState({name: '', day: null, count_of_guests: null, tel: '', email: ''});

    })
  }


  // #	Имя	Дата	Количество гостей	Телефон	E-mail	Статус
  render() {
    return (<div className='container reserve'>
      <h1>Резервирование столика</h1>
      <form className='d-flex flex-wrap' onSubmit={this.handleSubmit}>
        <div className='column col-6 offset-3'>
          <div className="form-group">
            <label className='w-100'>Ваше имя
              <input onChange={this.handleInput('name')}
                value={this.state.name}
                type="text"
                className="form-control"
                required={true}/>
            </label>
          </div>
          <div className="form-group">
            <label className='w-100'>Дата
                <DatePicker
                  className='form-control'
                  style={{width: '100%'}}
                  selected={this.state.day}
                  onChange={this.handleInputDate}
                  showTimeSelect
                  dateFormat="Pp"
                />
            </label>
          </div>
          <div className="form-group">
            <label className='w-100'>Количество гостей
              <input
                onChange={this.handleInput('count_of_guests')}
                value={this.state.count_of_guests}
                type="number"
                min={2}
                className="form-control"/>
            </label>
          </div>
          <div className="form-group">
            <label className='w-100'>Номер телефона
              <input
                onChange={this.handleInput('tel')}
                value={this.state.tel}
                type="text"
                className="form-control"
                required={true}/>
            </label>
          </div>
          <div className="form-group">
            <label className='w-100'>E-mail
              <input
                onChange={this.handleInput('email')}
                value={this.state.email}
                type="email"
                className="form-control"/>
            </label>
          </div>
        </div>
        <div className='column col-6 offset-3'>
          <button type="submit" className="btn btn-primary col-12">Добавить</button>
        </div>
      </form>
    </div>);
  }
}

export default Reserve;
