const express = require("express")
const router = express.Router()

const passport = require("passport")
const Profile = require("../../models/Profile")

// $router GET api/profiles/test
// @desc  返回请求的json数据
// @access public
router.get("/test",(req,res) => {
	res.json({msg:"Profile works"})
})

// $router POST api/profiles/add
// @desc  创建信息接口
// @access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
	const profileFileds = {};

	if(req.body.type) profileFileds.type = req.body.type;
	if(req.body.description) profileFileds.description = req.body.description;
	if(req.body.income) profileFileds.income = req.body.income;
	if(req.body.expend) profileFileds.expend = req.body.expend;
	if(req.body.cash) profileFileds.cash = req.body.cash;
	if(req.body.remark) profileFileds.remark = req.body.remark;

	new Profile(profileFileds).save().then(profile => {
		res.json(profile);
	}).catch(err => {
		console.log(err);
	})
})

// $router GET api/profiles
// @desc  获取所有信息
// @access public
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
	Profile.find().then(profile => {
		if(!profile){
			return res.status(404).json("没有任何内容");
		}
			
		res.json(profile)
	}).catch(err => {
		res.status(404).json(err);
	})
})
// $router GET api/profiles/:id
// @desc  获取单个信息
// @access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
	Profile.findOne({_id:req.params.id}).then(profile => {
		if(!profile){
			return res.status(404).json("没有任何内容");
		}
			
		res.json(profile)
	}).catch(err => {
		res.status(404).json(err);
	})
})

// $router POST api/profiles/edit
// @desc  编辑信息接口
// @access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
	const profileFileds = {};

	if(req.body.type) profileFileds.type = req.body.type;
	if(req.body.description) profileFileds.description = req.body.description;
	if(req.body.income) profileFileds.income = req.body.income;
	if(req.body.expend) profileFileds.expend = req.body.expend;
	if(req.body.cash) profileFileds.cash = req.body.cash;
	if(req.body.remark) profileFileds.remark = req.body.remark;

	Profile.findOneAndUpdate(
		{_id:req.params.id},
		{$set:profileFileds},
		{new:true}
	).then(profile => {
		res.json(profile)
	})
})
// $router POST api/profiles/delete
// @desc  删除信息接口
// @access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
	Profile.findOneAndRemove(
		{_id:req.params.id}
	).then(profile => {
		profile.save().then(profile => {
			res.json(profile)
		})
	}).catch(err => {
		res.status(404).json("删除失败");
	})
})


module.exports = router