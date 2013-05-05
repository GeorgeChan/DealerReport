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
    database: settings.db,
  });
  var act,sDate,eDate;

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
  };

  if (!req.query.act){
    act = 1;
  }else{
    act = req.query.act;
  };


  if (!req.query.sDate){
    sDate = new Date().format("yyyy-MM-dd");
  }else{
    sDate = req.query.sDate;
  };

  if (!req.query.eDate){
    eDate = new Date().format("yyyy-MM-dd");
  }else{
    eDate = req.query.eDate;
  };

  console.log(req.session.user);

  if (act==1){
    console.log("act=1");

    connection.connect(function(err) {

      var SQL = 'SELECT cName FROM customerbase WHERE dispOrder>0 ORDER BY dispOrder';
      connection.query(SQL, function(err, rows){
        var cCount = rows.length;
        var cNameList = rows;


        // Use the connection
        var SQL = 'SELECT C.cId,C.cFullName,count(*) as num FROM customerbase C JOIN dailyreport D ON C.cId = D.cId WHERE D.rDate="'+sDate+'" AND c.dispOrder>0 GROUP BY D.cId ORDER BY C.dispOrder';
        console.log(SQL);
        connection.query(SQL, function(err, rows) {
          console.log(rows);
          res.render('dreport', { title: '每日报表',user: req.session.user,setpoint: 4,sDate: sDate,eDate: sDate,act: act,cNameList: cNameList });


          connection.end();
          // Don't use the connection here, it has been returned to the connection.
        });
      });

    })
  }else if(act==2) {
    console.log("ACT=2");
    connection.connect(function(err) {

      var SQL = 'SELECT cName FROM customerbase WHERE dispOrder>0 ORDER BY dispOrder';
      connection.query(SQL, function(err, rows){
        var cCount = rows.length;
        var cNameList = rows;
        //console.log(rows);


        // Use the connection
        var SQL = 'SELECT P.pName, ifnull((SELECT SUM(D.pSellOut) FROM dailyreport D WHERE D.cId=C.cId AND D.pId=P.pId AND D.rDate>="'+sDate+'" AND D.rDate<="'+eDate+'"),0) AS pSellOut FROM prodbase P,customerbase C WHERE C.dispOrder>0 AND P.pOrder>0 AND P.ppId=0 ORDER BY P.pOrder,C.dispOrder'
        //console.log(SQL);
        connection.query(SQL, function(err, rows) {

          var rowsArray = [];
          var xNum = -1;
          var oldmodel= null;
          for (x in rows){
            if (rows[x].pName != oldmodel) {
              yNum = 0;
              xNum ++;
              rowsArray[xNum]=[];
              rowsArray[xNum][yNum]=rows[x].pName;
              oldmodel=rows[x].pName;
            }
            yNum++;
            //console.log(xNum+" "+yNum+" "+rows[x].pName+rows[x].pSellOut);
            rowsArray[xNum][yNum]=rows[x].pSellOut;
          }


          //console.log(JSON.stringify(rowsArray));
          console.log("渲染销售统计页面");



          //console.log(rows.cname);
          res.render('dreport', { title: '销售统计',user: req.session.user,setpoint: 0,sDate: sDate,eDate: eDate,act: act,cNameList: cNameList });


          connection.end();
          // Don't use the connection here, it has been returned to the connection.
        });
      });
    });

  }else{
    res.redirect('/');
  }

};

