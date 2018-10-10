// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"扫膜",
    step:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.showModal({
      title:'',
      content:'是否继续扫膜？',
      cancelText:'否',
      confirmText:'是',
      confirmColor:'#ff9cb8',
      success:function(res){
        if(res.confirm){
          //点击是
        }
        if(res.cancel){
          //点击否

        }
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

  goSearch:function()
  {
    wx.navigateTo({
      url:"/pages/index/search"
    })
  },

  doScan:function()
  {
    if(this.data.step == 1){
      wx.showToast({
        title:'信息比对中',
        icon:'loading',
        duration:2000,
        mask:true
      })
      this.setData({
        title:'扫设备',
        step:2
      })
    }else if(this.data.step == 2){
      wx.showToast({
        title:'比对成功',
        icon:'success',
        duration:2000,
        mask:true
      })
      this.setData({
        title:'扫用户',
        step:3
      })
    }else{
      wx.showToast({
        title:'比对失败',
        image:'/image/zhuye_zhuangtai_icon_shibai.png',
        duration:2000,
        mask:true
      })
      this.setData({
        title:'扫膜',
        step:1
      })
    }
  },

})