// pages/device/chooseRepertory.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options)
    this.setData({
      equipmentId:options.id
    })
    wx.showLoading()
    var sendata = app.getStoreHouseList()
    app.send_data(sendata, util.config.url.getStoreHouseList, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000' && res.resultData.length > 0){
        that.setData({
          checkboxItems:res.resultData
        })
      }else{
        
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
          if(checkboxItems[i].id == values){
              checkboxItems[i].checked = true;
          }else{
              checkboxItems[i].checked = false;
          }
      }
      this.setData({
          checkboxItems: checkboxItems,
          id:values
      });
  },

  selectRepertory:function()
  {
    wx.showLoading()
    var sendata = app.dispatchEquipment("1",this.data.id,this.data.equipmentId)
    app.send_data(sendata, util.config.url.dispatchEquipment, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000'){
        //替换设备的仓库
        var storeList = that.data.checkboxItems
        var houseName = ''
        for (var i = 0; i < storeList.length; i++) {
          if(storeList[i].id == that.data.id){
            houseName = storeList[i].houseName
          }
        }
        util.zhw_log('修改后的仓库名称是：'+houseName)
        //拿到该设备信息
        var list = app.globalData.deviceList
        for (var i = 0; i < list.length; i++) {
          if(list[i].id == that.data.equipmentId){
            list[i].houseName = houseName
          }
        }
        app.globalData.deviceList = list
        wx.redirectTo({
          url:"/pages/device/disSuccess?type=repertory&equipmentId="+that.data.equipmentId
        })
      }
    })
  },
})