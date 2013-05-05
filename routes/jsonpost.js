/**
 * Created with JetBrains WebStorm.
 * User: 冬明
 * Date: 13-4-4
 * Time: 下午11:48
 * To change this template use File | Settings | File Templates.
 */

/*
 * POST Json
 */

exports.get = function(req, res){

  // jsonact == 1 返回当日经销商列表含上报项目数量
  // jsonact == 2 返回日报表
  // jsonact == 3 返回销售统计


  //res.render('index', { title: 'Express',user: req.session.user});
  var errorMSG = "以下型号未匹配：<br>";
  var mysql = require('mysql');
  var settings = require('../settings');

  console.log("jsonpost.....");
  console.log(req.query.jsonact);
  console.log(req.session.user);

  var connection = mysql.createConnection({
    host: settings.dbhost,
    user: settings.dbuser,
    password: settings.dbpass,
    database: settings.db
  });

  handleDisconnect(connection);

  if (!req.session.user){
    res.redirect('/');
    return;
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

  function handleDisconnect(connection) {
    connection.on('error', function(err) {
      if (!err.fatal) {
        return;
      }

      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }

      console.log('Re-connecting lost connection: ' + err.stack);

      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
  }



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





  //console.log(req.body.store[1][0]);

  if (req.body.jsonact==1){
    // jsonact == 1 返回当日经销商列表含上报项目数量
    console.log("Jsonact 1....");

    connection.connect(function(err) {
      // Use the connection
      connection.query( 'SELECT  pId, pName,ppId FROM ma_erp.prodbase order by pOrder;', function(err, rows) {
        // And done with the connection.
        // connection.end();
        // console.log(rows);
        // console.log(rows.cname);
        // res.render('upload', { title: 'Express',user: req.session.user, clist: rows });
        var pidBase = rows;
        var pId;
        var preSQL = "INSERT INTO dailyreport (cId,pId,rDate,pSellIn,pSellOut,pStock) VALUES ";
        var SQL="";
        //connection.query('',function(){});
        //console.log(pidBase[0].pId);
        //console.log(req.body.store);
        for (x in req.body.store) {
          pId= findModel(pidBase,req.body.store[x][0]);
          if ( pId<0 ) {
            errorMSG += req.body.store[x][0];
            errorMSG += "<br>";
          } else {
            SQL +=((!SQL)?"(":",(")+
              + req.body.icid + ","
              + pId + ",\""
              + req.body.idate + "\","
              + req.body.store[x][1] + ","
              + req.body.store[x][2] + ","
              + req.body.store[x][3] +")";

          }
        }
        if (!!SQL){
          var delSQL="DELETE FROM dailyreport WHERE cId="+req.body.icid+" AND rDate=\""+req.body.idate+"\"";
          connection.query(delSQL, function(err, rows){});
          connection.connect();
          connection.query(preSQL+SQL, function(err, rows){
            console.log("Insert: "+preSQL+SQL+err);
          });
          //console.log(delSQL+preSQL+SQL);
        }
        //connection.query( SQL, function(err, rows){});


        function findModel(model,m){
          var x,n;
          n=m.toUpperCase();
          console.log(n);
          console.log(model);

          for (x in model){
            if (model[x].pName.toUpperCase()==n)
              return (model[x].ppId>0?model[x].ppId:model[x].pId);
          }
          return -1;
        }
        res.json({ state: errorMSG });
        connection.end();
        // Don't use the connection here, it has been returned to the connection.
      });
    });

  }else if((req.query.jsonact==2)) {
    // jsonact=2 返回日报表
    console.log("Jsonact 2....");

    connection.connect(function(err) {
      // Use the connection
      var SQL = 'SELECT P.pId,C.cId,P.pName,C.cFullName, ifnull((SELECT (D.pSellOut+D.pStock/10000) FROM dailyreport D WHERE D.cId=C.cId AND D.pId=P.pId AND D.rDate="'+sDate+'"),0) AS pSellOut FROM prodbase P,customerbase C WHERE C.dispOrder>0 AND P.pOrder>0 ORDER BY P.pOrder,C.dispOrder';
      console.log(SQL);
      connection.query(SQL, function(err, rows) {

        var rowsArray = [];
        var xNum = -1;
        var oldmodel= null;
        for (x in rows){
          if (rows[x].pName != oldmodel) {
            yNum = 1;
            xNum ++;
            rowsArray[xNum]=[];
            rowsArray[xNum][0]=rows[x].pName;
            rowsArray[xNum][1]=0;
            oldmodel=rows[x].pName;
          }
          yNum++;
          rowsArray[xNum][yNum]=rows[x].pSellOut;
        };
        console.log(JSON.stringify(rowsArray));

        res.json({ aaData: rowsArray });


        //res.render('dreport', { title: '每日报表',user: req.session.user,setpoint: 4,sDate: sDate,eDate: sDate,act: act,clist: rows });


        connection.end();
        // Don't use the connection here, it has been returned to the connection.
      });

    })
  }else if((req.query.jsonact==3)) {
    // jsonact=3 返回销售统计
    console.log("Jsonact 3....");
    connection.connect(function(err) {
      // Use the connection
      var SQL = 'SELECT P.pName, ifnull((SELECT SUM(D.pSellOut) FROM dailyreport D WHERE D.cId=C.cId AND D.pId=P.pId AND D.rDate>="'+sDate+'" AND D.rDate<="'+eDate+'"),0) AS pSellOut FROM prodbase P,customerbase C WHERE C.dispOrder>0 AND P.pOrder>0 AND P.ppId=0 ORDER BY P.pOrder,C.dispOrder'
      //console.log(SQL);
      connection.query(SQL, function(err, rows) {
        // res.render('dreport', { title: '每日报表',user: req.session.user,setpoint: 4,sDate: sDate,eDate: sDate,act: act,clist: rows });


        var rowsArray = [];
        var xNum = -1;
        var oldmodel= null;
        for (x in rows){
          if (rows[x].pName != oldmodel) {
            yNum = 1;
            xNum ++;
            rowsArray[xNum]=[];
            rowsArray[xNum][0]=rows[x].pName;
            rowsArray[xNum][1]=0;
            oldmodel=rows[x].pName;
          }
          yNum++;
          rowsArray[xNum][yNum]=rows[x].pSellOut;
        };
        //console.log(JSON.stringify(rowsArray));

        res.json({ aaData: rowsArray });

        connection.end();
        // Don't use the connection here, it has been returned to the connection.
      });

    })
  }
};

