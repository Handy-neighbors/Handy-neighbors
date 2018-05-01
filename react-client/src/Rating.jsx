import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
 
class Rating extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <center><div id='stars' style={{color:'green', height: '75px'}}>
        <h2>Rating from state: {rating}</h2>
        <StarRatingComponent 
          style={{color:'green', height:'45px', width: '90px'}}
          name="rating" 
          starCount={10}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div></center>
    );
  }
}

export default Rating