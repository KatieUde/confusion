import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId
    });
  }

  render() {
    const { dishes, selectedDish } = this.state

    return (
      <div>
        <Header />
        <Menu
          dishes={dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;
