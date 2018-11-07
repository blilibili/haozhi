// pages/home/index.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (wx.getStorageSync('wx_user')) {
      this.setData({
        hasAvatar:true,
        avatar:wx.getStorageSync('wx_user').avatarUrl
      })
    }
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

  checkPhone:function(options)
  {
    this.setData({
      phone:options.detail.value
    })
    if(options.detail.value.length < 11)return;
    if(!util.isPoneAvailable(this.data.phone))return;
    var sendata = app.checkPhone(options.detail.value)
    app.send_data(sendata, util.config.url.checkout, function (res) {
      if(res.resultCode == '10000' && res.resultData.isManager == "1"){
        that.setData({
          isManager:true
        })
      }else{
        that.setData({
          isManager:false
        })
      }
    })
  },

  getCode:function(options)
  {
    this.setData({
      code:options.detail.value
    })
  },

  getPwd:function(options)
  {
    this.setData({
      pwd:options.detail.value
    })
  },

  sendCode:function()
  {
    util.zhw_log(this.data.phone)
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

  doLogin:function()
  {
    /*
    if(!this.data.phone){
      app.showModal('手机号码不能为空')
      return
    }
    if(!this.data.code){
      app.showModal('验证码不能为空')
      return
    }
    if(!this.data.pwd){
      app.showModal('密码不能为空')
      return
    }
    var sendata = app.userLogin(this.data.phone,this.data.pwd,this.data.code)
    */
    /*
    管理员： 13168397239 123456
    店长： 13527637712 123456
    店员： 18329183721 123456
    -------------
    扫描接口入参：
    设备ID： 201983074
    膜ID： M900001
    会员ID： 10923900
     */
    var sendata = app.userLogin(13527637712,'123456',1111)
    wx.showLoading();
    app.send_data(sendata, util.config.url.login, function (res) {
      if(res.resultCode == '10000'){
        //如果不是管理员则本地保存信息
        app.globalData.userInfo = res.resultData
        if(res.resultData.grade != 1){
          wx.setStorageSync('userinfo',res.resultData)
        }
        if(!res.resultData.name){
          wx.redirectTo({
            url:"/pages/home/editUser"
          })
        }else{
          wx.switchTab({
            url:"/pages/my/index"
          })
        }
      }
    })
  },

  resetPwd:function()
  {
    wx.navigateTo({
      url:"/pages/home/resetPwd"
    })
  },

  getUserInfo:function(options)
  {
    util.zhw_log(options)
    var wx_user = JSON.parse(options.detail.rawData);
    wx.setStorageSync('wx_user',wx_user)
    this.setData({
      hasAvatar:true,
      avatar:wx_user.avatarUrl
    })
  },
})