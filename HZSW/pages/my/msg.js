// pages/my/msg.js
var util = require("../../utils/util.js");
var app = getApp()
var that
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["最新资讯", "系统消息"],
    activeIndex: 0,
    sliderOffset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
    //获取最新资讯
    wx.showLoading()
    var sendata = app.getMessageList(app.globalData.userInfo.id,"1")
    app.send_data(sendata, util.config.url.getMessageList, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000' && res.resultData.length > 0){
        app.globalData.NewList = res.resultData
        that.setData({
          hasNews:true,
          NewList:res.resultData
        })
      }else{
        that.setData({
          hasNews:false
        })
      }
    })

    //获取系统消息
    wx.showLoading()
    var sendata = app.getMessageList(app.globalData.userInfo.id,"2")
    app.send_data(sendata, util.config.url.getMessageList, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000' && res.resultData.length > 0){
        app.globalData.SysList = res.resultData
        that.setData({
          hasSys:true,
          SysList:res.resultData
        })
      }else{
        that.setData({
          hasSys:false
        })
      }
    })
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });

      if(e.currentTarget.id == 0){
        
      }
      if(e.currentTarget.id == 1){
        
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
    if(app.globalData.NewList&&app.globalData.SysList){
      this.setData({
        NewList:app.globalData.NewList,
        SysList:app.globalData.SysList
      })
    }
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

  }
})