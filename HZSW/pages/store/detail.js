// pages/store/detail.js
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
    util.zhw_log(options)
    if(options.storeId){
      var list = app.globalData.storeList
      for (var i = 0; i < list.length; i++) {
        if(options.storeId == list[i].storeId){
          this.setData({
            store:list[i]
          })
          break;
        }
      }
    }else if(options.storeName){
      //没有找到该门店
      wx.showLoading()
      var sendata = app.getStoreList(options.storeName)
      app.send_data(sendata, util.config.url.getStoreList, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000'){
          app.globalData.storeList.push(res.resultData[0])
          that.setData({
            store:res.resultData
          })
        }else{

        }
      })
    }else{

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

  doChange:function()
  {
    wx.navigateTo({
      url:"/pages/store/addStore?storeId="+this.data.store.storeId
    })
  },
})