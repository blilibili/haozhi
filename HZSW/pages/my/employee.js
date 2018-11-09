var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [],
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.showLoading();
    var sendata = app.getStaffList(app.globalData.userInfo.storeId)
    app.send_data(sendata, util.config.url.getStaffList, function (res) {
      wx.hideLoading();
      if(res.resultCode == '10000' && res.resultData.length > 0){
        var list = res.resultData
        for (var i = 0; i < list.length; i++) {
          list[i].name = list[i].name?list[i].name:list[i].phone
          list[i].imgUrl = list[i].imgUrl?list[i].imgUrl:"/image/wode_touxiang.png"
        }
        that.setData({
          hasdata:true,
          checkboxItems:list
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
        checkboxItems:this.data.old_userList
      })
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
      if(this.data.old_userList){
        this.setData({
          checkboxItems:this.data.old_userList
        })
      }else{
        this.setData({
          old_userList:this.data.checkboxItems
        })
      }
      this.setData({
          inputVal: e.detail.value
      });
      var list = util.searchList(this.data.inputVal,'phone',this.data.checkboxItems)
      util.zhw_log(list)
      this.setData({
        checkboxItems:list
      })
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
    util.zhw_log(this.data.phone)
    if(this.data.phone == undefined || this.data.phone.length < 11){
      app.showModal('请输入完整的手机号码');return;
    }
    if(!util.isPoneAvailable(this.data.phone)){
      app.showModal('请输入正确的手机号码');return;
    }
    var sendata = app.addStaff(app.globalData.userInfo.storeId,this.data.phone)
    app.send_data(sendata, util.config.url.addStaff, function (res) {
      if(res.resultCode == '10000'){
        wx.showToast({title: "邀请成功"})
        that.setData({
          showInvite:false
        })
      }
    })
  },
  phoneInput:function(options)
  {
    this.setData({
      phone:options.detail.value
    })
  },

  removeMember:function()
  {
    this.setData({
      isRemove:true
    })
  },

  doRemove:function()
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
    wx.showLoading()
    var sendata = app.deleteStaffList(delList.join(","))
    app.send_data(sendata, util.config.url.deleteStaffList, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000'){
        that.setData({
          checkboxItems:newList,
          isRemove:false
        })
      }
    })
  },

  checkboxChange: function (e) {
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