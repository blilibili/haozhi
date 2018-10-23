// pages/physical/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
        {name: '18/09/15 10:50', value: '0', checked: true},
        {name: '18/09/10 10:50', value: '1'},
        {name: '18/09/10 10:50', value: '2'},
        {name: '18/08/25 10:50', value: '3'},
        {name: '18/08/25 10:50', value: '4'},
        {name: '18/08/25 10:50', value: '5'},
        {name: '18/08/25 10:50', value: '6'},
        {name: '18/08/25 10:50', value: '7'},
        {name: '18/08/25 10:50', value: '8'},
    ],
    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userid)
    
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