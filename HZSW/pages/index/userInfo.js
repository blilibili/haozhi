var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agelist: ["70后", "75后", "80后", "85后", "90后"],//用户年龄段
    ageIndex: -1,
    bodylist: ["脸", "腹部", "大腿", "小腿", "手臂"],//治疗部位
    bodyIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    app.globalData.memberUserInfo.detectionTime = util.getDetectionTime()
    util.zhw_log(app.globalData.memberUserInfo)
    this.setData({
      userinfo:app.globalData.memberUserInfo
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

  bindAgeChange: function(e) {
      console.log('picker ageIndex 发生选择改变，携带值为', e.detail.value);

      this.setData({
          ageIndex: e.detail.value
      })
  },

  bindBodyChange: function(e) {
      console.log('picker bodyIndex 发生选择改变，携带值为', e.detail.value);

      this.setData({
          bodyIndex: e.detail.value
      })
  },

  getweight:function(options)
  {
    this.setData({
      weight:options.detail.value
    })
  },

  getbust:function(options)
  {
    this.setData({
      bust:options.detail.value
    })
  },

  getwaist:function(options)
  {
    this.setData({
      waist:options.detail.value
    })
  },

  gethipline:function(options)
  {
    this.setData({
      hipline:options.detail.value
    })
  },

  getbodyFat:function(options)
  {
    this.setData({
      bodyFat:options.detail.value
    })
  },

  getfatRate:function(options)
  {
    this.setData({
      fatRate:options.detail.value
    })
  },

  getfat:function(options)
  {
    this.setData({
      fat:options.detail.value
    })
  },

  doSubmit:function()
  {
    if(this.data.ageIndex == -1 ||
      this.data.bodyIndex == -1 ||
      !this.data.weight ||
      !this.data.bust ||
      !this.data.waist ||
      !this.data.hipline ||
      !this.data.bodyFat ||
      !this.data.fatRate ||
      !this.data.fat){
      app.showModal('请将表单输入完整')
      return
    }
    var user = app.globalData.memberUserInfo
    user.userId = app.globalData.userInfo.id
    user.storeId = app.globalData.userInfo.storeId
    user.age = this.data.agelist[this.data.ageIndex]
    user.part = this.data.bodylist[this.data.bodyIndex]
    user.memberId = this.data.userinfo.memberId
    user.membranceId = this.data.userinfo.membranceId
    user.equipmentId = this.data.userinfo.equipmentId
    user.detectionTime = this.data.userinfo.detectionTime
    user.weight = this.data.weight
    user.bust = this.data.bust
    user.waist = this.data.waist
    user.hipline = this.data.hipline
    user.bodyFat = this.data.bodyFat
    user.fatRate = this.data.fatRate
    user.fat = this.data.fat
    app.globalData.memberUserInfo = user

    var sendata = app.addDetectionRecord(user)
    app.send_data(sendata, util.config.url.addDetectionRecord, function (res) {
      if(res.resultCode == '10000'){
        wx.showModal({
          content:'是否解锁设备？',
          cancelText:'否',
          confirmText:'是',
          confirmColor:'#ff9cb8',
          success:function(res){
            if(res.confirm){
              var sendata = app.confirmUnlock(that.data.userinfo.equipmentId,that.data.userinfo.memberId)
              app.send_data(sendata, util.config.url.confirmUnlock, function (res) {
                if(res.resultCode == '10000'){
                  wx.showToast({
                    title:'解锁成功',
                    icon:'success',
                    mask:true,
                  })
                  setTimeout(function(){
                    wx.navigateTo({
                      url:"/pages/index/userDetail"
                    })
                  },2000)
                }else{
                  wx.showToast({
                    title:'解锁失败',
                    image:'/image/zhuye_zhuangtai_icon_shibai.png',
                    mask:true
                  })
                  setTimeout(function(){
                    app.showToast('请检查设备是否连接网络',that);
                  },1500)
                }
              })
            }
          }
        })
      }
    })
  },
})