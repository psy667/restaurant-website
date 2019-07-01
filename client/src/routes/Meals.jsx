import React, { Component } from 'react';
import axios from 'axios';

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get('/api/meals').then((response) => {
      const { data } = response;
      this.setState({ data });
    });
  }

  render() {
    const renderItem = item => (<div className="card m-3" style={{
      width: '30%',
    }} key={item._id}>
      <img className="card-img-top" src={item.imageURL || 'https://img01.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/150525210126/150601174518/p_O.jpg'} alt=""/>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
      </div>
    </div>);

    const renderMeals = () => {
      const meals = this.state.data;
      return <div className='container d-flex'>{meals.map(item => renderItem(item))}</div>;
    };

    return (
      <div className='meals container'>
        <h3 className='col-12 mt-5'>Список блюд:</h3>
        {renderMeals()}
      </div>);
  }
}

export default Meals;
