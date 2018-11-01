//app.js
var util = require('./utils/util.js');
App({
  onLaunch: function () {

    if(wx.getStorageSync('userinfo')){
      this.globalData.userInfo = wx.getStorageSync('userinfo')
      wx.switchTab({
        url:"/pages/my/index"
      })
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

  userLogin:function(phone,pwd,code)
  {
    var data = JSON.stringify({
      "phone":phone,
      "password":pwd,
      "code":code,
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
      "txncode":"perfectInformation"
    })
    return data;
  },

  addImg:function(phone,imgUrl)
  {
    var data = JSON.stringify({
      "phone":phone,
      "imgUrl":imgUrl,
      "txncode":"updateAvatar"
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
      "txncode":"getStaffList"
    })
    return data;
  },

  deleteStaffList:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "txncode":"deleteStaffList"
    })
    return data;
  },

  updateSex:function(userId,sex)
  {
    var data = JSON.stringify({
      "userId":userId,
      "sex":sex,
      "txncode":"updateSex"
    })
    return data;
  },

  getDetectionRecordList:function(memberId)
  {
    var data = JSON.stringify({
      "memberId":memberId,
      "txncode":"getDetectionRecordList"
    })
    return data;
  },

  deleteDetectionRecord:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
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
      "txncode":"updatePhone"
    })
    return data;
  },

  getMemberList:function(userId,memberId = undefined)
  {
    var data = JSON.stringify({
      "id":userId,
      "memberId":memberId,
      "txncode":"getMemberList"
    })
    return data;
  },

  getStoreHouseList:function(storeHouseName = undefined)
  {
    var data = JSON.stringify({
      "storeHouseName":storeHouseName,
      "txncode":"getStoreHouseList"
    })
    return data;
  },

  getHouseEquipment:function(id,name = undefined)
  {
    var data = JSON.stringify({
      "id":id,
      "name":name,
      "txncode":"getHouseEquipment"
    })
    return data;
  },

  removeHouseEquipment:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
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
      "txncode":"addHouseEquipment"
    })
    return data;
  },

  addStoreList:function(id,storeName,storeId,address,phone,longitude = undefined,latitude = undefined)
  {
    var data = JSON.stringify({
      "id":id,
      "storeName":storeName,
      "storeId":storeId,
      "address":address,
      "phone":phone,
      "longitude":longitude,
      "latitude":latitude,
      "txncode":"addStoreList"
    })
    return data;
  },

  getStoreList:function(storeName = undefined)
  {
    var data = JSON.stringify({
      "storeName":storeName,
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
      "txncode":"scansion"
    })
    return data;
  },

  confirmUnlock:function(equipmentId,memberId)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "memberId":memberId,
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
      "txncode":"getEquipmentList"
    })
    return data;
  },

  confirmReception:function(equipmentId)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "txncode":"confirmReception"
    })
    return data;
  },

  getEquipmentDetail:function(equipmentId)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "txncode":"getEquipmentDetail"
    })
    return data;
  },

  breakdownFeedback:function(equipmentId,state)
  {
    var data = JSON.stringify({
      "equipmentId":equipmentId,
      "state":state,
      "txncode":"breakdownFeedback"
    })
    return data;
  },

  addStaff:function(storeId,phone)
  {
    var data = JSON.stringify({
      "storeId":storeId,
      "phone":phone,
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
      "txncode":"getEquipmentArray"
    })
    return data;
  },

  getHelpList:function()
  {
    var data = JSON.stringify({
      "txncode":"getHelpList"
    })
    return data;
  },

  removeStoreList:function(idList)
  {
    var data = JSON.stringify({
      "idList":idList,
      "txncode":"removeStoreList"
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
      "txncode":"addDetectionRecord"
    })
    return data;
  },

  showModal:function(content,title='',showCancel = false,cancelText = '',cancelColor = '',confirmText = '确定',confirmColor = '')
  {
    wx.showModal({
      title: title,
      showCancel: showCancel,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor,
      content: content,
      success:function(res){
        if (res.confirm) {

        } else if (res.cancel) {

        }
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
      url: 'https://mylidan.com/api/'+url,
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
          if(txninfo.resultCode != '10000'){
            wx.hideLoading()
            if(['userLogin','perfectInformation','resetPassword','smsCode','updateSex','updatePhone','deleteDetectionRecord','removeHouseEquipment','addHouseEquipment','addDetectionRecord','confirmReception','breakdownFeedback','deleteStaffList','addStaff','inviteShopowner','removeStoreList'].indexOf(d.txncode) != -1){
              wx.showModal({
                title: '',
                showCancel: false,
                content: txninfo.resultMessage
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
            showCancel: false,
            content: util.errCode()['000003']
          })
        } else if (res.statusCode == 504) {
          wx.hideLoading()
          wx.showModal({
            title: '',
            showCancel: false,
            content: util.errCode()['000005']
          })
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '',
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
    memberPhysicalList:[],//会员的理疗记录列表，getDetectionRecordList接口返回
    memberUserInfo:{},
    deviceList:[],//设备信息
    deviceListItem:[],//某个设备下的理疗记录信息
    storeList:[],//门店信息
    helpList:[],//帮助中心
  }
})