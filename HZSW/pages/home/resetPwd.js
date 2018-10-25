// pages/home/resetPwd.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eyesItems:[
      {'hide':'/image/login_icon_mima.png','show':'/image/login_icon_mima_pre.png','isShow':false,'img':'/image/login_icon_mima.png','isPwd':'true','id':0},
      {'hide':'/image/login_icon_mima.png','show':'/image/login_icon_mima_pre.png','isShow':false,'img':'/image/login_icon_mima.png','isPwd':'true','id':1},
      {'hide':'/image/login_icon_mima.png','show':'/image/login_icon_mima_pre.png','isShow':false,'img':'/image/login_icon_mima.png','isPwd':'true','id':2},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getPhone:function(options)
  {
    this.setData({
      phone:options.detail.value
    })
  },

  getCode:function(options)
  {
    this.setData({
      code:options.detail.value
    })
  },

  sendCode:function()
  {
    if(this.data.phone == undefined || this.data.phone.length < 11){
      app.showModal('请输入完整的手机号码');return;
    }
    if(!util.isPoneAvailable(this.data.phone)){
      app.showModal('请输入正确的手机号码');return;
    }
    if(this.data.getCode)return;
    var sendata = app.smsCode(this.data.phone)
    app.send_data(sendata, util.config.url.smsCode, function (res) {
      if(res.resultCode == '10000'){
        that.setData({
          codeText:"(60)",
          codeTime:60,
          getCode:true
        })
        var c = setInterval(function(){
          if(that.data.codeTime < 1){
            that.setData({
              codeText:"",
              codeTime:60,
              getCode:false
            })
            clearInterval(c);
          }else{
            that.setData({
              codeText:"("+(--that.data.codeTime)+")",
              codeTime:that.data.codeTime,
              getCode:true
            })
          }
        },1000)
      }
    })
  },

  doReset:function()
  {
    if(this.data.pwd != this.data.pwdAg){
      app.showModal('确认密码与新密码不一致')
      return
    }
    var sendata = app.resetPassword(this.data.phone,this.data.code,this.data.oldPwd,this.data.pwd)
    wx.showLoading();
    app.send_data(sendata, util.config.url.resetPassword, function (res) {
      if(res.resultCode == '10000'){
        wx.redirectTo({
          url:"/pages/home/resetPwdSucc"
        })
      }
    })
  },

  getOldPwd:function(options)
  {
    this.setData({
      oldPwd:options.detail.value
    })
  },

  getPwd:function(options)
  {
    this.setData({
      pwd:options.detail.value
    })
  },

  getPwdAgain:function(options)
  {
    this.setData({
      pwdAg:options.detail.value
    })
  },

  trun:function(options)
  {
    var id = options.currentTarget.dataset.id
    if(this.data.eyesItems[id].isShow){
      this.data.eyesItems[id].isShow = false
      this.data.eyesItems[id].isPwd = 'true'
      this.data.eyesItems[id].img = this.data.eyesItems[id].hide
    }else{
      this.data.eyesItems[id].isShow = true
      this.data.eyesItems[id].isPwd = ''
      this.data.eyesItems[id].img = this.data.eyesItems[id].show
    }
    this.setData({
      eyesItems:this.data.eyesItems
    })

  }
})