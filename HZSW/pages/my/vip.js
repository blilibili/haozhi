// pages/my/vip.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var sendata = app.getMemberList(app.globalData.userInfo.id)
    wx.showLoading();
    app.send_data(sendata, util.config.url.getMemberList, function (res) {
      wx.hideLoading();
      if(res.resultCode == '10000' && res.resultData.length > 0){
        that.setData({
          hasdata:true,
          memberList:res.resultData
        })
      }else{
        that.setData({
          hasdata:false
        })
      }
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
      this.setData({
        memberList:this.data.old_memberList
      })
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
    if(this.data.old_memberList){
      this.setData({
        memberList:this.data.old_memberList
      })
    }else{
      this.setData({
        old_memberList:this.data.memberList
      })
    }
    this.setData({
        inputVal: e.detail.value
    });
    var list = util.searchList(this.data.inputVal,'memberId',this.data.memberList)
    util.zhw_log(list)
    this.setData({
      memberList:list
    })
  }
})