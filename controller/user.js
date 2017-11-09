const User=require("../model/user.js");
const { getParam }=require("../utils/utils.js");
const bcrypt =require("bcrypt");

//注册
const signUp=function(req,res){
	const {username,phonenum,password,email,type}=req.body;
	console.log(req.body);
	User.findOne({username})
	.then((user)=>{
		if(user){
			res.json(getParam({success:false}))
		}else{
			//bcrypt算法加密密码
			bcrypt.hash(password,10)
			.then((password)=>{
				const willSaveUser=new User({
					username,
					phonenum,
					password,
					email,
					type
				})
				//数据存储（入库）
				willSaveUser.save().then(()=>{
					res.json(getParam({success:true}))
				})
			})
		}
	})
}
const signIn = function (req, res) {
  const { username, password ,type} = req.body
  User.findOne({username})
    .then((user) => {
      if (!user) {
        res.json(getParam({login: false}))
      } else {
        bcrypt.compare(password, user.password)
          .then((result) => {
            if (result) {
              // 存储session
              req.session.username = user.username
              req.session.type=user.type
              res.json(getParam({
                login: true,
                username: user.username,
                type:user.type
              }))
            } else {
              res.json(getParam({login: false}))
            }
          })
      }
    })
}
//判断用户是否登录接口
const isLogin=function(req,res){
	res.json(getParam({
		login:req.session.username?true:false,
		username:req.session.username,
		type:req.session.type
	}))
}
//用户注销
const logout=function(req,res){
	req.session=null;
	res.json(getParam({
		logout:true
	}))
}
module.exports={signUp,signIn,isLogin,logout}
