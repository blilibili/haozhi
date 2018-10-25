// pages/physical/index.js
var util = require("../../utils/util.js");
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
    inputVal: "",
    isPhysical:app.globalData.isPhysical,
    userList:[],
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
    if(this.data.isPhysical){
      //理疗记录
      var sendata = app.getStaffList(wx.getStorageSync('userinfo').storeId)
      app.send_data(sendata, util.config.url.getStaffList, function (res) {
        if(res.resultCode == '10000' && res.resultData.length > 0){
          that.setData({
            hasdata:true,
            userList:res.resultData
          })

        }else{
          that.setData({
            hasdata:false
          })
        }
      })

    }else{
      //设备
      //status 1:空闲 2:使用中 3:故障
      var store = [{latitude: 23.099994,longitude: 113.324520,status:1,name:'空闲',id:1,icon:"/image/shebei_icon_dingwei_kongxian.png",color:"#009944",borderColor:"#009944"},{latitude: 23.099994,longitude: 113.344520,status:2,name:'使用中',id:2,icon:"/image/mendian_icon_dingwei.png",color:"#ff9cb8",borderColor:"#ff9cb8"},{latitude: 23.099994,longitude: 113.345520,status:3,name:'故障',id:3,icon:"/image/shebei_icon_dingwei_guzhang.png",color:"#f43531",borderColor:"#f43531"}];
      var markers = [];
      for (var i = store.length - 1; i >= 0; i--) {
        markers.push({id:store[i].id,latitude: store[i].latitude,longitude: store[i].longitude,iconPath: store[i].icon,width:18,height:21,callout:{content:store[i].name,fontSize:10,color:store[i].color,display:'ALWAYS',borderRadius:3,borderColor:store[i].borderColor,bgColor:"#ffffff",padding:2,textAlign:"center"
          }})
      }

      that.setData({
        userList:[1,2,3,4,5,6],
        latitude: 23.099994,
        longitude: 113.324520,
        markers:markers,
      })
    }
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
    if(this.data.isPhysical){
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
        hasStore:true
        // hasStore:false
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
  goDetail:function()
  {
    wx.navigateTo({
      url:"/pages/device/detail"
    })
  },
})