const db=require("../utils/database.js");//数据库
//定义schema(数据库对象集合),通过model建表

const schema=new db.Schema({
	username:{
		type:String,
		required:true
	},
	phonenum:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	type:{
		type:String,
		required:true
	}
});
//定义model
const User=db.model("userinfos",schema);
module.exports=User;
