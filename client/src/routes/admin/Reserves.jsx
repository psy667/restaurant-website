import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'

class Reserves extends Component {
  handleChangeStatus = (id) => (e) => {
    // console.log(id, e.target.value);
    const status = e.target.value;
    axios.patch(`/api/reserves/${id}`, {status: status}).then((res) => {
      this.props.update();
    })
  }

  handleChangeDate = (id) => (date) => {
    axios.patch(`/api/reserves/${id}`, {day: date}).then((res) => {
      this.props.update();
    })
  }

  render() {
    const renderItem = (item, i) => (
      <tr key={item._id}>
        <th>{i + 1}</th>
        <td>{item.name}</td>
        <td><DatePicker
          className='form-control'
          style={{width: '100%'}}
          selected={new Date(item.day)}
          onChange={this.handleChangeDate(item._id)}
          showTimeSelect
          dateFormat="Pp"
        /></td>
        <td>{item.count_of_guests}</td>
        <td>{item.tel}</td>
        <td>{item.email}</td>
        <td>
          <select className="custom-select" style={{ marginTop: -6 }} value={item.status} onChange={this.handleChangeStatus(item._id)}>
            <option value="waiting">В ожидании</option>
            <option value="confirm">Подтверждено</option>
            <option value="reject">Отклонено</option>
          </select>

        </td>
      </tr>
    );

    const renderMeals = () => {
      const meals = this.props.data;

      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">Дата и время</th>
              <th scope="col">Количество</th>
              <th scope="col">Телефон</th>
              <th scope="col">E-mail</th>
              <th>
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            { meals.map((item, i) => renderItem(item, i)) }
          </tbody>
        </table>
      );
    };

    return (
      <div>
        { renderMeals() }
      </div>
    );
  }
}

export default Reserves;
