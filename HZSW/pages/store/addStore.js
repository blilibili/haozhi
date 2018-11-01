// pages/store/addStore.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionIndex: -1,
    regionDefault:['广东省', '广州市', '天河区'],
    localtext:'立即定位',
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
          var addrs = list[i].address.split(',')
          util.zhw_log(addrs)
          this.setData({
            storeId:list[i].storeId,
            storeName:list[i].storeName,
            regionIndex:-2,
            regionDefault:[addrs[0],addrs[1],addrs[2]],
            region:addrs[0]+','+addrs[1]+','+addrs[2],
            storeAddr:addrs[3],
          })
          break;
        }
      }
    }else{
      var storeId = new Date().getTime()
      this.setData({
        storeId:storeId
      })
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

  bindAdressChange:function(e)
  {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      regionIndex: 1,
      region: e.detail.value
    })
  },

  getLocation:function()
  {
    wx.getLocation({
      success:function(res){
        wx.chooseLocation({
          success:function(res){
            util.zhw_log(res)
            that.setData({
              latitude:res.latitude,
              longitude:res.longitude,
              isLocal:true,
              localtext:'重新定位'
            })
          },
          fail:function(err){
            util.zhw_log(err)
          }
        })
      },
      fail:function(err){
        util.zhw_log(err)
      }
    })
  },

  inviteStoreAdmin:function()
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

  phoneInput:function(options)
  {
    this.setData({
      phone:options.detail.value
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
    var sendata = app.inviteShopowner(this.data.phone)
    app.send_data(sendata, util.config.url.inviteShopowner, function (res) {
      if(res.resultCode == '10000'){
        wx.showToast({title: "邀请成功"})
        that.setData({
          inviteSuc:true,
          showInvite:false
        })
      }
    })
  },

  getStoreName:function(options)
  {
    this.setData({
      storeName:options.detail.value
    })
  },
  getStoreId:function(options)
  {
    this.setData({
      storeId:options.detail.value
    })
  },
  getStoreAddr:function(options)
  {
    this.setData({
      storeAddr:options.detail.value
    })
  },
  doSave:function()
  {
    if(!this.data.storeName){
      app.showModal('请输入门店名称')
      return
    }
    // if(!this.data.storeId){
    //   app.showModal('请输入门店ID')
    //   return
    // }
    if(this.data.regionIndex == -1){
      app.showModal('请选择门店地址')
      return
    }
    if(!this.data.storeAddr){
      app.showModal('请输入详细地址')
      return
    }
    if(!this.data.isLocal){
      app.showModal('请先进行地图定位')
      return
    }
    if(!this.data.inviteSuc){
      app.showModal('请邀请新店长')
      return
    }
    wx.showLoading()
    var sendata = app.addStoreList(app.globalData.userInfo.id,this.data.storeName,this.data.storeId,(this.data.region+','+this.data.storeAddr),this.data.phone)
    app.send_data(sendata, util.config.url.addStoreList, function (res) {
      if(res.resultCode == '10000'){
        wx.redirectTo({
          url:'/pages/store/detail?storeName='+that.data.storeName
        })
      }
    })
  },
  
})