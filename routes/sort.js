
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
        var list3 =req.body.list3;
        if (req.body.jsonact==1){
            // 数组元素[0] pid，[1] cName
            SQL="UPDATE customerbase SET dispOrder = CASE ";
            // 序列化 (cId,dispOrder)
            for (x in list1){
                SQL += "WHEN cId="+list1[x]+" THEN "+(parseInt(x)+1)+" ";
            }
            for (x in list2){
                SQL += "WHEN cId="+list2[x]+" THEN 0 ";
            }
            for (x in list3){
                SQL += "WHEN cId="+list3[x]+" THEN -1 ";
            }

            SQL += "ELSE dispOrder END;";
        }else if (req.body.jsonact==2){
            // 数组元素[0] pid，[1] cName
            SQL="UPDATE prodbase SET pOrder = CASE ";
            // 序列化 (cId,dispOrder)
            for (x in list1){
                SQL += "WHEN pId="+list1[x]+" THEN "+(parseInt(x)+1)+" ";
            }
            for (x in list2){
                SQL += "WHEN pId="+list2[x]+" THEN 0 ";
            }
            for (x in list3){
                SQL += "WHEN pId="+list3[x]+" THEN -1 ";
            }

            SQL += "ELSE pOrder END;";

        }


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

    var mysql = require('mysql');
    var settings = require('../settings');
    var connection = mysql.createConnection({
        host: settings.dbhost,
        user: settings.dbuser,
        password: settings.dbpass,
        database: settings.db
    });


    connection.connect(function(err) {
        var SQL;

        if (req.query.jsonact==3 && !!req.query.cName && !!req.query.cFullName && !!req.query.area){
            // 提交新代理商
            SQL="INSERT INTO customerbase (dispOrder,cName,cFullName,area) VALUES (0,'"+req.query.cName+"','"+req.query.cFullName+"','"+req.query.area+"')";
            console.log(SQL);
            connection.query(SQL, function(err, rows){});
        }else if (req.query.jsonact==4 && !!req.query.pName && req.query.pSize>1 && !!req.query.pPanalType){
            // 提交新产品
            SQL="INSERT INTO prodbase (pName,pFeature,pSize,pLED,pPanalType,ppId,pOrder) VALUES " +
              "('"+req.query.pName+"','"+req.query.pFeature+"',"+req.query.pSize+",'"+req.query.pLED+"','"+req.query.pPanalType+"',"+(req.query.optType=="1"?0:-1)+",0);";
          console.log(SQL);
          connection.query(SQL, function(err, rows){});
        }

            if (req.query.act==1){
                //    对代理商顺序排序
                SQL="SELECT cId AS id, cName AS Name, dispOrder AS indx FROM customerbase ORDER BY dispOrder,cName";
            }else if (req.query.act==2){
                //    对产品库顺序排序
                SQL="SELECT pId AS id, pName AS Name, pOrder AS indx FROM prodbase WHERE ppId=0 ORDER BY pOrder,pName";
            }

            console.log(SQL);
            connection.query(SQL, function(err, rows) {
                var list1 =[];
                var list2 =[];
                var list3 =[];
                // 数组元素[0] pid，[1] cName
                for (x in rows){
                    if (rows[x].indx<0){
                        list3.push([rows[x].id,rows[x].Name]);
                    }else if(rows[x].indx===0){
                        list2.push([rows[x].id,rows[x].Name]);
                    }else{
                        list1.push([rows[x].id,rows[x].Name]);
                    }
                }

                res.render('sort', { title: 'Title',user: req.session.user ,list1: list1,list2: list2,list3: list3,act: req.query.act});
                connection.end();
                // Don't use the connection here, it has been returned to the connection.
            });
        });

};
