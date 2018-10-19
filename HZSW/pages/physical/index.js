// pages/physical/index.js
var utils = require("../../utils/util.js");
var app = getApp()
var that
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
        {name: '员工姓名', value: '0'},
        {name: '员工姓名', value: '1'},
        {name: '员工姓名', value: '2'},
        {name: '员工姓名', value: '3'},
        {name: '员工姓名', value: '4'},
        {name: '员工姓名', value: '5'},
        {name: '员工姓名', value: '6'},
        {name: '员工姓名', value: '7'},
        {name: '员工姓名', value: '8'},
    ],
    tabs: ["列表", "地图"],
    activeIndex: 0,
    sliderOffset: 0,
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                height:res.screenHeight,
                width:res.screenWidth,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });

    var store = [{latitude: 23.099994,longitude: 113.324520,name:'番禺门店',id:1},{latitude: 23.099994,longitude: 113.344520,name:'天河门店',id:2}];
    var markers = [];
    for (var i = store.length - 1; i >= 0; i--) {
      markers.push({id:store[i].id,latitude: store[i].latitude,longitude: store[i].longitude,iconPath: '/image/mendian_icon_dingwei.png',width:18,height:21,callout:{content:store[i].name,fontSize:10,color:'#ff9cb8',display:'ALWAYS',borderRadius:3,borderColor:'#ff9cb8',bgColor:"#ffffff",padding:2,textAlign:"center"
        }})
    }

    that.setData({
      userList:[1,2,3,4,5,6],
      latitude: 23.099994,
      longitude: 113.324520,
      markers:markers,
    })

    this.setData({
      hasdata:false
    })
    setTimeout(function(){
      app.globalData.userList = [1,2,3,4,5,6]
      that.setData({
        hasdata:true,
        userList:app.globalData.userList
      })
    },1000)
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
    console.log(app.globalData.isPhysical)
    if(app.globalData.isPhysical){
      this.setData({
        isPhysical:true
      })
    }else{
      wx.setNavigationBarTitle({
        title:"我的设备"
      })
      wx.setTabBarItem({
        index:1,
        text:"设备",
        iconPath:"image/zhuye_nav_icon_shebei.png",
        selectedIconPath:"image/zhuye_nav_icon_shebei_pre.png",
      })
      this.setData({
        isPhysical:false
      })
      this.setData({
        hasStore:false
      })
      setTimeout(function(){
        that.setData({
          hasStore:true,
        })
      },1000)
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

  /*-----------------------------我的设备---------------------------*/

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
})