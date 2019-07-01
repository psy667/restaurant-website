import React, { Component } from 'react';
import Modal from '../../utils/Modal';
import axios from 'axios';

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      mealName: 'Пицца',
      mealPhoto: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      mealDescription: 'Пицца пепперони'
    };
  }

  handleAddNewMeal = () => {
    this.setState({ modalOpen: true });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const body = { name: this.state.mealName, imageURL: this.state.mealPhoto, description: this.state.mealDescription };
    axios({
      method: 'post',
      url: '/api/meals',
      data: body
    }).then(res => {
      console.log(res);
      this.setState({modalOpen: false, mealName: '', mealPhoto: '', mealDescription: ''});
      this.props.update();
    })
  }

  handleInput = type => (e) => {
    this.setState({[type]: e.target.value});
  }

  handleDeleteMeal = id => e => {
    axios.delete(`/api/meals/${id}`).then(r => console.log(r));
    this.props.update()
  }

  render() {
    const renderItem = item => (<div className="card m-3" style={{
      width: '18rem',
    }} key={item._id}>
      <img className="card-img-top" src={item.imageURL || 'https://img01.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/150525210126/150601174518/p_O.jpg'} alt=""/>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <button className="btn btn-primary">Редактировать</button>
        <button onClick={this.handleDeleteMeal(item._id)} className="btn btn-outline-danger ml-2">Удалить</button>
      </div>
    </div>);

    const renderMeals = () => {
      const meals = this.props.data;
      return <div className='container d-flex'>{meals.map(item => renderItem(item))}</div>;
    };

    const addNewMealForm = () => (<div>
      <form className='addNewMealForm d-flex flex-wrap' onSubmit={this.handleSubmit}>
        <div className='column col-6'>
          <div className="form-group">
            <label className='w-100'>Название блюда:
              <input onChange={this.handleInput('mealName')} value={this.state.mealName} type="text" className="form-control"/>
            </label>
          </div>
          <div className="form-group">
            <label className='w-100'>Ссылка на изображение:
              <input onChange={this.handleInput('mealPhoto')} value={this.state.mealPhoto} type="text" className="form-control"/>
            </label>
          </div>
        </div>
        <div className='column col-6'>
          <div className="form-group">
            <label className='w-100'>Краткое описание:<br/>
              <textarea onChange={this.handleInput('mealDescription')} value={this.state.mealDescription} className='w-100' style={{
                height: 125,
              }}></textarea>
            </label>
          </div>
        </div>
        <div className='column col-12'>
          <button type="submit" className="btn btn-primary col-12">Добавить</button>
        </div>
      </form>
    </div>);


    return (<div className='meals'>
      <button type="submit" className="btn btn-primary my-4" onClick={this.handleAddNewMeal}>Добавить новое блюдо</button>
      <h3 className='col-12 mt-5'>Список блюд:</h3>
      <Modal
          state={this.state.modalOpen}
          title="Добавление нового блюда в меню."
          body={addNewMealForm()}
          close={() => this.setState({ modalOpen: false })}
          action={() => console.log('hello world')}
      />
      {renderMeals()}
    </div>);
  }
}

export default Meals;
