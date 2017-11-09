const Slider=require("../model/slider");
const {getJoblist,getParam}=require("../utils/utils.js");
const async = require('async')

const getList=function(req,res,next){
	Job.find({})
	.then((result)=>{
//		1.转换成json格式,2.返回数据
		res.json(getJoblist(result));
	});
}
const addOrUpdate=function(req,res,next){
	const { slider_id, slider_title, slider_url, slider_pic }=req.body;	
	const willSaveJob=new Slider({
		slider_id,
	    slider_title,
//	    createTime: new Date().getTime(),
	    slider_url,
	    slider_pic: req.file && req.file.filename ? req.file.filename : ''
	});
	willSaveJob.save().then(()=>{
//		res.redirect("/backendPage/position.html");
		res.json(getParam({success:true}));
	})
}
const getSlider=function(req,res,next){
	const {pageSize ,pageNum}=req.query;
	async.parallel([
    function (cb) {
      Slider.find({})
        .then((all) => {
          cb(null, all.length)
        })
    },
    function (cb) {
      Slider.find({})
        .skip((pageNum-1) * pageSize)
        .limit(pageSize)
        .sort({_id: -1})
        .then((result) => {
          cb(null, result)
        })
    }
  ], function (err, results) {
    let page = {
      result: results[1],
      allNum:results[0],
      pageCount: Math.ceil(results[0] / pageSize),
      pageNum: parseInt(pageNum, 10)
    }
    res.json(getParam(page));
  })
}
//模糊搜索
const blurSearch=function(req,res,next){
	const {pageSize ,pageNum,val}=req.query;
	const reg="/"+val+"/";
	var obj;
	if(val.length==0){
		obj={}
	}else{
		obj={"slider_title":eval(reg)}
	}
	async.parallel([
    function (cb) {
      Slider.find(obj)
        .then((all) => {
        	console.log(val);
          cb(null, all.length)
        })
    },
    function (cb) {
      Slider.find(obj)
        .skip((pageNum-1) * pageSize)
        .limit(pageSize)
        .sort({_id: -1})
        .then((result) => {
          cb(null, result)
        })
    }
  ], function (err, results) {
    let page = {
      result: results[1],
      allNum:results[0],
      pageCount: Math.ceil(results[0] / pageSize),
      pageNum: parseInt(pageNum, 10)
    }
    res.json(getParam(page));
  })
}
//删除轮播图数据
const deleteSlider = function (req, res, next) {
  const { id } = req.query
  Slider.findByIdAndRemove(id)
    .then((result) => {
      res.json(getParam({success: true}))
    })
}
//修改轮播图数据
const updateSlider = function (req, res, next) {
  const { slider_id, slider_title, slider_url, id}=req.body;
  console.log(req.body);
//console.log(slider_pic);
  const setObj={
  	slider_id, 
  	slider_title, 
  	slider_url
  }
  if (req.file && req.file.filename) {
      setObj.slider_pic = req.file.filename
   }
  console.log(setObj);
  Slider.findByIdAndUpdate(id,{
  	$set:setObj
  })
 	.then((result) => {
 		console.log("成功");
      res.json(getParam({success: true}))
    })
}
module.exports={ getList,addOrUpdate,getSlider,deleteSlider,updateSlider,blurSearch}

