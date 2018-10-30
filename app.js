var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var owlbot = "/owlbot"
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

function owlbotFetcher ($http) {
  
  var API_ROOT = 'owlbot'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    tryit: function() {
      var owlbot = "/owlbot";
      return $http
        .get(politics)
        .then(function (resp) {
          console.log("Get Worked");
          console.log(resp.data);
          return resp.data;
        })
    }
  }

}

function mainCtrl ($scope, owlbotFetcher, $http) {

  $scope.owlbot = []

  owlbotFetcher.get()
    .then(function (data) {
      $scope.owlbot = data
    })

  owlbotFetcher.tryit()
    .then(function (data) {
      console.log("tryit");
      console.log(data);
    })
    
  $scope.getWordEntry = function() {
    $http({
      method: "GET"
    }).then(function(success) {
      console.log(success.data);
      $scope.owlbot = success.data;
    }, function(error) {
      console.log(error.data);
    });
  }
}
