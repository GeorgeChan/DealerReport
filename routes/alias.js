
/*
 * GET users listing.
 */

exports.post = function(req, res){
  if (!req.session.user){
    res.redirect('/');
    return;
  }
  var SQL;

  var mysql = require('mysql');
  var settings = require('../settings');
  var connection = mysql.createConnection({
    host: settings.dbhost,
    user: settings.dbuser,
    password: settings.dbpass,
    database: settings.db
  });
  /*
  if (req.body.jsonact==1){
    //    对代理商顺序排序
    SQL="SELECT cId AS id, cName AS Name, dispOrder AS indx FROM customerbase ORDER BY dispOrder,cName";
  }else if (req.body.jsonact==2){
    //    对产品库顺序排序
    SQL="SELECT pId AS id, pName AS Name, pOrder AS indx FROM prodbase ORDER WHERE ppId=0 BY pOrder,pName";
  }
  */

  connection.connect(function(err) {
    var list1 =req.body.list1;
    var list2 =req.body.list2;
    var list1A=[];
    console.log(list1);
    for (x in list1){
      if (list1[x][1]!=0){
        for (var i=(x-1); i>=0; i--){
          if (list1[i][1]==0){
            list1A[list1A.length]=[];
            list1A[list1A.length-1][0]=list1[x][0];
            list1A[list1A.length-1][1]=list1[i][0];
            console.log(i,list1[x],list1[i]);
            break;
          }
        }
      }
    }
    console.log(list1A);

      // 数组元素[0] pid，[1] cName
      SQL="UPDATE prodbase SET ppId = CASE WHEN 1=0 THEN 1 ";
      // 序列化 (cId,dispOrder)
      for (x in list1A){
        SQL += "WHEN pId="+list1A[x][0]+" THEN "+(parseInt(list1A[x][1]))+" ";
      }
      for (x in list2){
        SQL += "WHEN pId="+list2[x][0]+" THEN -1 ";
      }
      SQL += "ELSE ppId END;";


    connection.query(SQL);

    console.log(SQL);
    res.json({ state: "保存成功！"});

    /*
    connection.query(SQL, function(err, rows) {

      console.log(list1,list2,list3);
      res.render('sort', { title: 'Title',user: req.session.user ,list1: list1,list2: list2,list3: list3,act: req.query.act});
      connection.end();
      // Don't use the connection here, it has been returned to the connection.
    });
    */
  });

};









exports.get = function(req, res){
  if (!req.session.user){
    res.redirect('/');
    return;
  }
  var SQL;

  var mysql = require('mysql');
  var settings = require('../settings');
  var connection = mysql.createConnection({
    host: settings.dbhost,
    user: settings.dbuser,
    password: settings.dbpass,
    database: settings.db
  });

    //    对产品库顺序排序
    SQL="SELECT pId, pName, ppId FROM prodbase WHERE pOrder>=0 ORDER BY pOrder,pName";

  connection.connect(function(err) {
    console.log(SQL);
    connection.query(SQL, function(err, rows) {
      console.log(rows);
      var list1 =[];
      var list2 =[];
      // 数组元素[0] pid，[1] cName ,[2] ppId
      for (x in rows){
        if (rows[x].ppId===0){
          list1.push([rows[x].pId,rows[x].pName,rows[x].ppId]);
        }else{
          list2.push([rows[x].pId,rows[x].pName,rows[x].ppId]);
        }
      }

      console.log(list1,list2);
      res.render('alias', { title: '产品别名管理',user: req.session.user ,list1: list1,list2: list2});
      connection.end();
      // Don't use the connection here, it has been returned to the connection.
    });
  });

};
