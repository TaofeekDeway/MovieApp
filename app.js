var express = require('express');
var app = express();
var request = require('request');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('search');
});
//www.omdbapi.com/?apikey=[yourkey]&
app.get('/search', function (req, res) {
  var searchInput = req.query.movie;
  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + searchInput;
  request(url, function (error, response, body) {
    if (error) {
      res.send('Something went wrong');
      console.log(error);
    } else {
      if (response.statusCode == 200) {
        var resultData = JSON.parse(body);
        res.render('result', { resultData: resultData });
      }
    }
  });
});

app.get('*', function (req, res) {
  res.send('Error 404');
});

app.listen(3000, function () {
  console.log('Our MovieApp Server has started');
});
