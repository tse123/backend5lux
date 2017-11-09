//定义schema(数据库对象集合)，通过model建表
const db=require("../utils/database.js");

const schema=new db.Schema({
	"slider_title": {
	    type: String,
	    required: true
	  },
	  "slider_url": {
	    type: String,
	    required: true
	  },
	  "slider_id": {
	    type: String,
	    required: true
	  },
	  "slider_pic":{
	  	type:String,
	  	required:true
	  }
})
//定义model
const Slider=db.model("sliders",schema);
module.exports=Slider;

