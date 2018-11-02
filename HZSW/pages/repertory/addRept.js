// pages/store/addRept.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statuslist:['可用','不可用'],
    statusIndex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      repertoryId:options.id
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

  bindAdressChange:function(e)
  {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      statusIndex: e.detail.value
    })
  },

  getDeviceName:function(options)
  {
    this.setData({
      deviceName:options.detail.value
    })
  },

  getDeviceId:function(options)
  {
    this.setData({
      deviceId:options.detail.value
    })
  },

  doSave:function()
  {
    if(!this.data.deviceName){
      app.showModal('请输入设备名称')
      return
    }
    if(!this.data.deviceId){
      app.showModal('请输入设备ID')
      return
    }
    if(this.data.statusIndex == -1){
      app.showModal('请选择设备状态')
      return
    }
    wx.showLoading()
    var sendata = app.addHouseEquipment(this.data.repertoryId,this.data.deviceName,this.data.deviceId,(parseInt(this.data.statusIndex)+1))
    app.send_data(sendata, util.config.url.addHouseEquipment, function (res) {
      if(res.resultCode == '10000'){
        wx.redirectTo({
          url:"/pages/repertory/detail?id="+that.data.repertoryId+"&deviceName="+that.data.deviceName
        })
      }
    })
  },
})