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
                  height:res.screenHeight,
                  width:res.screenWidth,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
          }
      });

      wx.showLoading()
      var sendata = app.getStoreList()
      app.send_data(sendata, util.config.url.getStoreList, function (res) {
        wx.hideLoading()
        if(res.resultCode == '10000' && res.resultData.length > 0){
          that.setData({
            hasStore:true,
            checkboxItems:res.resultData
          })
        }else{
          that.setData({
            hasStore:false,
          })
        }
      })

      
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

      
    }else if(app.globalData.userInfo.grade == 2){
      //店长页面
      // this.forScan()
    }else{
      //普通员工页面
      // this.forScan()
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
    this.setData({
      isRemove:false
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
              if(checkboxItems[i].value == values[j]){
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
    console.log(res)
    console.log(res.markerId)
    wx.navigateTo({
      url:'/pages/store/detail?storeid='+res.markerId
    })
  },

})