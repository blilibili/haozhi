//app.js
App({
  onLaunch: function () {

    // 登录
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
    })
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
  globalData: {
    userInfo: null,
    userRule:3,//1为管理员,2为店长,3为普通员工
    userList:[],
  }
})