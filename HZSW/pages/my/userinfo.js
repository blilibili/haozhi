// pages/my/userinfo.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexItem:['男','女'],
    sexIndex:'',
    userinfo:'',
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
    var user = app.globalData.userInfo
    user.mobile = util.getPhone(user.phone,4)
    this.setData({
      userinfo:user,
      sexIndex:(user.sex-1)
    })
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

  bindSexChange:function(e)
  {
    var sex = (parseInt(e.detail.value)+1);
    var sendata = app.updateSex(this.data.userinfo.id,sex)
    app.send_data(sendata, util.config.url.updateSex, function (res) {
      if(res.resultCode == '10000'){
        //如果不是管理员则本地保存信息
        app.globalData.userInfo.sex = sex
        if(app.globalData.userInfo.grade != 1){
          wx.setStorageSync('userinfo',app.globalData.userInfo)
        }
        that.setData({
          sexIndex:sex-1
        })
      }
    })
  },
})