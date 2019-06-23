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
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const { comments, dishes, leaders, promotions, resetFeedbackForm, postComment, postFeedback } = this.props

    const HomePage = () => {
      return (
        <Home
          dish={dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={dishes.isLoading}
          dishesErrorMessage={dishes.errorMessage}
          promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={promotions.isLoading}
          promosErrorMessage={promotions.errorMessage}
          leader={leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={leaders.isLoading}
          leadersErrorMessage={leaders.errorMessage}
        />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={dishes.isLoading}
          errorMessage={dishes.errorMessage}
          comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrorMessage={comments.errorMessage}
          postComment={postComment}
        />
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/about-us" component={() => <About leaders={leaders} errorMessage={leaders.errorMessage} isLoading={leaders.isLoading} />} />
              <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contact-us"
                component={() => <Contact resetFeedbackForm={resetFeedbackForm} postFeedback={postFeedback} />}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
