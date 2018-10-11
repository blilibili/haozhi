var utils = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agelist: ["70后", "75后", "80后", "85后"],//用户年龄段
    ageIndex: -1,
    bodylist: ["脸", "腹部", "大腿", "小腿", "手臂"],//治疗部位
    bodyIndex: -1,
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

  bindAgeChange: function(e) {
      console.log('picker ageIndex 发生选择改变，携带值为', e.detail.value);

      this.setData({
          ageIndex: e.detail.value
      })
  },

  bindBodyChange: function(e) {
      console.log('picker bodyIndex 发生选择改变，携带值为', e.detail.value);

      this.setData({
          bodyIndex: e.detail.value
      })
  },

  doSubmit:function()
  {
    wx.showModal({
      content:'是否解锁设备？',
      cancelText:'否',
      confirmText:'是',
      confirmColor:'#ff9cb8',
      success:function(res){
        if(res.confirm){
          //点击是
          wx.showToast({
            title:'解锁成功',
            icon:'success',
            mask:true,
          })
          setTimeout(function(){
            wx.navigateTo({
              url:"/pages/index/userDetail"
            })
          },2000)
        }
        if(res.cancel){
          //点击否
          wx.showToast({
            title:'解锁失败',
            image:'/image/zhuye_zhuangtai_icon_shibai.png',
            mask:true
          })
          app.showToast('请检查设备是否连接网络',that);
        }
      }
    })
  },
})