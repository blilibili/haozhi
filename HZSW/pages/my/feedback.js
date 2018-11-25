// pages/my/feedback.js
var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imagesList: [],
    list:['设备轻度故障(不影响使用)','设备故障(完全不能使用)','其他问题反馈'],
    index:-1,
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

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  chooseImage: function () {
    if(this.data.imageList.length >= 9){
      app.showModal('图片不能超过9张')
      return
    }
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (data) {
        wx.showLoading({title:'上传中'})
        util.zhw_log(data)
        wx.uploadFile({
          url: 'https://mylidan.com/api/'+util.config.url.saveFiles,
          filePath: data.tempFilePaths[0],
          name: 'file',
          formData: {"token":app.globalData.userInfo.token},
          success:function(res){
            var res = JSON.parse(res.data)
            util.zhw_log(res)
            that.setData({
              imageList: that.data.imageList.concat(data.tempFilePaths),
              imagesList:that.data.imagesList.concat(res.resultData[0].url)
            })
          },
          fail:function(err){
            util.zhw_log(err)
          },
          complete:function()
          {
            wx.hideLoading()
          }
        })
      },
      fail:function(err){
        util.zhw_log(err)
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  chooseVideo:function(e)
  {
    if(this.data.video){
      app.showModal('请勿重复上传视频')
      return
    }
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 10,
      camera: 'back',
      success(data) {
        util.zhw_log(data)
        if(data.duration>10){
          app.showModal('视频长度不能大于10秒')
          return
        }
        wx.showLoading({title:'上传中'})
        wx.uploadFile({
          url: 'https://mylidan.com/api/'+util.config.url.saveFiles,
          filePath: data.tempFilePath,
          name: 'file',
          formData: {"token":app.globalData.userInfo.token},
          success:function(res){
            util.zhw_log(res)
            var res = JSON.parse(res.data)
            util.zhw_log(res)
            that.setData({
              video:data.tempFilePath,
              videoList:res.resultData[0].url
            })
          },
          fail:function(err){
            util.zhw_log(err)
          },
          complete:function()
          {
            wx.hideLoading()
          }
        })
      },
      fail:function(err){
        util.zhw_log(err)
      }
    })
  },

  getQA:function(options)
  {
    this.setData({
      QAcontent:options.detail.value
    })
  },

  getQQ:function(options)
  {
    this.setData({
      qq:options.detail.value
    })
  },

  doSave:function()
  {
    if(this.data.index == -1){
      app.showModal('请选择反馈类型')
      return
    }
    if(!this.data.QAcontent){
      app.showModal('请输入问题和意见')
      return
    }
    var sendata = app.saveSuggest(app.globalData.userInfo.name,(parseInt(this.data.index)+1),this.data.QAcontent,this.data.imagesList.toString(),this.data.videoList,this.data.qq)
    util.zhw_log(sendata)
    wx.showLoading();
    app.send_data(sendata, util.config.url.saveSuggest, function (res) {
      if(res.resultCode == '10000'){
        wx.hideLoading()
        // app.showModal('反馈成功')
        wx.navigateBack()
      }
    })
  },
})