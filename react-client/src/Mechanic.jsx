import React from'react';
import StarRatingComponent from 'react-star-rating-component';
class Mechanic extends React.Component{
    constructor() {
    super();
 
    this.state = {
      rating: 0
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    var that=this
    this.setState({rating: nextValue});
    $.ajax({
      type : 'PUT',
      url: '/mechanic',
      data: {
      rating:that.state.rating,
      username:that.props.mech.username
      }, 
      success: (data) => {
        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  }
        render(){
             const { rating } = this.state;
             if(this.props.v){
                 return(
                <li className="list-group-item">
                <a href={'mailto:'+ this.props.mech.email + '?Subject=I%20need%20help!%20-%20Handy%20Neighbors&body=Longitude:%20'+this.props.longitude+'%0D%0ALaltitude:%20'+this.props.laltitude} style={{textDecoration: 'none', color:'black'}} target="_top">
                <div>
                <h4>{this.props.mech.username}</h4>
                <p>Distance: {this.props.mech.distance} km</p>
                <p>Mobile: {this.props.mech.phonenumber}</p>
                </div>
                </a>
                <div>
        
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
                </li>
                )
             }else{
                 return(
                <li className="list-group-item">
                <a href={'mailto:'+ this.props.mech.email + '?Subject=I%20need%20help!%20-%20Handy%20Neighbors&body=Longitude:%20'+this.props.longitude+'%0D%0ALaltitude:%20'+this.props.laltitude} style={{textDecoration: 'none', color:'black'}} target="_top">
                <div>
                <h4>{this.props.mech.username}</h4>
                <p>Distance: {this.props.mech.distance} km</p>
                <p>Mobile: {this.props.mech.phonenumber}</p>
                </div>
                </a>
                </li>
                )
             }
           
            }
        
    }

export default Mechanic