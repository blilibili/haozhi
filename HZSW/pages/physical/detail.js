// pages/physical/detail.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [],
    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options.memberId)
    this.setData({
      memberId:options.memberId
    })
    var sendata = app.getDetectionRecordList(options.memberId)
    app.send_data(sendata, util.config.url.getDetectionRecordList, function (res) {
      if(res.resultCode == '10000' && res.resultData.length > 0){
        that.setData({
          hasdata:true,
          checkboxItems:res.resultData
        })
        app.globalData.memberPhysicalList = res.resultData
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

  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(checkboxItems[i].id == values[j]){
                  checkboxItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          checkboxItems: checkboxItems
      });
  },

  doCancle:function()
  {
    this.setData({
      isEdit:false
    })
  },
  doEdit:function()
  {
    this.setData({
      isEdit:true
    })
  },
  selectAll:function()
  {
    var checkboxItems = this.data.checkboxItems
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = true;
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
  doDel:function()
  {
    var delList = []
    var checkboxItems = this.data.checkboxItems
    var newList = []
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if(checkboxItems[i].checked){
        delList.push(checkboxItems[i].id)
      }else{
        newList.push(checkboxItems[i])
      }
    }
    var sendata = app.deleteDetectionRecord(delList.join(","))
    app.send_data(sendata, util.config.url.deleteDetectionRecord, function (res) {
      if(res.resultCode == '10000'){
        that.setData({
          checkboxItems:newList
        })
      }
    })
  },
  goTrend:function()
  {
    wx.navigateTo({
      url:"/pages/physical/trend?memberId="+this.data.memberId
    })
  }
})