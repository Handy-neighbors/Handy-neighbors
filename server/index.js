var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index.js');
var app = express();
var bcrypt = require('bcrypt')
var saltRounds = 10
//----------------------------------------------------------
app.use(express.static(__dirname + '/../react-client/dist'));
//----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/service', function (req, res) {
    var obj = {
      clientName: req.body.clientName,
      service: req.body.service,
      date: req.body.date
    }
  db.Technitian.findOne({username:req.body.username},'username services',function(err,data){
    console.log(data)
   data.services.push(obj);
    db.save(data,function(err,data){
      if(err){
        console.log(err)
      }
      console.log(data)
      res.send(data);
    });
    
  })
  
})


app.post('/signin', function (req, res) {

  var username = req.body.username;
  var pass = req.body.password;

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

app.post('/signup', function (req, res) {
  var data=req.body;
bcrypt.hash(data.password,saltRounds,function(err,hash){
  if(err){
    console.log(err)
  }db.save({
      username:data.username,
      password:hash,
      phonenumber:data.phonenumber,
      longitude: data.longitude,
      laltitude: data.laltitude,
      distance: 0
    },function(err,data){
      if(err){
        console.log(err)
      }
      res.send(data)
    })
    
  })

});
app.get('/signup', function (req, res) {
  var data=req.body;

  
  console.log('wseu')
});


app.post('/', function (req, res) {

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
    var user=req.body;

    db.Technitian.find({},'username longitude laltitude distance phonenumber',function(err,techs){
    
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

    for (var i = 0; i < 5; i++) {
      arr.push(techs[i])
    }

    res.send(arr);

  })

});


app.listen(process.env.PORT || 3001, function() {
  console.log('listening on port 3000!');
});

