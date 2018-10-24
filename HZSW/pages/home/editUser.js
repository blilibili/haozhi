// pages/home/editUser.
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '1', name: '男', checked: 'true'},
      {value: '2', name: '女'},
    ],
    sexIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (wx.getStorageSync('wx_user')) {
      this.setData({
        hasAvatar:true,
        avatar:wx.getStorageSync('wx_user').avatarUrl
      })
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

  radioChange: function(e) {
    var items = this.data.items
    var value = e.detail.value;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == value
    }

    this.setData({
      items: items,
      sexIndex:value
    });
  },

  doEdit:function()
  {
    if(this.data.name == undefined || this.data.name.length < 1){
      app.showModal('姓名不能为空')
      return
    }
    var sendata = app.perfectInformation(this.data.name,this.data.sexIndex)
    wx.showLoading();
    app.send_data(sendata, util.config.url.perfectInformation, function (res) {
      if(res.resultCode == '10000'){
        //如果不是管理员则本地保存信息
        app.globalData.userInfo.name = that.data.name
        app.globalData.userInfo.sex = that.data.sexIndex
        if(app.globalData.userInfo.grade != 1){
          wx.setStorageSync('userinfo',app.globalData.userInfo)
        }
        wx.switchTab({
          url:"/pages/my/index"
        })
      }
    })
    return;
    wx.redirectTo({
      url:"/pages/home/index"
    })
  },

  getName:function(options)
  {
    this.setData({
      name:options.detail.value
    })
  },

  getUserInfo:function(options)
  {
    util.zhw_log(options)
    var wx_user = JSON.parse(options.detail.rawData);
    wx.setStorageSync('wx_user',wx_user)
    this.setData({
      hasAvatar:true,
      avatar:wx_user.avatarUrl
    })
  },
})