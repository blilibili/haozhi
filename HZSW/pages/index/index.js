// pages/index/index.js
var utils = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"扫膜",
    step:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    app.globalData.userRule = 1
    if(app.globalData.userRule == 1){
      that.setData({
        userList:[1,2,3,4,5,6]
      })

      wx.setNavigationBarTitle({
        title:"我的门店"
      })
      //管理员页面
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
    }else if(app.globalData.userRule == 2){
      //店长页面
      this.forScan()
    }else{
      //普通员工页面
      this.forScan()
    }
    this.setData({
      userRule:app.globalData.userRule
    })
  },

  forScan:function()
  {
    wx.showModal({
      title:'',
      content:'是否继续扫膜？',
      cancelText:'否',
      confirmText:'是',
      confirmColor:'#ff9cb8',
      success:function(res){
        if(res.confirm){
          //点击是
        }
        if(res.cancel){
          //点击否

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

  goSearch:function()
  {
    wx.navigateTo({
      url:"/pages/index/search"
    })
  },

  doScan:function()
  {
    if(this.data.step == 1){
      wx.showToast({
        title:'信息比对中',
        icon:'loading',
        duration:2000,
        mask:true
      })
      this.setData({
        title:'扫设备',
        step:2
      })
    }else if(this.data.step == 2){
      wx.showToast({
        title:'比对成功',
        icon:'success',
        mask:true
      })
      this.setData({
        title:'扫用户',
        step:3
      })
    }else{
      wx.showToast({
        title:'比对失败',
        image:'/image/zhuye_zhuangtai_icon_shibai.png',
        mask:true
      })
      this.setData({
        title:'扫膜',
        step:1
      })
    }
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

})