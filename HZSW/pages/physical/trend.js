// pages/physical/trend.js
import * as echarts from '../../ec-canvas/echarts';

var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    ec: {
      lazyLoad: true 
    },
    ec2: {
      lazyLoad: true 
    },
    importImg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      memberId:options.memberId
    })
  },

  /**
   * [getData description]
   * @param  {[type]} memberId [Id(会员表主键id)]
   * @param  {[type]} type     [类型：(1:体重 2：体脂率 3：脂肪率 4：脂肪厚度)]
   * @return {[type]}          [description]
   */
  getData:function(type)
  {
    this.setData({
      isShow:false,
      importImg:false
    })
    wx.showLoading()
    var sendata = app.getTendency(this.data.memberId,type)
    app.send_data(sendata, util.config.url.getTendency, function (res) {
      if(res.resultCode == '10000'){
        wx.hideLoading()
        that.setData({
          xList:res.resultData.xList,
          yList:res.resultData.yList,
          allXList:res.resultData.allXList,
          allYList:res.resultData.allYList,
        })
        that.setData({
          ec: {
            onInit: function (canvas, width, height) {
              var barChart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(barChart);
              barChart.setOption(that.getBarOption());
              return barChart;
            }
          },
          ec2: {
            onInit: function (canvas, width, height) {
              var barChart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(barChart);
              barChart.setOption(that.getBarOption2());
              return barChart;
            }
          },
          isShow:true
        })
        that.setData({
          importImg:true
        })
      }
    })
  },

  getTrend:function(options)
  {
    util.zhw_log(options)
    var type = options.currentTarget.dataset.type
    var tabIndex = 1
    if(type == "1"){
      //体重
      tabIndex = 1
    }else if(type == "2"){
      //体脂率
      tabIndex = 2
    }else if(type == "3"){
      //脂肪率
      tabIndex = 3
    }else{
      //脂肪厚度
      tabIndex = 4
    }
    this.setData({
      tabIndex:tabIndex
    })
    this.getData(tabIndex)
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
    util.zhw_log('onShow')
    this.getData(this.data.tabIndex)
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

  getBarOption:function()
  {
    return {
        grid:{
              top:'10%',
              bottom:'10%'
            },
        color:['#ff9cb8'],
        xAxis: {
            type: 'category',
            data: that.data.xList,
            boundaryGap: false,
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            min:'dataMin'
        },
        series: [{
            data: that.data.yList,
            type: 'line',
            smooth: true,
            areaStyle: {}
        }]
    };
  },

  getBarOption2:function()
  {
    return {
        grid:{
              top:'10%',
            },
        color:['#ff9cb8'],
        xAxis: {
            type: 'category',
            data: that.data.allXList,
            boundaryGap: false,
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            min:'dataMin'
        },
        series: [{
            data: that.data.allYList,
            type: 'line',
            smooth: true,
            areaStyle: {}
        }]
    };
  },

  shareTrend:function()
  {
    this.save();
  },

  save_old:function() {
    if(!this.data.isShow){
      return
    }
    wx.getSystemInfo({
      success:function(res){
        util.zhw_log(res)
        if(res.brand.toLowerCase() == 'iphone'){
          util.zhw_log('苹果手机生成图片中....')
          wx.showLoading()
          var imgList = []
          var ecComponent = that.selectComponent('#sevenChart');
          var ecComponent2 = that.selectComponent('#allChart');
          ecComponent.canvasToTempFilePath({
            success: function (res){
              util.zhw_log(res)
              imgList.push(res.tempFilePath)
            },
            fail: function (res){
              app.showModal('分享失败')
              return
            }
          });
          setTimeout(function(){
            ecComponent2.canvasToTempFilePath({
              success: function (res){
                util.zhw_log(res)
                imgList.push(res.tempFilePath)
                util.zhw_log(imgList)
                wx.previewImage({
                  urls: imgList,
                  success:function(res){
                    wx.hideLoading()
                    util.zhw_log(res)
                  },
                  fail:function(err){
                    util.zhw_log(err)
                  }
                })
              },
              fail: function (res){
                app.showModal('分享失败')
                return
              }
            });
    },1000)
        }else{
          util.zhw_log('安卓手机生成图片中....')
          wx.showLoading()
            var imgList = []
            var ecComponent = that.selectComponent('#sevenChart');
            ecComponent.canvasToTempFilePath({
              success: function (res){
                util.zhw_log(res)
                imgList.push(res.tempFilePath)
                wx.previewImage({
                  urls: imgList,
                  success:function(res){
                    wx.hideLoading()
                    util.zhw_log(res)
                  },
                  fail:function(err){
                    util.zhw_log(err)
                  }
                })
              },
              fail: function (res){
                app.showModal('分享失败')
                return
              }
            },false);
        }
      }
    })
    
    return
    setTimeout(function(){
      util.zhw_log('跑定时')
      var ecComponent2 = that.selectComponent('#sevenChart');
      util.zhw_log('ecComponent2')
      util.zhw_log(ecComponent2)
      ecComponent2.canvasToTempFilePath({
        success: function (res){
          util.zhw_log(res)
          wx.hideLoading()
          imgList.push(res.tempFilePath)
          util.zhw_log(imgList)
          wx.previewImage({
            urls: imgList,
            success:function(res){
              util.zhw_log(res)
            },
            fail:function(err){
              util.zhw_log(err)
            }
          })
        },
        fail: function (res){
          app.showModal('分享失败')
        }
      });
    },1000)
  },

  save:function() {
    if(!this.data.isShow){
      return
    }
    // 保存图片到临时的本地文件
    wx.showLoading()
    util.zhw_log('生成图片中....')
    var imgList = []
    var ecComponent = this.selectComponent('#sevenChart');
    util.zhw_log('ecComponent')
    util.zhw_log(ecComponent)
    ecComponent.canvasToTempFilePath({
      success: function (res){
        util.zhw_log(res)
        imgList.push(res.tempFilePath)
        wx.previewImage({
          urls: imgList,
          success:function(res){
            wx.hideLoading()
            util.zhw_log(res)
          },
          fail:function(err){
            util.zhw_log(err)
          }
        })
      },
      fail: function (res){
        app.showModal('分享失败')
      }
    });
  },

  save2:function() {
    if(!this.data.isShow){
      return
    }
    // 保存图片到临时的本地文件
    wx.showLoading()
    util.zhw_log('生成图片2中....')
    var imgList = []
    var ecComponent = this.selectComponent('#allChart');
    util.zhw_log('ecComponent')
    util.zhw_log(ecComponent)
    ecComponent.canvasToTempFilePath({
      success: function (res){
        util.zhw_log(res)
        imgList.push(res.tempFilePath)
        wx.previewImage({
          urls: imgList,
          success:function(res){
            wx.hideLoading()
            util.zhw_log(res)
          },
          fail:function(err){
            util.zhw_log(err)
          }
        })
      },
      fail: function (res){
        app.showModal('分享失败')
      }
    });
  }
})