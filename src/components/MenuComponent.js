import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle
} from 'reactstrap';

class Menu extends Component {

    render() {
      const { dishes, onClick } = this.props;

      const menu = dishes.map((dish) => {
        return (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card onClick={() => onClick(dish.id)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        )
      });

      return (
        <div className="container">
          <div className="row">
            {menu}
          </div>
        </div>
      );
    }
}

export default Menu;
