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
    deviceList: [],
    tabs: ["列表", "地图"],
    activeIndex: 0,
    sliderOffset: 0,
    inputShowed: false,
    inputVal: "",
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
                height:res.screenHeight-200,
                width:res.screenWidth,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
    if(app.globalData.isPhysical){
      //理疗记录
      var sendata = app.getMemberList(app.globalData.userInfo.id)
      wx.showLoading();
      app.send_data(sendata, util.config.url.getMemberList, function (res) {
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
        wx.hideLoading();
      })
      
    }else{
      //设备
      this.setData({
        isPhysical:false
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
      //设备列表
      //status 1:空闲 2:使用中 3:故障 4:轻度故障 5:在途
      wx.showLoading()
      var sendata = app.getEquipmentArray()
      app.send_data(sendata, util.config.url.getEquipmentArray, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000' && res.resultData.length > 0){
          var list = res.resultData
          app.globalData.deviceList = res.resultData
          that.setData({
            hasdata:true,
            deviceList:list
          })

          //地图模式的门店列表
          var markers = []
          var points = []
          var latitude,longitude = ''
          for (var i =  0; i < list.length; i++) {
            if(!list[i].latitude||!list[i].longitude){
              continue;
            }
            let icon,text_color
            switch(list[i].stateName){
              case '空闲':
              icon = "/image/shebei_icon_dingwei_kongxian.png";
              text_color = "#009944";
              break;
              case '使用中':
              icon = "/image/mendian_icon_dingwei.png";
              text_color = "#ff9cb8";
              break;
              case '故障':
              icon = "/image/shebei_icon_dingwei_guzhang.png";
              text_color = "#f43531";
              break;
              case '轻度故障':
              icon = "/image/shebei_icon_dingwei_qingduguzhang.png";
              text_color = "#f39801";
              break;
              case '在途':
              icon = "/image/shebei_icon_dingwei_zaitu.png";
              text_color = "#00b8ee";
              break;
              default:
              case '空闲':
              icon = "/image/shebei_icon_dingwei_kongxian.png";
              text_color = "#009944";
              break;
            }
            markers.push({id:list[i].equipmentId,latitude: list[i].latitude,longitude: list[i].longitude,iconPath:icon,width:18,height:21,callout:{content:list[i].stateName,fontSize:10,color:text_color,display:'ALWAYS',borderRadius:3,borderColor:text_color,bgColor:"#ffffff",padding:2,textAlign:"center"
              }})
            points.push({latitude: list[i].latitude,longitude: list[i].longitude})
            latitude = list[i].latitude
            longitude = list[i].longitude
          }
          that.setData({
            latitude: latitude,
            longitude: longitude,
            markers:markers,
            points:points
          })

        }else{
          that.setData({
            hasdata:false
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
      if(app.globalData.isPhysical){
        this.setData({
          userList:this.data.old_userList
        })
      }else{
        this.setData({
          deviceList:this.data.old_deviceList
        })
      }
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
    if(app.globalData.isPhysical){
      //理疗记录
      if(this.data.old_userList){
        this.setData({
          userList:this.data.old_userList
        })
      }else{
        this.setData({
          old_userList:this.data.userList
        })
      }
      this.setData({
          inputVal: e.detail.value
      });
      var list = util.searchList(this.data.inputVal,'memberId',this.data.userList)
      util.zhw_log(list)
      this.setData({
        userList:list
      })
    }else{
      //设备
      if(this.data.old_deviceList){
        this.setData({
          deviceList:this.data.old_deviceList
        })
      }else{
        this.setData({
          old_deviceList:this.data.deviceList
        })
      }
      this.setData({
          inputVal: e.detail.value
      });
      var list = util.searchList(this.data.inputVal,'equipmentId',this.data.deviceList)
      util.zhw_log(list)
      this.setData({
        deviceList:list
      })
    }
  },

  /*-----------------------------我的设备---------------------------*/

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
  goDetail:function(res)
  {
    util.zhw_log(res)
    wx.navigateTo({
      url:"/pages/device/detail?equipmentId="+res.markerId
    })
  },
})