// pages/my/phoneChange.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
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

  clearPhone:function()
  {
    this.setData({
      phone:''
    })
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

  doSubmit:function()
  {
    var sendata = app.updatePhone(app.globalData.userInfo.id,this.data.phone,this.data.code)
    wx.showLoading()
    app.send_data(sendata, util.config.url.updatePhone, function (res) {
      if(res.resultCode == '10000'){
        //如果不是管理员则本地保存信息
        app.globalData.userInfo.phone = that.data.phone
        if(app.globalData.userInfo.grade != 1){
          wx.setStorageSync('userinfo',app.globalData.userInfo)
        }
        wx.navigateBack()
      }
    })
  },
})