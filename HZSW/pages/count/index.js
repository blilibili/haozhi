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
    devices:[],
    xList:[],
    yList:[],
    deviceIndex:-1,
    startDate:'',
    endDate:'',
    ec: {
      lazyLoad: true 
    },
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
      var sendata = app.getMenuEquipment(app.globalData.userInfo.storeId,app.globalData.userInfo.id)
      app.send_data(sendata, util.config.url.getMenuEquipment, function (res) {
        if(res.resultCode == '10000'&&res.resultData.length>0){
          var list = res.resultData
          var devices = []
          for (var i = 0; i < list.length; i++) {
            devices.push(list[i].equipmentName)
          }
          that.setData({
            devices:devices,
            devicesList:list
          })
        }else{

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
                },
                axisLine:{
                    show:false
                }
            }
        ],
        yAxis : [
            {
                type : 'category',
                splitArea: {
                    show: true
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false,
                },
                data : that.data.xList
            }
        ],
        series : [
            {
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter:'{c}次'
                    }
                },
                data:that.data.yList
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
    var list = this.data.devicesList
    var equipmentId = ''
    for (var i = 0; i < list.length; i++) {
      if(list[i].equipmentName == this.data.devices[this.data.deviceIndex]){
        equipmentId = list[i].equipmentId
        break
      }
    }
    this.getData(equipmentId)
  },

  bindStartDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
    this.getData()
  },

  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
    this.getData()
  },

  getData:function(equipmentId=this.data.equipmentId,startTime=this.data.startDate,endTime=this.data.endDate)
  {
    if(!equipmentId){
      app.showModal('请先选择设备')
      return
    }
    this.setData({
      isShow:false
    })
    wx.showLoading()
    var sendata = app.getStatistics(equipmentId,startTime,endTime)
    app.send_data(sendata, util.config.url.getStatistics, function (res) {
      if(res.resultCode == '10000'){
        wx.hideLoading()
        that.setData({
          xList:res.resultData.xList,
          yList:res.resultData.yList,
          minList:res.resultData.minList.toString(),
          maxList:res.resultData.maxList.toString(),
          equipmentId:equipmentId
        })
        that.setData({
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
          },
          isShow:true
        })
      }
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