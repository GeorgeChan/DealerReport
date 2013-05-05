/**
 * Created with JetBrains WebStorm.
 * User: 冬明
 * Date: 13-4-4
 * Time: 下午11:48
 * To change this template use File | Settings | File Templates.
 */

/*
 * POST login
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express',user: req.session.user});
  var mysql = require('mysql');
  var settings = require('../settings');
  var connection = mysql.createConnection({
    host: settings.dbhost,
    user: settings.dbuser,
    password: settings.dbpass,
    database: settings.db
  });
  var sDate;

  Date.prototype.format = function(format) //author: meizz
  {
    var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(),    //day
      "h+" : this.getHours(),   //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
      "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
      (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length==1 ? o[k] :
          ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
  };

  if (!req.session.user){
    res.redirect('/');
    return;
  }

  if (!req.query.sDate){
    sDate = new Date().format("yyyy-MM-dd");
  }else{
    sDate = req.query.sDate;
  }

  console.log(req.query.sDate);



  connection.connect(function(err) {
    // Use the connection
    var SQL = 'SELECT C.cId,C.cFullName,(SELECT count(*) FROM dailyreport D WHERE D.rDate="'+sDate+'" AND C.cId = D.cId) as num,C.dispOrder FROM customerbase C WHERE C.dispOrder>=0 GROUP BY C.cId ORDER BY C.dispOrder,C.cName';
    console.log(SQL);
    connection.query(SQL, function(err, rows) {
      //.shift()
      while (rows[0].dispOrder==0){
        rows.push(rows.shift());
      }
      console.log(rows);
      res.render('upload', { title: 'Express',user: req.session.user ,sDate: sDate, clist: rows });


      connection.end();
      // Don't use the connection here, it has been returned to the connection.
    });
  });

};

