var mongoose = require('mongoose');
var databaseConnect = 'mongodb://localhost/test'
mongoose.connect(databaseConnect, { useMongoClient: true });

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
    //isMechanic: Boolean,
    ratings: {type: mongoose.Schema.ObjectId, ref: 'Rating'},
    rating: {type: Number},
    //For this datatype below is an Array of services that will have a list for the 
    //technitian that he will fill them in his own profile,and these services will be 
    //rendered in technitian profile after saving process.
    services:Array
  })


/////MAKE ARRAY OF OBJECTS OF USERS AND THEIR RATING 
//AND THEN ITERATE THROUGH  THE ARRAY AND CHECK IF THIS USERS IS EXIST THEN ADD TO HIS RATING
//"UPDATE " IF NOT JUST ADD IT 
////FOR THE ARRAY MAKE A NEW ARRAY THEN USE FINDONE TO RETRIEVE THE PREVIOUS ARRAY 
// AND THEN PUSH TO THE NEW ARRAY THEN SAVE  THE NEW ARRAY 


var userSchema = mongoose.Schema({
    username:{type:String,index:{unique:true}},//make the username unique
    password:String,
    phonenumber:Number,//to let the user contact the technitian
    //Now we are defining these three datatypes below to specify the location for the
    //technitian with the longitude and laltitude,and the distance to compare it later 
    //with the location for the user with the nearest technintians.
    email:String,
    //isMechanic: Boolean,
    //rating: [Number],
    //For this datatype below is an Array of services that will have a list for the 
    //technitian that he will fill them in his own profile,and these services will be 
    //rendered in technitian profile after saving process.
  });
var RatingSchema =  mongoose.Schema({
    TecnitianId:   {type: mongoose.Schema.ObjectId, ref: 'Tecnitian'},
    userId:   {type: mongoose.Schema.ObjectId, ref: 'User'},
    rating:     {type: Number, required: true},
    ratingId : {type: mongoose.Schema.ObjectId}
});
 

var ResultSchema =  mongoose.Schema({
    _id: { type:  mongoose.Schema.Types.ObjectId, ref: 'Tecnitian' },
    avgRating: Number
});


  var Technitian = mongoose.model('Tecnitian', techSchema);//this is a model for the technitian
  var TechnitianResult = mongoose.model('TechnitianResult', techSchema);
  var Rating = mongoose.model('Rating', RatingSchema);
  var Users = mongoose.model('Users', techSchema);
  var rate = function(callback) {
      Rating.aggregate(
        [
          { "$group": {
            "_id": "$tecnitianId",
            "avgRating": { "$avg": { "$ifNull": ["$rating", 0 ] } }
          }},
        ],
        function(err,results) {
          console.log(results);

          results = results.map(function(result) {
            return new TechnitianResult(result);
          });

          Technitian.populate(
            results,
            { "path": "_id" },
            function(err,results) {
              if(err){
                 console.log(err);
                callback(err,null)
              }else{
                 console.log(results);
                 callback(null,results);
              }
             
             
            }
          )

        }
      );
    }
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
module.exports.Rating = Rating;
module.exports.Users = Users;
module.exports.Technitian = Technitian;//We export this model to be used in the server side for any process related for the technitian
module.exports.save = save;//We exoprt this function to be used in the sever side for the processes that we defined above the save function
module.exports.rate = save;//We exoprt this function to be used in the sever side for the processes that we defined above the save function




