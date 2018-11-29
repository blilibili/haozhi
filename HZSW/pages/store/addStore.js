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
      if(options.type == 'udit'){
        wx.setNavigationBarTitle({
          title:"编辑门店"
        })
      }else{
        wx.setNavigationBarTitle({
          title:"更换店长"
        })
      }
      var list = app.globalData.storeList
      for (var i = 0; i < list.length; i++) {
        if(options.storeId == list[i].storeId){
          util.zhw_log(list[i])
          var addrs = list[i].address.split(',')
          util.zhw_log(addrs)
          this.setData({
            isUpdate:true,
            latitude:list[i].latitude,
            longitude:list[i].longitude,
            isLocal:true,
            localtext:'重新定位',
            id:list[i].id,
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
              isLocalAgain:true,
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
    // wx.showToast({title: "邀请成功"})
    that.setData({
      inviteSuc:true,
      showInvite:false
    })
    return
    var sendata = app.inviteShopowner(this.data.phone)
    app.send_data(sendata, util.config.url.inviteShopowner, function (res) {
      if(res.resultCode == '10000'){
        if(that.data.isUpdate){
          //如果是更换店长的话，本地数据也要更换
          var list = app.globalData.storeList
          for (var i = 0; i < list.length; i++) {
            if(list[i].id == that.data.id){
              list[i].phone = that.data.phone
              var sendata = app.getStoreList(list[i].storeName)
              app.send_data(sendata, util.config.url.getStoreList, function (res) {
                if(res.resultCode == '10000'){
                  if(!res.resultData[0].imgUrl)res.resultData[0].imgUrl = '/image/huiyuan_touxiang_moren.png';
                  if(!res.resultData[0].userName)res.resultData[0].userName = res.resultData[0].phone;
                  list[i].userName = res.resultData[0].userName
                  list[i].imgUrl = res.resultData[0].imgUrl
                  app.globalData.storeList = list
                }
              })
              break
            }
          }
        }
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
    if(this.data.isUpdate){
      wx.showLoading()
      var longitude = this.data.longitude
      var latitude = this.data.latitude
      if(this.data.isLocalAgain){
        longitude = longitude.toFixed(2).toString()
        latitude = latitude.toFixed(2).toString()
      }
      var sendata = app.addStoreList(app.globalData.userInfo.id,this.data.storeName,this.data.storeId,(this.data.region+','+this.data.storeAddr),this.data.phone,longitude,latitude,this.data.id)
      app.send_data(sendata, util.config.url.addStoreList, function (res) {
        if(res.resultCode == '10000'){
          wx.redirectTo({
            url:'/pages/store/detail?storeName='+that.data.storeName
          })
        }else{
          wx.showModal({
            title: '',
            showCancel: false,
            content: util.errCode()[res.resultCode]
          })
        }
      })
      return
      wx.showLoading()
      let longitude = this.data.longitude
      let latitude = this.data.latitude
      if(this.data.isLocalAgain){
        longitude = longitude.toFixed(2).toString()
        latitude = latitude.toFixed(2).toString()
      }
      var sendata = app.updateStoreDetail(this.data.id,this.data.storeId,this.data.storeName,(this.data.region+','+this.data.storeAddr),longitude,latitude)
      app.send_data(sendata, util.config.url.updateStoreDetail, function (res) {
        if(res.resultCode == '10000'){
          var list = app.globalData.storeList
          for (var i = 0; i < list.length; i++) {
            if(list[i].id == that.data.id){
              list[i].storeName = that.data.storeName
              list[i].address = that.data.region+','+that.data.storeAddr
              list[i].longitude = longitude
              list[i].latitude = latitude
              break
            }
          }
          app.globalData.storeList = list
          wx.redirectTo({
            url:'/pages/store/detail?storeId='+that.data.storeId
          })
        }
      })
    }else{
      wx.showLoading()
      var sendata = app.addStoreList(app.globalData.userInfo.id,this.data.storeName,this.data.storeId,(this.data.region+','+this.data.storeAddr),this.data.phone,this.data.longitude.toFixed(2).toString(),this.data.latitude.toFixed(2).toString())
      app.send_data(sendata, util.config.url.addStoreList, function (res) {
        if(res.resultCode == '10000'){
          wx.redirectTo({
            url:'/pages/store/detail?storeName='+that.data.storeName
          })
        }else{
          wx.showModal({
            title: '',
            showCancel: false,
            content: util.errCode()[res.resultCode]
          })
        }
      })
    }
  },
  
})