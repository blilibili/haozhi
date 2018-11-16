// pages/index/search.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options.step)
    var typeId = 0;
    if(options.step == 1){
      //扫设备
      typeId = 0
    }
    if(options.step == 2){
      //扫膜
      typeId = 1
    }
    if(options.step == 3){
      //扫用户
      typeId = 2
    }
    this.setData({
      typeId:typeId
    })
    
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

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });

  },

  goInfo:function()
  {
    wx.navigateTo({
      url:"/pages/index/userInfo?id="
    })
  },

  getId:function(options)
  {
    this.setData({
      scansionId:options.detail.value
    })
  },

  searchId:function()
  {
    /*
    扫描接口入参：
    设备ID:201983074
    膜ID:M900001
    会员ID:10923900
     */
    wx.showLoading()
    var sendata = app.scansion(this.data.typeId,this.data.scansionId,app.globalData.userInfo.storeId)
    app.send_data(sendata, util.config.url.scansion, function (res) {
      if(res.resultCode == '10000'){
        if(that.data.typeId == 0){
          //扫设备
          app.globalData.indexStep = 2
          app.globalData.memberUserInfo.equipmentId = that.data.scansionId
          wx.navigateBack()
        }
        if(that.data.typeId == 1){
          //扫膜
          if(app.globalData.indexMoNum < 1){
            app.globalData.memberUserInfo.membranceId = that.data.scansionId
          }else{
            app.globalData.memberUserInfo.membranceId += ',' + that.data.scansionId
          }
          app.globalData.indexMoNum += 1

          // app.globalData.indexStep = 3
          wx.navigateBack()
        }
        if(that.data.typeId == 2){
          //扫用户
          app.globalData.indexStep = 1
          app.globalData.memberUserInfo.memberId = that.data.scansionId
          wx.redirectTo({
            url:"/pages/index/userInfo"
          })
        }
      }else{
        wx.hideLoading()
        app.showModal(res.resultMessage)
      }
    })
  },
})