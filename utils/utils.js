module.exports={
	getParam:function(data){
		return {
			"code":0,
			"msg":"1",
			"data":data
		}
	},
	getJoblist:function(data){
		return {
			"content":{
				"data":data
			},
			"message":"查询成功",
			"state":1
		}
	}
}
