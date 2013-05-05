
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , upload = require('./routes/upload')
  , dreport = require('./routes/dreport')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , util = require('util')
  , settings = require('./settings')
  , mysql = require('mysql')
  , jsonpost = require('./routes/jsonpost')
  , sort = require('./routes/sort')
  , alias = require('./routes/alias');



var users = [
  { id: 1, username: 'test1', password: '1', email: 'test1@example.com' }
  , { id: 2, username: 'test2', password: '2', email: 'test2@example.com' }
];

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: 'keyboard cat'}));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/upload', upload.index);

app.get('/dreport', dreport.index);

app.post('/sort', sort.post);

app.get('/sort', sort.get);

app.get('/alias',alias.get);

app.post('/alias',alias.post);

app.post('/jsonpost',jsonpost.get);

app.get('/jsonpost',jsonpost.get);

app.get('/help',function(req,res){
  res.render('help',{ title: '帮助', user: req.session.user});
});

app.post('/login',function(req, res){
  var msg;
  msg = findByUsername(req.body.username,req.body.password);
  if (msg===0){
    req.session.user = req.body.username;
  }
  else {
    req.session.user = null;
  }
  res.json({ username: req.body.username, state: msg });
});


app.get('/logout', function(req, res){
  //req.logout();
  req.session.user = null;
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


function findByUsername(username,password) {
  // 返回状态码：0 成功, 1 无此用户, 2 密码错误
  var state=1;
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username){
      if (user.password === password){
        state = 0;
      }else{
        state = 2;
      }
    }
  }
  return state;
}
