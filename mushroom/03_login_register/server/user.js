const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req, res){ // 接收参数的端口
	// User.remove({},function(e,d){}) remove传入一个空,清除所有密码
	User.find({},function(err,doc){
		return res.json(doc)
	})
})
Router.post('/login', function(req,res){ //登陆页,获取用户的用户名和密码
	const {user, pwd} = req.body
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
		if (!doc) {
			return res.json({code:1,msg:'用户名或者密码错误'})
		}
		res.cookie('userid', doc._id) // 使用cookie保存userid
		return res.json({code:0,data:doc})
	})
})
Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
		}
		
		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
	})
})
Router.get('/info',function(req, res){
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} ,_filter , function(err,doc){ // findOne直接传入一个校验参数
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
	// 用户有没有cookie
	
})

function md5Pwd(pwd){ // 密码加盐,用户一般设置的密码比较简单,所以要往后面再添加一段复杂字符串
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))	// 以防万一,外层再加一个md5,两层md5
}


module.exports = Router