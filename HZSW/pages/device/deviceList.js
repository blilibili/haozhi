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
    dispatchers: [
      {name: '4', value: '轻度故障(不影响使用)', checked: 'true'},
      {name: '3', value: '故障(完全不能使用)'},
    ],
    disIndex:4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.zhw_log(options.equipmentId)
    that = this
    var devices = app.globalData.deviceList
    for (var i = 0; i < devices.length; i++) {
      if(devices[i].equipmentId == options.equipmentId){
        this.setData({
          device:devices[i]
        })
        break
      }
    }
    if(this.data.device.stateCode == 3||this.data.device.stateCode == 4){
      this.setData({
        hasFeedback:true
      })
    }
    util.zhw_log(this.data.device)
    var sendata = app.getEquipmentDetail(this.data.device.equipmentId)
    app.send_data(sendata, util.config.url.getEquipmentDetail, function (res) {
      if(res.resultCode == '10000' && res.resultData.length > 0){
        app.globalData.deviceListItem = res.resultData
        that.setData({
          hasdata:true,
          checkboxItems:res.resultData
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
        app.globalData.deviceListItem = newList
        that.setData({
          checkboxItems:newList
        })
      }
    })
    
  },
  selectAll:function()
  {
    var checkboxItems = this.data.checkboxItems
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = true;
    }
    this.setData({
      checkboxItems: checkboxItems,
      isSelectAll:true
    });
  },

  cancelAll:function()
  {
    var checkboxItems = this.data.checkboxItems
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
    }
    this.setData({
      checkboxItems: checkboxItems,
      isSelectAll:false
    });
  },

  radioChange: function(e) {
    this.setData({
      disIndex:e.detail.value
    })
  },

  showDispatchBox:function()
  {
    this.setData({
      showDispatch:true,
      cancelbtn:"hideDispatchBox",
      confirmbtn:"doSubmit",
      title:"选择设备状态",
    })
  },
  hideDispatchBox:function()
  {
    this.setData({
      showDispatch:false
    })
  },

  doSubmit:function()
  {
    util.zhw_log("设备故障反馈")
    wx.showModal({
      title:'',
      content:'确定要提交设备故障反馈吗？',
      cancelText:'否',
      confirmText:'是',
      confirmColor:'#ff9cb8',
      success:function(res){
        if(res.confirm){
          //点击是
          var device = that.data.device
          wx.showLoading()
          var sendata = app.breakdownFeedback(device.equipmentId,that.data.disIndex)
          app.send_data(sendata, util.config.url.breakdownFeedback, function (res) {
            if(res.resultCode == '10000'){
              wx.hideLoading()

              device.stateCode = that.data.disIndex
              device.stateName = that.data.disIndex == 3?'故障':'轻度故障';
              that.setData({
                device:device,
                hasFeedback:true
              })

              var deviceList = app.globalData.deviceList
              for (var i = 0; i < deviceList.length; i++) {
                if(deviceList[i].equipmentId == device.equipmentId){
                  deviceList[i].stateCode = device.stateCode
                  deviceList[i].stateName = device.stateName
                  break;
                }
              }
              app.globalData.deviceList = deviceList
              
              that.hideDispatchBox()
            }
          })
        }
        if(res.cancel){
          //点击否

        }
      }
    })
  },


})