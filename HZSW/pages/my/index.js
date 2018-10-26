// pages/my/index.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(app.globalData.userInfo)
    if(app.globalData.userInfo.grade == "1")
    {
      //管理员
      app.globalData.isPhysical = false
      that.setData({
        userRule:1,
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
    if(app.globalData.userInfo.grade == "2")
    {
      //店长
      that.setData({
        userRule:2
      })
    }
    if(app.globalData.userInfo.grade == "3")
    {
      //店员
      that.setData({
        userRule:3
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(!wx.getStorageSync('wx_user')){
      //是否已有头像
      if(app.globalData.userInfo.imgUrl){
        app.globalData.userInfo.avatar = app.globalData.userInfo.imgUrl
      }else{
        app.globalData.userInfo.avatar = '/image/huiyuan_touxiang_moren.png';
      }
    }else{
      app.globalData.userInfo.avatar = wx.getStorageSync('wx_user').avatarUrl;
      var sendata = app.addImg(app.globalData.userInfo.phone,app.globalData.userInfo.avatar)
      app.send_data(sendata, util.config.url.addImg, function (res) {
        if(res.resultCode == '10000'){
          util.zhw_log('更新头像')
          //如果不是管理员则本地保存信息
          if(app.globalData.userInfo.grade != 1){
            wx.setStorageSync('userinfo',app.globalData.userInfo)
          }
        }
      })
    }
    this.setData({
      userinfo:app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userinfo:app.globalData.userInfo
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

  toDevice:function()
  {
    // app.globalData.isPhysical = false
    wx.navigateTo({
      url:"/pages/device/index"
    })
  },
})