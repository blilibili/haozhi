// pages/count/index.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit:false,
    devicesList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    util.zhw_log(options.id)
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
    var sendata = app.getHouseEquipment(this.data.repertoryId)
    app.send_data(sendata, util.config.url.getHouseEquipment, function (res) {
      if(res.resultCode == '10000' && res.resultData.length > 0){
        app.globalData.repertoryList = res.resultData
        that.setData({
          devicesList:res.resultData
        })
      }else{
        that.setData({
          devicesList:[]
        })
      }
    })
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

  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var devicesList = this.data.devicesList, values = e.detail.value;
      for (var i = 0, lenI = devicesList.length; i < lenI; ++i) {
          devicesList[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(devicesList[i].id == values[j]){
                  devicesList[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          devicesList: devicesList
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
    if(this.data.devicesList.length < 1)return;
    this.setData({
      isEdit:true
    })
  },
  selectAll:function()
  {
    var devicesList = this.data.devicesList
    for (var i = 0, lenI = devicesList.length; i < lenI; ++i) {
      devicesList[i].checked = true;
    }
    this.setData({
      devicesList: devicesList
    });
  },
  doDel:function()
  {
    var delList = []
    var devicesList = this.data.devicesList
    var newList = []
    for (var i = 0, lenI = devicesList.length; i < lenI; ++i) {
      if(devicesList[i].checked){
        delList.push(devicesList[i].id)
      }else{
        newList.push(devicesList[i])
      }
    }
    if(delList.length == 0){
      app.showModal('请至少选择一项')
      return
    }
    wx.showLoading()
    var sendata = app.removeHouseEquipment(delList.join(","))
    app.send_data(sendata, util.config.url.removeHouseEquipment, function (res) {
      if(res.resultCode == '10000'){
        wx.hideLoading()
        that.setData({
          devicesList:newList
        })
      }
    })
  },
  addRepertory:function()
  {
    wx.navigateTo({
      url:"/pages/repertory/addRept?id="+this.data.repertoryId
    })
  },
})