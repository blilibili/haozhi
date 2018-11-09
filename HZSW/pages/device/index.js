// pages/device/index.js
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
    this.setData({
      userRule:app.globalData.userInfo.grade
    })

    var sendata = app.getEquipmentList(app.globalData.userInfo.grade,app.globalData.userInfo.storeId,app.globalData.userInfo.id)
    app.send_data(sendata, util.config.url.getEquipmentList, function (res) {
      if(res.resultCode == '10000' && res.resultData.length > 0){
        app.globalData.deviceList = res.resultData
        that.setData({
          hasdata:true,
          deviceList:res.resultData
        })
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
      this.setData({
        deviceList:this.data.old_deviceList
      })
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      if(this.data.old_deviceList){
        this.setData({
          deviceList:this.data.old_deviceList
        })
      }else{
        this.setData({
          old_deviceList:this.data.deviceList
        })
      }
      this.setData({
          inputVal: e.detail.value
      });
      var list = util.searchList(this.data.inputVal,'equipmentId',this.data.deviceList)
      util.zhw_log(list)
      this.setData({
        deviceList:list
      })
  },

  goDeviceList:function(options)
  {
    util.zhw_log(options)
    wx.navigateTo({
      url:"/pages/device/deviceList?equipmentId="+options.currentTarget.dataset.id
    })
  },

  doReceive:function(options)
  {
    wx.showModal({
      title: '',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#ff9cb8',
      content: '是否确认接收到设备',
      success:function(res){
        if (res.confirm) {
          util.zhw_log(options)
          wx.showLoading()
          var sendata = app.confirmReception(options.currentTarget.dataset.id)
          app.send_data(sendata, util.config.url.confirmReception, function (res) {
            if(res.resultCode == '10000'){
              wx.hideLoading()
              var deviceList = that.data.deviceList
              for (var i = 0; i < deviceList.length; i++) {
                if(deviceList[i].equipmentId == options.currentTarget.dataset.id){
                  deviceList[i].stateCode = '1'
                  deviceList[i].stateName = '空闲'
                  break;
                }
              }
              app.globalData.deviceList = deviceList
              that.setData({
                deviceList:deviceList
              })
            }
          })
        }
      }
    })
  },
})