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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      memberId:options.memberId
    })
    this.getData(1)
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
      isShow:false
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
})