import React, { Component } from 'react';
import {Map,  Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
// This is the map component it get the location of user without even breakin' a sweat , it dynamically finds the location of the user and put a marker on there location.
//For futher info please read the comments blow && ENJOY ! 
class OurMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      // latitude
      lat:0,
      //longitude 
      lng:0,
      //infoWindo in the map component we recomend that you dont change the next three states 
      showingInfoWindow: false,

      activeMarker: {},
      Place: {}
    }
    // binding the getLoc method to "this"
    this.getLoc = this.getLoc.bind(this)
    this.mapclick = this.mapclick.bind(this)
  }


getLoc(){
  //this function will get the locatoin and save in the state
  var that = this
  var options = {
  enableHighAccuracy: true,
  // uncomment timeout if you want to keep track of the users locstion
  // timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  var crd = pos.coords;
// if a location is found it will save it in the state
that.setState({
  lat:crd.latitude,
  lng:crd.longitude
})

that.props.setLngLat(crd.longitude, crd.latitude)
}

function error(err) {
  //if an error happens while gettin the location in will show it in the console
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
//using the navigator method which two callbacks and an options object which is declared above
navigator.geolocation.getCurrentPosition(success, error, options);
}

onMarkerClick(props, marker, e){
    this.setState({
      Place: props,
      activeMarker: marker,
      showingInfoWindow: true
    })};
 
  onMapClicked (props){
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  mapclick(event){
   this.setState({
  lat:31.67,
  lng:31.5465
})

console.log(event.google.maps.LatLng);
console.log(event.google.maps.LatLng);
 }
  render() {
    return (
        <div> 
        
          <div>
          {this.getLoc()// calling getLoc here will get your location once you open the app
          }   

            <Map style={{width:"60%",height:"30%"}} google={this.props.google} zoom={7}
            //the map component which is made thanks to google maps react library 
                initialCenter={{  lat:31.963158 ,lng:35.930359}} 
                onClick={this.mapclick}>

                <Marker position={{lat:this.props.laltitude,lng:this.props.longitude}}
                // a marker on the map that will show you your current location
                  onClick={this.onMarkerClick} name={"Your locatoin"}
                   />
               

                <InfoWindow marker={this.state.activeMarker} 
                //infoWindo will be shown once a marker is clicked     
                  visible={this.state.showingInfoWindow}> 

                <div>
                  <h1>{this.state.Place.name}</h1>
                </div>

              </InfoWindow>

            </Map>
            </div>
            
        </div>          
    );
  }
}

export default GoogleApiWrapper({
  // generate an api key at https://developers.google.com/maps/documentation/javascript/get-api-key
  apiKey: ("AIzaSyDVwtOBPrV-eKuemXtXxpMsPjmfjBOB9oo")
})(OurMap)
// export the component so that it may be used in other components

