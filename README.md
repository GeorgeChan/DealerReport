DealerReport
============

Dealer report for everyday.
Powered by Node.js

此程序是一个零售商每日销售统计报表系统。每日根据上报的经销商名称、产品型号、数量汇总统计。

后端采用Node.js，使用Express架构开发。
前端采用Twitter Bootstrap为框架，使用了jQuery、dataTables等工具库。


安装步骤：
1. git clone https://github.com/GeorgeChan/DealerReport.git
2. cd DealerReport
3. 用 MySQL.sql 创建数据库
4. 根据Mysql数据库的参数修改文件 settings.js

module.exports = {
  cookieSecret: 'georgechan',
  db: 'ma_erp',
  dbhost: 'localhost',
  dbuser: 'root',
  dbpass: 'rootpassword',
  setpoint: 4
};

5. npm install
6. node app
6. http://localhost:3000

默认登录：
User: test1
Pass: 1
