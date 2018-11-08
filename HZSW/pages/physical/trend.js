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
    tabIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      ec: {
        onInit: function (canvas, width, height) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barChart);
          barChart.setOption(that.getBarOption());
          return barChart;
        }
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
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid:{
          left:'20%', 
          top:'10%',
        },
        color:['#ff9cb8'],
        xAxis : [
            {
                type : 'value',
                axisTick : {show: false},
                splitArea: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value}次'
                }
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                splitArea: {
                    show: true
                },
                data : ['08~10点','10~12点','08~10点','08~10点','08~10点','08~10点','08~10点','08~10点','其他']
            }
        ],
        series : [
            {
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        formatter:'{c}次'
                    }
                },
                data:[32,30, 34, 37,39,45,42,60,52]
            }
            
        ]
    };
  },
})