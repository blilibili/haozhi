var utils = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
        {name: '员工姓名', value: '0'},
        {name: '员工姓名', value: '1'},
        {name: '员工姓名', value: '2'},
        {name: '员工姓名', value: '3'},
        {name: '员工姓名', value: '4'},
        {name: '员工姓名', value: '5'},
        {name: '员工姓名', value: '6'},
    ],
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      hasdata:false
    })
    setTimeout(function(){
      that.setData({
        hasdata:true,
      })
    },1000)
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

  showInviteBox:function()
  {
    this.setData({
      showInvite:true,
      cancelbtn:"hideInviteBox",
      sendbtn:"sendMessage",
      phoneInput:"phoneInput"
    })
  },
  hideInviteBox:function()
  {
    this.setData({
      showInvite:false
    })
  },
  sendMessage:function()
  {
    console.log("发送短信")
    this.setData({
      showInvite:false
    })
  },
  phoneInput:function(res)
  {
    console.log(res)
  },

  removeMember:function()
  {
    this.setData({
      isRemove:true
    })
  },

  doRemove:function()
  {
    this.setData({
      isRemove:false
    })
  },

  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(checkboxItems[i].value == values[j]){
                  checkboxItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          checkboxItems: checkboxItems
      });
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




})