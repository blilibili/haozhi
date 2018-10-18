// pages/my/index.js
var utils = require("../../utils/util.js");
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
    wx.showModal({
        title: '',
        content:'是否是管理员',
        cancelText:'否',
        confirmText:'是',
        success: function(e) {
          if (e.confirm) {
            app.globalData.userRule = 1
            that.setData({
              userRule:1
            })
            wx.setTabBarItem({
              index:0,
              text:"门店",
              iconPath:"image/zhuye_nav_icon_dianpu.png",
              selectedIconPath:"image/zhuye_nav_icon_dianpu_pre.png",
            })
            wx.setTabBarItem({
              index:1,
              text:"设备",
              iconPath:"image/zhuye_nav_icon_shebei.png",
              selectedIconPath:"image/zhuye_nav_icon_shebei_pre.png",
            })
            wx.setTabBarItem({
              index:2,
              text:"仓库",
              iconPath:"image/zhuye_nav_icon_cangku.png",
              selectedIconPath:"image/zhuye_nav_icon_cangku_pre.png",
            })
          }
          if (e.cancel) {
            app.globalData.userRule = 2
            that.setData({
              userRule:2
            })
          }
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

  toDevice:function()
  {
    wx.switchTab({
      url:"/pages/device/index"
    })
  },
})