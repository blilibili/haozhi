// pages/index/index.js
var util = require("../../utils/util.js");
var app = getApp()
var that
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"扫设备",
    step:app.globalData.indexStep,
    noShow:false,
    checkboxItems: [],
    tabs: ["列表", "地图"],
    activeIndex: 0,
    sliderOffset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if(app.globalData.userInfo.grade == 1){
      wx.setNavigationBarTitle({
        title:"我的门店"
      })
      wx.getSystemInfo({
          success: function(res) {
              that.setData({
                  height:res.screenHeight-200,
                  width:res.screenWidth,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
          }
      });

     
    }else if(app.globalData.userInfo.grade == 2){
      //店长页面
      
    }else{
      //普通员工页面
      
    }
    this.setData({
      userRule:app.globalData.userInfo.grade
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
    util.zhw_log('onShow')
    if(app.globalData.userInfo.grade == 1){
      wx.showLoading()
      var sendata = app.getStoreList()
      app.send_data(sendata, util.config.url.getStoreList, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000' && res.resultData.length > 0){
          for (var i = 0; i < res.resultData.length; i++) {
            if(!res.resultData[i].userName)res.resultData[i].userName = res.resultData[i].phone;
          }
          var list = res.resultData
          app.globalData.storeList = res.resultData
          that.setData({
            hasStore:true,
            checkboxItems:list
          })

          //地图模式的门店列表
          var markers = []
          var points = []
          var latitude,longitude = ''
          for (var i =  0; i < list.length; i++) {
            if(!list[i].latitude||!list[i].longitude){
              continue;
            }
            markers.push({id:list[i].storeId,latitude: list[i].latitude,longitude: list[i].longitude,iconPath: '/image/mendian_icon_dingwei.png',width:18,height:21,callout:{content:list[i].storeName,fontSize:10,color:'#ff9cb8',display:'ALWAYS',borderRadius:3,borderColor:'#ff9cb8',bgColor:"#ffffff",padding:2,textAlign:"center"
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
            hasStore:false,
          })
        }
      })
      return
      util.zhw_log(app.globalData.storeList)
      this.setData({
        checkboxItems:app.globalData.storeList
      })

      //地图模式的门店列表
      var list = app.globalData.storeList
      var markers = []
      var points = []
      for (var i =  0; i < list.length; i++) {
        markers.push({id:list[i].storeId,latitude: list[i].latitude,longitude: list[i].longitude,iconPath: '/image/mendian_icon_dingwei.png',width:18,height:21,callout:{content:list[i].storeName,fontSize:10,color:'#ff9cb8',display:'ALWAYS',borderRadius:3,borderColor:'#ff9cb8',bgColor:"#ffffff",padding:2,textAlign:"center"
          }})
        points.push({latitude: list[i].latitude,longitude: list[i].longitude})
      }
      this.setData({
        markers:markers,
        points:points
      })
    }else{
      if(app.globalData.indexStep == 1){
        this.setData({
          title:'扫设备',
          step:1
        })
      }else if(app.globalData.indexStep == 2){
        that.setData({
          title:'扫膜',
          step:2
        })
      }else{
        this.setData({
          title:'扫用户',
          step:3
        })
      }
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

  /*-----------------------------主页---------------------------*/

  forScan:function()
  {
    wx.showModal({
      title:'',
      content:'是否继续扫膜？',
      cancelText:'否',
      confirmText:'是',
      confirmColor:'#ff9cb8',
      success:function(res){
        if(res.confirm){
          //点击是
        }
        if(res.cancel){
          //点击否

        }
      }
    })
  },

  goSearch:function()
  {
    wx.navigateTo({
      url:"/pages/index/search?step="+app.globalData.indexStep
    })
  },

  doScan:function()
  {
    wx.scanCode({
      onlyFromCamera: true,
      scanType:['qrCode'],
      success (res) {
        wx.showToast({
          title:'信息比对中',
          icon:'loading',
          duration:2000,
          mask:true
        })
        util.zhw_log(res.result)
        setTimeout(function(){
          that.checkScan(res.result)
        },1500)
      },
      fail(err){
        util.zhw_log(err)
      }
    })
  },

  checkScan:function(scansionId)
  {
    var sendata = app.scansion((app.globalData.indexStep-1),scansionId,app.globalData.userInfo.storeId)
    app.send_data(sendata, util.config.url.scansion, function (res) {
      if(res.resultCode == '10000'){
        wx.showToast({
          title:'比对成功',
          icon:'success',
          mask:true
        })
        if(app.globalData.indexStep == 1){
          //扫设备
          app.globalData.indexStep = 2
          app.globalData.memberUserInfo.equipmentId = scansionId
          that.setData({
            title:'扫膜',
            step:2
          })
        }else if(app.globalData.indexStep == 2){
          //扫膜
          app.globalData.indexStep = 3
          app.globalData.memberUserInfo.membranceId = scansionId
          that.setData({
            title:'扫用户',
            step:3
          })
        }else{
          app.globalData.indexStep = 1
          app.globalData.memberUserInfo.memberId = scansionId
          //扫用户
          wx.navigateTo({
            url:"/pages/index/userInfo"
          })
        }
      }else{
        wx.showToast({
          title:'比对失败',
          image:'/image/zhuye_zhuangtai_icon_shibai.png',
          mask:true
        })
      }
    })
  },

  /*-----------------------------我的门店---------------------------*/

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
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

  removeStore:function()
  {
    this.setData({
      isRemove:true
    })
  },

  doRemove:function()
  {
    var delList = []
    var checkboxItems = this.data.checkboxItems
    var newList = []
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if(checkboxItems[i].checked){
        delList.push(checkboxItems[i].id)
      }else{
        newList.push(checkboxItems[i])
      }
    }
    if(delList.length == 0){
      this.setData({
        isRemove:false
      })
      return
    }
    wx.showLoading()
    var sendata = app.removeStoreList(delList.join(","))
    app.send_data(sendata, util.config.url.removeStoreList, function (res) {
      wx.hideLoading()
      if(res.resultCode == '10000'){
        app.globalData.storeList = newList
        that.setData({
          checkboxItems:newList,
          isRemove:false
        })
      }
    })
  },

  addStore:function()
  {
    wx.navigateTo({
      url:"/pages/store/addStore"
    })
  },

  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(checkboxItems[i].id == values[j]){
                  checkboxItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          checkboxItems: checkboxItems
      });
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

  goStore:function(res)
  {
    wx.navigateTo({
      url:'/pages/store/detail?storeId='+res.markerId
    })
  },

})