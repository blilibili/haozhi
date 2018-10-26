// pages/device/index.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
        {name: '员工姓名', value: '0'},
        {name: '员工姓名', value: '1'},
        {name: '员工姓名', value: '2'},
        {name: '员工姓名', value: '3'},
        {name: '员工姓名', value: '4'},
        {name: '员工姓名', value: '5'},
        {name: '员工姓名', value: '6'},
        {name: '员工姓名', value: '7'},
        {name: '员工姓名', value: '8'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      hasStore:false
    })
    setTimeout(function(){
      that.setData({
        hasStore:true,
      })
    },1000)
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

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },

  goDeviceList:function(options)
  {
    util.zhw_log(options)
    wx.navigateTo({
      url:"/pages/device/deviceList?storeid="+options.currentTarget.dataset.id
    })
  },

  doReceive:function(options)
  {
    wx.showModal({
      title: '',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#ff9cb8',
      content: '是否确认接收到设备',
      success:function(res){
        if (res.confirm) {
          util.zhw_log(options)
        }
      }
    })
  },
})