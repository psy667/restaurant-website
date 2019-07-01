import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='contact container'>
        <h1 className='mb-4'>Контакты</h1>

        <table className="table my-3">
          <tbody>
            <tr>
              <th scope="row">Адрес:</th>
              <td>ул. 20-летия Октября 90к</td>
            </tr>
            <tr>
              <th scope="row">Телефон:</th>
              <td><a href='tel:+7-900-800-40-30'>+7-900-800-40-30</a></td>
            </tr>
            <tr>
              <th scope="row">E-mail:</th>
              <td><a href='mailto:admin@rossini-restaurant.com'>admin@rossini-restaurant.com</a></td>
            </tr>
            <tr>
              <th scope="row">Время работы:</th>
              <td>Пн-Чт: 10:00 - 22:00<br/>
                  Пт-Вс: 10:00 - 24:00</td>
            </tr>
          </tbody>
        </table>
        <YMaps>
          <Map width='100%' height='400px' defaultState={{ center: [51.6548, 39.1895], zoom: 16 }}>
            <Placemark geometry={[51.6548, 39.1895]} properties={{ IconContent: 'Restaurant Rossini' }}/>
          </Map>
        </YMaps>
        <img className="img-fluid my-4" alt="Вход в ресторан" src='https://iitsstella.files.wordpress.com/2015/08/imag3780.jpg'/>
        <img className="img-fluid mb-5" alt="Интерьер" src='https://samuivillaretreat.com/blog/wp-content/uploads/2017/09/prego-samui.jpg'/>
      </div>
    );
  }
}

export default Contact;
