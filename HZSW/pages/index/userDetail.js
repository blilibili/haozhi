// pages/index/userDetail.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tzlList:['危险','优良','良好','警戒','超标','严重'],
    tzlListCode:{'a':0,'b':1,'c':2,'d':3,'e':4,'f':5},
    tzlIndex:0,
    tzlEffect:4,
    zflList:['低','标准','偏高','高'],
    zflListCode:{'a':0,'b':1,'c':2,'d':3},
    zflIndex:0,
    zflEffect:24,
    zfhdEffect:0,//0<=x<=528
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options)
    var userinfo = ''
    if(options.memberId){
      var list = app.globalData.memberPhysicalList
      for (var i = 0; i < list.length; i++) {
        if(list[i].id == options.id){
          userinfo = list[i]
          break
        }
      }
      userinfo.memberId = options.memberId
      this.setDetail(userinfo)
    }else if(options.equipmentId){
      var list = app.globalData.deviceListItem
      for (var i = 0; i < list.length; i++) {
        if(list[i].id == options.id){
          userinfo = list[i]
          break
        }
      }
      userinfo.memberId = options.equipmentId
      this.setDetail(userinfo)
    }else{
      var sendata = app.getDetectionRecordList(app.globalData.memberUserInfo.memberId)
      app.send_data(sendata, util.config.url.getDetectionRecordList, function (res) {
        if(res.resultCode == '10000' && res.resultData.length > 0){
          userinfo = res.resultData[res.resultData.length-1]
          that.setDetail(userinfo)
        }else{
          userinfo = app.globalData.memberUserInfo
          userinfo.bodyFatCode = 'a'
          userinfo.fatRateCode = 'a'
          that.setDetail(userinfo)
        }
      })
    }
  },

  setDetail:function(userinfo)
  {
    util.zhw_log(userinfo)
    let tzlIndex = this.data.tzlListCode[userinfo.bodyFatCode];
    let zflIndex = this.data.zflListCode[userinfo.fatRateCode];
    this.setData({
      userinfo:userinfo,
      zflIndex:zflIndex,
      zflEffect:this.data.zflEffect+138*zflIndex+(zflIndex>=2?12:0),//脂肪率相差规律138*zflIndex+(zflIndex>=2?12:0)
      tzlIndex:tzlIndex,
      tzlEffect:this.data.tzlEffect+90*tzlIndex,//体脂率每格相差90rpx
      zfhdEffect:528*(userinfo.fat/40),//脂肪厚度
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

  }
})