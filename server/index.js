//Here we are using the express framework for the back-end(server-side)
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index.js');
var app = express();
//For these two variables below we are using this encryption model for hashing the password
var bcrypt = require('bcrypt')
var saltRounds = 10
//----------------------------------------------------------
app.use(express.static(__dirname + '/../react-client/dist'));
//----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Here we are recieving the post request from the client-side that contains the user's location.
app.post('/', function (req, res) {

//Now we are making this function below to specify the distance in KM between the user's location
//and the technitian's location depending on the radius of the earth and the longitude and laltitude.
    function DistanceInKm(lat1,lon1,lat2,lon2) {
        var radius = 6371; // Radius of the earth in km
        var Laltitude = deg2rad(lat2-lat1);  // deg2rad below
        var Longitude = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(Laltitude/2) * Math.sin(Laltitude/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(Longitude/2) * Math.sin(Longitude/2);
          
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var distance = radius * c; // Distance in km
        return distance;
      }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }


    //Here we are finding the technitians with the nearest distance for the user and sorting them depending on the nearest 
    //technitian,then we are going to response an array contains the nearest five technitians for the client-side. 
    var user=req.body;

    db.Technitian.find({},'username longitude laltitude distance phonenumber email',function(err,techs){
    
      for (var i = 0; i < techs.length; i++) {
        var dis = DistanceInKm(user.laltitude , user.longitude, techs[i].laltitude, techs[i].longitude)
        techs[i].distance = dis
      }
        function compare(a,b) {
          if (a.distance < b.distance)
            return -1;
          if (a.distance > b.distance)
            return 1;
          return 0;
        }

    techs.sort(compare);


    var arr=[];

    for (var i = 0; i < techs.length; i++) {
      arr.push(techs[i])
    }

    res.send(arr);

  })

});


//Here we are recieving a post request from the client-side for the sign-up process that the technitian typed.
app.post('/signup', function (req, res) {
  var data=req.body;
  //Here we are hashing the password using the bcrypt model that we required above using saltRounds,
  //and we are adding some conditions to make it logical process.
bcrypt.hash(data.password,saltRounds,function(err,hash){
  if(err){
    console.log(err)
  }if(data.username === "" || data.password.length < 8 || data.phonenumber.length <12){
    res.send("Invalid Input")
  }else{
    db.Technitian.count({username: data.username}, function (err, count){ 
    if(count>0){
       res.send("exists") 
    }else{

    //Now we are saving the the information for the technitian in the database depending on the schema's data-types,
    //and we going to specify the distance as initial value and it will be changed
    //depending on technitian's location.
       db.save({
          username:data.username,
          password:hash,
          phonenumber:data.phonenumber,
          longitude: data.longitude,
          laltitude: data.laltitude,
          distance: 0,
          email:req.body.email,
          isMechanic: data.isMechanic,
          rating: 5
        },function(err,data){
          if(err){
            console.log(err)
          }
          res.send(data)
        })
      }
    }); 
   }
  })


});




//Here we are recieving a post request from the client-side for the sign-in process.
app.post('/signin', function (req, res) {

  var username = req.body.username;
  var pass = req.body.password;
//Now we are going to recieve the technitian's username and the hashed password and find the username in the
//database and compare the hashed password using bcrypt model then we are going to response the right answer.
  db.Technitian.findOne({username:username},function(err,data){
    if(err){
      console.log(err)
    }
    if(data){
      bcrypt.compare(pass,data.password,function(err,isMatch){
          if(isMatch){
          console.log('access valid') 
          var obj = {
              username : data.username,
              services : data.services,
              valid : isMatch
          }
          res.send(obj)
          }
          else{
          console.log('wrong username or password')
          res.send(isMatch)
          }
        })
    } else {console.log('username not existed')
            res.send(false)}
  });
  
});

app.post('/userSignin', function (req, res) {

  var username = req.body.username;
  var pass = req.body.password;
//Now we are going to recieve the technitian's username and the hashed password and find the username in the
//database and compare the hashed password using bcrypt model then we are going to response the right answer.
  db.Users.findOne({username:username},function(err,data){
    if(err){
      console.log(err)
    }
    if(data){
      bcrypt.compare(pass,data.password,function(err,isMatch){
          if(isMatch){
          console.log('access valid') 
          var obj = {
              username : data.username
          }
          res.send(obj)
          }
          else{
          console.log('wrong username or password')
          res.send(isMatch)
          }
        })
    } else {console.log('username not existed')
            res.send(false)}
  });
  
});



//Here we are recieving a post request from the client-side for the services that the technitian entered them
//in his own profile to be rendered in his profile page and saved in the database as a object inside the services array.
app.post('/service', function (req, res) {
    var obj = {
      clientName: req.body.clientName,
      service: req.body.service,
      date: req.body.date
    }
    console.log(req.body.username)
  db.Technitian.findOne({username:req.body.username},'username services',function(err,data){
    console.log(data)
   data.services.unshift(obj);
    db.save(data,function(err,data){
      if(err){
        console.log(err)
      }
      console.log(data)
      res.send(data);
    });
    
  })
  
});

app.put('/rateUpdate', function (req, res){
  db.Technitian.findOneAndUpdate({username: req.body.username}, {$push: {rating: req.body.rating}}, function (err, data){
    if (err) {
      console.log(err)
    } else {
    res.send("Done!")
    }
  });
});
app.post('/userSignup', function(req, res){

 var data=req.body;
 console.log(data);
  //Here we are hashing the password using the bcrypt model that we required above using saltRounds,
  //and we are adding some conditions to make it logical process.
bcrypt.hash(data.password,saltRounds,function(err,hash){
  if(err){
    console.log(err)
  }if(data.username === "" || data.password.length < 4 || data.phonenumber.length <7){
    res.send("Invalid Input")
  }else{
    db.Users.count({username: data.username}, function (err, count){ 
    if(count>0){
       res.send("exists") 
    }else{

    //Now we are saving the the information for the technitian in the database depending on the schema's data-types,
    //and we going to specify the distance as initial value and it will be changed
    //depending on technitian's location.
       db.Users.create({
          username:data.username,
          password:hash,
          phonenumber:data.phonenumber,
          email:req.body.email
        },function(err,data){
          if(err){
            console.log(err)
          }
          res.send(data)
        })
      }
    }); 
   }
  })
});
app.post('/rating', function(req, res){
  console.log("hi");
  // db.Technitian.findOne({username: req.body.techname}, function(err, data){
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(data.rating)
  //     res.send(data.rating)
  //   }
  // })
  // db.rate(function(err,result){
  //   console.log(value);
  // })
  res.send("his")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

