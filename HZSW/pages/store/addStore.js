// pages/store/addStore.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionIndex: -1,
    localtext:'立即定位',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
        console.log(res)
        that.setData({
          isLocal:true,
          localtext:'重新定位'
        })
      },
      fail:function(err){
        console.log(err)
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

  sendMessage:function()
  {
    console.log("发送短信")
    this.setData({
      inviteSuc:true,
      showInvite:false
    })
  },

  phoneInput:function(res)
  {
    console.log(res)
  },
})