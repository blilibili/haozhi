// pages/device/detail.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dispatchers: [
      {name: '1', value: '门店', checked: 'true'},
      {name: '2', value: '仓库'},
    ],
    disIndex:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options)
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
    this.setData({
      disIndex:e.detail.value
    })
  },

  showDispatchBox:function()
  {
    this.setData({
      showDispatch:true,
      cancelbtn:"hideDispatchBox",
      confirmbtn:"chooseDispatch",
      title:"调度到",
    })
  },
  hideDispatchBox:function()
  {
    this.setData({
      showDispatch:false
    })
  },
  chooseDispatch:function()
  {
    console.log(this.data.disIndex)
    if(this.data.disIndex == 1){
      wx.navigateTo({
        url:"/pages/device/chooseStore"
      })
    }
    if(this.data.disIndex == 2){
      wx.navigateTo({
        url:"/pages/device/chooseRepertory"
      })
    }
  },
})