//mongoose数据库链接

const mongoose=require("mongoose");
const uri="mongodb://localhost:27017/5lux";
const options={
	useMongoClient:true
}
mongoose
	.connect(uri,options)
	.then((db)=>{console.log("数据库链接成功")})
	.catch((err)=>{console.log(err)})
	
module.exports=mongoose;
