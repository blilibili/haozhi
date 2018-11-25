// pages/store/detail.js
var util = require("../../utils/util.js");
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
    util.zhw_log(options)
    if(options.storeId){
      var list = app.globalData.storeList
      for (var i = 0; i < list.length; i++) {
        if(options.storeId == list[i].storeId){
          if(!list[i].imgUrl)list[i].imgUrl = '/image/huiyuan_touxiang_moren.png';
          if(!list[i].userName)list[i].userName = list[i].phone;
          this.setData({
            store:list[i]
          })
          break;
        }
      }
    }else if(options.storeName){
      wx.showLoading()
      var sendata = app.getStoreList(options.storeName)
      app.send_data(sendata, util.config.url.getStoreList, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000'){
          var storeinfo = res.resultData[0]
          if(!storeinfo.imgUrl)storeinfo.imgUrl = '/image/huiyuan_touxiang_moren.png';
          if(!storeinfo.userName)storeinfo.userName = storeinfo.phone;
          var isUpdate = false
          //是否是更新本地数据
          var list = app.globalData.storeList
          for (var i = 0; i < list.length; i++) {
            if(storeinfo.storeId == list[i].storeId){
              //更新
              util.zhw_log('更新门店')
              isUpdate = true
              list[i].phone = storeinfo.phone;
              list[i].imgUrl = storeinfo.imgUrl;
              list[i].userName = storeinfo.userName;
              break;
            }
          }
          util.zhw_log(list)
          app.globalData.storeList = list
          if(!isUpdate){
            app.globalData.storeList.push(storeinfo)
          }
          that.setData({
            store:storeinfo
          })
        }else{

        }
      })
    }else{

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

  doChange:function()
  {
    wx.redirectTo({
      url:"/pages/store/addStore?storeId="+this.data.store.storeId
    })
  },

  doUdit:function()
  {
    wx.redirectTo({
      url:"/pages/store/addStore?storeId="+this.data.store.storeId+"&type=udit"
    })
  },
})