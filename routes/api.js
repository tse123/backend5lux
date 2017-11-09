const express=require("express");
const router=express.Router();//express写好了路由，直接使用即可

//登录注册的signUp.signIn回调函数
const userController=require("../controller/user.js");
const jobController=require("../controller/job.js");
//上传图片
const upload=require("../utils/uploadimg");
//数据
//const positionController=require("../controller/position.js");
//用户相关路由
router.post("/users/signUp",userController.signUp);
router.post("/users/signIn",userController.signIn);
router.get("/users/isLogin",userController.isLogin);
router.get("/users/logout",userController.logout);
//职位相关路由
//router.get("/position/list",positionController.getList);
router.get("/jobs/list",jobController.getList);
//获取首页轮播图信息
router.get("/getsliders/list",jobController.getSlider);
//模糊搜索
router.get("/blurgetsliders/list",jobController.blurSearch);
//轮播图删除
router.get("/removesliders/list",jobController.deleteSlider);
//轮播图修改
router.post("/updatesliders/list",upload.single('slider_pic'),jobController.updateSlider);
//上传图片
router.post("/jobs/addOrUpdate",upload.single('slider_pic'), jobController.addOrUpdate);

module.exports=router;


