// pages/index/userDetail.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tzlList:['危险','优良','良好','警戒','超标','严重'],
    tzlIndex:4,
    tzlEffect:4,
    zflList:['低','标准','偏高','高'],
    zflIndex:3,
    zflEffect:24,
    zfhdEffect:450,//0<=x<=528
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options.memberId)
    this.setData({
      memberId:options.memberId
    })
    let tzlIndex = this.data.tzlIndex;
    this.setData({
      tzlIndex:tzlIndex,
      tzlEffect:this.data.tzlEffect+90*tzlIndex,//体脂率每格相差90rpx
    })

    let zflIndex = this.data.zflIndex;
    this.setData({
      zflIndex:zflIndex,
      zflEffect:this.data.zflEffect+138*zflIndex+(zflIndex>=2?12:0),//脂肪率相差规律138*zflIndex+(zflIndex>=2?12:0)
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

  }
})