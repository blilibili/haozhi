// pages/device/disSuccess.js
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
    if(options.type == "store"){
      var list = app.globalData.repertoryList
      for (var i = 0; i < list.length; i++) {
        if(list[i].id == options.equipmentId){
          this.setData({
            msg:list[i],
            content:list[i].storeName,
            showText:1
          })
          break
        }
      }
    }
    if(options.type == "repertory"){
      var list = app.globalData.repertoryList
      for (var i = 0; i < list.length; i++) {
        if(list[i].id == options.equipmentId){
          this.setData({
            msg:list[i],
            content:list[i].houseName,
            showText:2
          })
          break
        }
      }
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

  doComplete:function()
  {
    wx.navigateBack()
  },
})