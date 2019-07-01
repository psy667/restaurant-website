import React, { Component } from 'react';

class Reserves extends Component {
  render() {
    const renderItem = (item, i) => (
      <tr key={item._id}>
        <th>{i + 1}</th>
        <td>{item.name}</td>
        <td>{item.day}</td>
        <td>{item.count_of_guests}</td>
        <td>{item.tel}</td>
        <td>{item.email}</td>
        <td>
          <select className="custom-select" style={{ marginTop: -6 }}>
            <option value="1" defaultValue>В ожидании</option>
            <option value="1">Подтверждено</option>
            <option value="2">Отклонено</option>
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
              <th scope="col">Дата</th>
              <th scope="col">Количество гостей</th>
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
