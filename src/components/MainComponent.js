import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const { comments, dishes, leaders, promotions, selectedDish } = this.props

    const HomePage = () => {
      return (
        <Home
          dish={dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={dishes.isLoading}
          dishesErrorMessage={dishes.errorMessage}
          promotion={promotions.filter((promo) => promo.featured)[0]}
          leader={leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={dishes.isLoading}
          errorMessage={dishes.errorMessage}
          comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          addComment={this.props.addComment}
        />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/about-us" component={() => <About leaders={leaders} />} />
          <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contact-us" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
