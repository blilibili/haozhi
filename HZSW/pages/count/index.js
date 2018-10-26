// pages/count/index.js
var utils = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
        {name: '18/09/15 10:50', value: '0', checked: true},
        {name: '18/09/10 10:50', value: '1'},
        {name: '18/09/10 10:50', value: '2'},
        {name: '18/08/25 10:50', value: '3'},
        {name: '18/08/25 10:50', value: '4'},
        {name: '18/08/25 10:50', value: '5'},
        {name: '18/08/25 10:50', value: '6'},
        {name: '18/08/25 10:50', value: '7'},
        {name: '18/08/25 10:50', value: '8'},
    ],
    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if(app.globalData.userInfo.grade == 1){
      wx.setNavigationBarTitle({
        title:"我的仓库"
      })
    }
    this.setData({
      userRule:app.globalData.userInfo.grade
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

  /*我的仓库===============================================================*/

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

  
})