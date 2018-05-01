var mongoose = require('mongoose');
var databaseConnect = "mongodb://ammarlio:ammarlion123@ds255319.mlab.com:55319/handy-neighbors" || 'mongodb://localhost/test'
mongoose.connect(databaseConnect);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

//Our schema has seven data-types ,related for a Model that will 
//be based on this schema.
  var techSchema = mongoose.Schema({
    username:{type:String,index:{unique:true}},//make the username unique
    password:String,
    phonenumber:Number,//to let the user contact the technitian
    //Now we are defining these three datatypes below to specify the location for the
    //technitian with the longitude and laltitude,and the distance to compare it later 
    //with the location for the user with the nearest technintians.
    longitude:Number,
    laltitude:Number,
    distance:Number,
    email:String,
    category: Boolean,
    //For this datatype below is an Array of services that will have a list for the 
    //technitian that he will fill them in his own profile,and these services will be 
    //rendered in technitian profile after saving process.
    services:Array
  })


  var Technitian = mongoose.model('Tecnitian',techSchema)//this is a model for the technitian
   
  //Here we are making a save function that will be called every time when a new technitian make 
  //a signup process and for saving the services that the technitian add them in 
  //his own profile.Here in this function we defined an instance to be related for 
  //every new technitian.
  var save = function(data,callback){
    var user = new Technitian(data)
    user.save(function(err,dataRes){
      if(err){
        callback(err,null)

      }
      callback(null,dataRes)
    })
  }

module.exports.Technitian = Technitian;//We export this model to be used in the server side for any process related for the technitian
module.exports.save = save;//We exoprt this function to be used in the sever side for the processes that we defined above the save function




