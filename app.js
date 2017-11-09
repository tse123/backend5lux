var express=require("express");
var app=express();
var path=require("path");
//解析页面传回后台的数据
var bodyParser=require("body-parser");
var cookieSession=require("cookie-session");
//设置路由
var apiRoute=require("./routes/api.js");
//设置静态路径
app.use(express.static(path.join(__dirname,"upload")));
//配置Body解析器,解析页面向后台传递的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//使用服务器客户端数据通信的中间件
app.use(cookieSession({
	name:"session",
	secret:"some random charactors",
	maxAge:1000*24*60*60
}));

//使用路由
app.use("/api",apiRoute);

//监听端口号
app.listen(process.env.PORT||"3000");

//--------------NODEJS入口文件----------------
