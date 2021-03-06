//app.js
var util = require('./utils/util.js');
App({
  onLaunch: function () {

    if(wx.getStorageSync('userinfo')){
      this.globalData.userInfo = wx.getStorageSync('userinfo')
      wx.switchTab({
        url:"/pages/my/index"
      })
    }else{
      
    }

    /*// 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  /**
   * 提示信息
   */
  showToast: function (_text, _this, _count) {
    _count = parseInt(_count) ? parseInt(_count) : 2000;
    //显示提示信息
    _this.setData({
      toastText: _text,
      isShowToast: true,
    });
    //延时隐藏提示信息
    setTimeout(function() {
      _this.setData({
        isShowToast: false
      });
    }, _count);
  },

  /**
     * 
   * @return {[type]}
   */
  test: function () {
    var user_info = wx.getStorageSync('user_info');
    var city = wx.getStorageSync('city');
    var data = {
      "userid": user_info['user_id'],
      "city": city.city_id,
      'instid': util.config.wallet.instid,
      'mchntid': util.config.wallet.mchntid,
      "syssesq": util.UUID(),
      "txncode": 'vcardQuery',
      "mobiletype": wx.getSystemInfoSync().model,
      'imei': wx.getStorageSync('imei'),
      "txndate": util.getDateString(),
      "txntime": util.getTimeString()
    };
    var signcode = util.signpk(JSON.stringify(data));
    data = 'data=' + JSON.stringify({
        'txninfo': JSON.stringify(data),
        'signcode': signcode
      });
    return data;
  },

  checkPhone:function(phone)
  {
    var data = JSON.stringify({
      "phone":phone,
      "txncode":"checkPhone"
    })
    return data;
  },

  userLogin:function(phone,pwd,code,wechatCode)
  {
    var data = JSON.stringify({
      "phone":phone,
      "password":pwd,
      "code":code,
      "wechatCode":wechatCode,
      "txncode":"userLogin"
    })
    return data;
  },

  resetPassword:function(phone,code,originalPassword,newPassword)
  {
    var data = JSON.stringify({
      "phone":phone,
      "originalPassword":originalPassword,
      "newPassword":newPassword,
      "code":code,
      "txncode":"resetPassword"
    })
    return data;
  },

  perfectInformation:function(name,sex)
  {
    var data = JSON.stringify({
      "name":name,
      "sex":sex,
      "id":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"perfectInformation"
    })
    return data;
  },

  addImg:function(phone,imgUrl)
  {
    var data = JSON.stringify({
      "phone":phone,
      "imgUrl":imgUrl,
      "token":this.globalData.userInfo.token,
      "txncode":"updateAvatar"
    })
    return data;
  },

  loginOut:function()
  {
    var data = JSON.stringify({
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"loginOut"
    })
    return data;
  },

  smsCode:function(phone)
  {
    var data = JSON.stringify({
      "phone":phone,
      "txncode":"smsCode"
    })
    return data;
  },

  getStaffList:function(storeId)
  {
    var data = JSON.stringify({
      "storeId":storeId,
      "token":this.globalData.userInfo.token,
      "txncode":"getStaffList"
    })
    return data;
  },

  deleteStaffList:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"deleteStaffList"
    })
    return data;
  },

  updateSex:function(userId,sex)
  {
    var data = JSON.stringify({
      "userId":userId,
      "sex":sex,
      "token":this.globalData.userInfo.token,
      "txncode":"updateSex"
    })
    return data;
  },

  getMessageList:function(userId,typeId)
  {
    var data = JSON.stringify({
      "userId":userId,
      "typeId":typeId,
      "token":this.globalData.userInfo.token,
      "txncode":"getMessageList"
    })
    return data;
  },

  getDetectionRecordList:function(memberId)
  {
    var data = JSON.stringify({
      "memberId":memberId,
      "token":this.globalData.userInfo.token,
      "txncode":"getDetectionRecordList"
    })
    return data;
  },

  deleteDetectionRecord:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"deleteDetectionRecord"
    })
    return data;
  },

  updatePhone:function(userId,phone,code)
  {
    var data = JSON.stringify({
      "userId":userId,
      "phone":phone,
      "code":code,
      "token":this.globalData.userInfo.token,
      "txncode":"updatePhone"
    })
    return data;
  },

  getMemberList:function(userId,memberId = undefined)
  {
    var data = JSON.stringify({
      "id":userId,
      "memberId":memberId,
      "token":this.globalData.userInfo.token,
      "txncode":"getMemberList"
    })
    return data;
  },

  getStoreHouseList:function(storeHouseName = undefined)
  {
    var data = JSON.stringify({
      "storeHouseName":storeHouseName,
      "token":this.globalData.userInfo.token,
      "txncode":"getStoreHouseList"
    })
    return data;
  },

  getHouseEquipment:function(id,name = undefined)
  {
    var data = JSON.stringify({
      "id":id,
      "name":name,
      "token":this.globalData.userInfo.token,
      "txncode":"getHouseEquipment"
    })
    return data;
  },

  removeHouseEquipment:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"removeHouseEquipment"
    })
    return data;
  },

  addHouseEquipment:function(houseId,equipmentName,equipmentId,status)
  {
    var data = JSON.stringify({
      "houseId":houseId,
      "equipmentName":equipmentName,
      "equipmentId":equipmentId,
      "status":status,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"addHouseEquipment"
    })
    return data;
  },

  addStoreList:function(userId,storeName,storeId,address,phone,longitude,latitude,id=undefined)
  {
    var data = JSON.stringify({
      "id":id,
      "userId":userId,
      "storeName":storeName,
      "storeId":storeId,
      "address":address,
      "phone":phone,
      "longitude":longitude,
      "latitude":latitude,
      "token":this.globalData.userInfo.token,
      "txncode":"addStoreList"
    })
    return data;
  },

  getStoreList:function(storeName = undefined)
  {
    var data = JSON.stringify({
      "storeName":storeName,
      "token":this.globalData.userInfo.token,
      "txncode":"getStoreList"
    })
    return data;
  },

  scansion:function(typeId,scansionId,storeId)
  {
    var data = JSON.stringify({
      "typeId":typeId,
      "scansionId":scansionId,
      "storeId":storeId,
      "token":this.globalData.userInfo.token,
      "txncode":"scansion"
    })
    return data;
  },

  confirmUnlock:function(equipmentId,memberId,number)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "memberId":memberId,
      "number":number,
      "token":this.globalData.userInfo.token,
      "txncode":"confirmUnlock"
    })
    return data;
  },

  getEquipmentList:function(grade,storeId,userId,equipmentName=undefined)
  {
    var data = JSON.stringify({
      "grade":grade,
      "storeId":storeId,
      "userId":userId,
      "equipmentName":equipmentName,
      "token":this.globalData.userInfo.token,
      "txncode":"getEquipmentList"
    })
    return data;
  },

  confirmReception:function(equipmentId)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"confirmReception"
    })
    return data;
  },

  saveData:function(messageId)
  {
    var data = JSON.stringify({
      "messageId":messageId,
      "token":this.globalData.userInfo.token,
      "txncode":"saveData"
    })
    return data;
  },

  getEquipmentDetail:function(equipmentId)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "token":this.globalData.userInfo.token,
      "txncode":"getEquipmentDetail"
    })
    return data;
  },

  breakdownFeedback:function(equipmentId,state)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "state":state,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"breakdownFeedback"
    })
    return data;
  },

  addStaff:function(storeId,phone)
  {
    var data = JSON.stringify({
      "storeId":storeId,
      "phone":phone,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"addStaff"
    })
    return data;
  },

  inviteShopowner:function(phone,id=undefined)
  {
    var data = JSON.stringify({
      "phone":phone,
      "id":id,
      "txncode":"inviteShopowner"
    })
    return data;
  },

  getEquipmentArray:function(equipmentName=undefined)
  {
    var data = JSON.stringify({
      "equipmentName":equipmentName,
      "token":this.globalData.userInfo.token,
      "txncode":"getEquipmentArray"
    })
    return data;
  },

  getHelpList:function()
  {
    var data = JSON.stringify({
      "token":this.globalData.userInfo.token,
      "txncode":"getHelpList"
    })
    return data;
  },

  removeStoreList:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"removeStoreList"
    })
    return data;
  },

  dispatchEquipment:function(type,id,equipmentId)
  {
    var data = JSON.stringify({
      "type":type,
      "id":id,
      "equipmentId":equipmentId,
      "userId":this.globalData.userInfo.id,
      "token":this.globalData.userInfo.token,
      "txncode":"dispatchEquipment"
    })
    return data;
  },

  getStatistics:function(equipmentId,startTime=undefined,endTime=undefined)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "startTime":startTime,
      "endTime":endTime,
      "token":this.globalData.userInfo.token,
      "txncode":"getStatistics"
    })
    return data;
  },

  getTendency:function(memberId,type)
  {
    var data = JSON.stringify({
      "memberId":memberId,
      "type":type,
      "token":this.globalData.userInfo.token,
      "txncode":"getTendency"
    })
    return data;
  },

  getSuggest:function()
  {
    var data = JSON.stringify({
      "token":this.globalData.userInfo.token,
      "txncode":"getSuggest"
    })
    return data;
  },

  getList:function()
  {
    var data = JSON.stringify({
      "token":this.globalData.userInfo.token,
      "txncode":"getList"
    })
    return data;
  },

  getMenuEquipment:function(storeId,userId)
  {
    var data = JSON.stringify({
      "storeId":storeId,
      "userId":userId,
      "token":this.globalData.userInfo.token,
      "txncode":"getMenuEquipment"
    })
    return data;
  },

  saveSuggest:function(name,type,suggest,imagesList=undefined,videoList=undefined,qq=undefined)
  {
    var data = JSON.stringify({
      "name":name,
      "type":type,
      "suggest":suggest,
      "imagesList":imagesList,
      "videoList":videoList,
      "qq":qq,
      "token":this.globalData.userInfo.token,
      "txncode":"saveSuggest"
    })
    return data;
  },

  updateStoreDetail:function(id,storeId,storeName,address,longitude,latitude)
  {
    var data = JSON.stringify({
      "id":id,
      "storeId":storeId,
      "storeName":storeName,
      "address":address,
      "longitude":longitude,
      "latitude":latitude,
      "txncode":"updateStoreDetail"
    })
    return data;
  },

  addDetectionRecord:function(user)
  {
    var data = JSON.stringify({
      "userId":user.userId,
      "memberId":user.memberId,
      "membranceId":user.membranceId,
      "equipmentId":user.equipmentId,
      "storeId":user.storeId,
      "detectionTime":user.detectionTime,
      "age":user.age,
      "part":user.part,
      "weight":user.weight,
      "bust":user.bust,
      "waist":user.waist,
      "hipline":user.hipline,
      "bodyFat":user.bodyFat,
      "fatRate":user.fatRate,
      "fat":user.fat,
      "token":this.globalData.userInfo.token,
      "userId":this.globalData.userInfo.id,
      "txncode":"addDetectionRecord"
    })
    return data;
  },

  showModal:function(content)
  {
    wx.showModal({
      title: '',
      confirmText:'确定',
      showCancel: false,
      content: content
    })
  },

  logout:function()
  {
    var that = this
    wx.clearStorage({
      success:function(){
        that.globalData = {
          userInfo: null,//1为管理员,2为店长,3为普通员工
          userList:[],
          isPhysical:true,//true为打开理疗记录页面，false为打开设备管理页面
          indexStep:1,//1扫设备，2扫膜，3扫用户
          indexMoNum:0,//扫膜的次数，默认为0
          memberPhysicalList:[],//会员的理疗记录列表，getDetectionRecordList接口返回
          memberUserInfo:{},
          deviceList:[],//设备信息
          deviceListItem:[],//某个设备下的理疗记录信息
          storeList:[],//门店信息
          helpList:[],//帮助中心
          repertoryList:[],//仓库列表
          NewList:[],//最新资讯列表
          SysList:[],//系统消息列表
        }
        wx.reLaunch({
          url:"/pages/home/index"
        })
      }
    })
  },

  /**
   * 网络请求统一方法
   * @param  {[type]} data [description]
   * @param  {[type]} url  [description]
   * @param  {String} cb   [description]
   * @return {[type]}      [description]
   */
  send_data: function (data, url, cb = '') {
    var that = this;
    if (!url) {
      url = util.ajaxUrl();
    }

    var d = JSON.parse(data);
    util.zhw_log(data);
    wx.request({
      url: util.domain+url,
      method: 'POST',
      data: data,
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
        util.zhw_log(res);
        if (res.statusCode == 200) {
          if (typeof res.data != 'object') { //微信返回的
            return cb(res.data);
          }

          //验签，如果有需要的话
          //your code...

          var txninfo = res.data;
          //Memo 响应信息
          if(txninfo.resultCode == '50004'){
            that.logout()
            return
          }else if(['50000','70001'].indexOf(txninfo.resultCode) != -1){
            wx.showModal({
              title: '',
              confirmText:'确定',
              showCancel: false,
              content: util.errCode()[txninfo.resultCode]
            })
            return
          }else if(txninfo.resultCode != '10000'){
            wx.hideLoading()
            if(['userLogin','perfectInformation','resetPassword','smsCode','updateSex','updatePhone','deleteDetectionRecord','removeHouseEquipment','addHouseEquipment','addDetectionRecord','confirmReception','breakdownFeedback','deleteStaffList','addStaff','inviteShopowner','removeStoreList','updateStoreDetail','dispatchEquipment','getStatistics','getTendency','saveSuggest','loginOut'].indexOf(d.txncode) != -1){
              wx.showModal({
                title: '',
                confirmText:'确定',
                showCancel: false,
                content: util.errCode()[txninfo.resultCode]
              })
            }else{
              typeof cb == "function" && cb(txninfo);
            }
          } else {
            typeof cb == "function" && cb(txninfo);
          }

        } else if (res.statusCode == 502) {
          wx.hideLoading()
          wx.showModal({
            title: '',
            confirmText:'确定',
            showCancel: false,
            content: util.errCode()['000003']
          })
        } else if (res.statusCode == 504) {
          wx.hideLoading()
          wx.showModal({
            title: '',
            confirmText:'确定',
            showCancel: false,
            content: util.errCode()['000005']
          })
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '',
            confirmText:'确定',
            showCancel: false,
            content: util.errCode()['000001']
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        util.zhw_log(res)
        wx.showModal({
          title: '',
          confirmText:'确定',
          showCancel: false,
          content: res.errMsg
        })
      }
    })

  },

  decode_package: function (res) {},

  globalData: {
    userInfo: null,//1为管理员,2为店长,3为普通员工
    userList:[],
    isPhysical:true,//true为打开理疗记录页面，false为打开设备管理页面
    indexStep:1,//1扫设备，2扫膜，3扫用户
    indexMoNum:0,//扫膜的次数，默认为0
    memberPhysicalList:[],//会员的理疗记录列表，getDetectionRecordList接口返回
    memberUserInfo:{},
    deviceList:[],//设备信息
    deviceListItem:[],//某个设备下的理疗记录信息
    storeList:[],//门店信息
    helpList:[],//帮助中心
    repertoryList:[],//仓库列表
    NewList:[],//最新资讯列表
    SysList:[],//系统消息列表
  }
})