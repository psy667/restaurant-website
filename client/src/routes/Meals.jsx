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
    const renderItem = item => (
        <div className='meal_block' key={item._id}>
          <div className='image'><img src={item.photo || ''}/></div>
          <h3>{ item.name }</h3>
          <p>{ item.description }</p>
        </div>
    );

    const renderMeals = () => {
      const meals = this.state.data;
      return meals.map(item => renderItem(item));
    };

    return (
        <div className='meals-container'>
          { renderMeals() }
        </div>
    );
  }
}

export default Meals;
