// pages/index/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '256321456', name: '周梓轩',id:'ID:256321456'},
      {value: '256321457', name: '张小睿',id:'ID:256321457'},
      {value: '256321458', name: '周梓轩',id:'ID:256321458'},
      {value: '256321459', name: '张小睿',id:'ID:256321459'},
    ]
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

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });

  },

  goInfo:function()
  {
    wx.navigateTo({
      url:"/pages/index/userInfo?id="
    })
  },
})