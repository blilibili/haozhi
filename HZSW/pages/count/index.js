// pages/count/index.js
import * as echarts from '../../ec-canvas/echarts';

var util = require("../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit:false,
    repertoryList:[],
    devices:["设备1","设备2","设备3","设备4"],
    timelist:['08~10点','10~12点','08~10点','08~10点','08~10点','08~10点','08~10点','08~10点','其他'],
    valuelist:[32,30, 34, 37,39,45,42,60,52],
    deviceIndex:-1,
    startDate:'',
    endDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      userRule:app.globalData.userInfo.grade
    })
    if(app.globalData.userInfo.grade == 1){
      wx.setNavigationBarTitle({
        title:"我的仓库"
      })
    }else{
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
    }
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.userInfo.grade == 1){
      wx.showLoading()
      var sendata = app.getStoreHouseList()
      app.send_data(sendata, util.config.url.getStoreHouseList, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000' && res.resultData.length > 0){
          that.setData({
            repertoryList:res.resultData
          })
        }
      })
    }
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

  /*统计===========================================================*/
  bingDeviceChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deviceIndex: e.detail.value
    })
  },

  bindStartDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  /*我的仓库========================================================*/

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },

  
})