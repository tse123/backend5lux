//定义schema(数据库对象集合),通过model建表
const db=require("../utils/database.js");

const schema=new db.Schema({
	"positionName": {
    type: String,
    required: true
  },
  "city": {
    type: String,
    required: true
  },
  "createTime": {
    type: Date,
    required: true
  },
  "salary": {
    type: String,
    required: true
  },
  "companyLogo": {
    type: String,
    required: true
  },
  "companyName": {
    type: String,
    required: true
  }
})
//定义model
const Job=db.model("jobs",schema);
module.exports=Job;
