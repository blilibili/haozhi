//测试与正式环境开关切换,true为测试环境
var utildebug = false;
//log开关,true为打开log
var debugLog = true;

//测试环境的配置
var domain = '';

if(!utildebug){
    //正式环境配置
    domain = '';//正式环境域名
}

var config = {
  //系统基本配置变量，暴露该变量
  url : {
    checkout:'index/checkout',
    login:'index/login',
    loginOut:'index/loginOut',
    smsCode:'index/smsCode',
    perfectInformation:'index/perfectInformation',
    resetPassword:'index/resetPassword',
    addImg:'index/addImg',
    scansion:'index/scansion',
    addDetectionRecord:'statistics/addDetectionRecord',
    confirmUnlock:'index/confirmUnlock',
    getStaffList:'myData/getStaffList',
    getTendency:'statistics/getTendency',
    getMenuEquipment:'menu/getMenuEquipment',
    getStatistics:'statistics/getStatistics',
    updatePhone:'myData/updatePhone',
    updateSex:'myData/updateSex',
    getPersonal:'myData/getPersonal',
    getMessageList:'myData/getMessageList',
    getHelpList:'myData/getHelpList',
    saveSuggest:'myData/saveSuggest',
    getStaffList:'myData/getStaffList',
    getMemberList:'myData/getMemberList',
    getDetectionRecordList:'myData/getDetectionRecordList',
    deleteDetectionRecord:'myData/deleteDetectionRecord',
    getEquipmentList:'myData/getEquipmentList',
    getEquipmentDetail:'myData/getEquipmentDetail',
    deleteStaffList:'myData/deleteStaffList',
    addStaff:'myData/addStaff',
    confirmReception:'myData/confirmReception',
    saveData:'myData/saveData',
    breakdownFeedback:'equipment/breakdownFeedback',
    getStoreList:'store/getStoreList',
    removeStoreList:'store/removeStoreList',
    addStoreList:'store/addStoreList',
    inviteShopowner:'store/inviteShopowner',
    updateStoreDetail:'store/updateStoreDetail',
    getEquipmentArray:'equipment/getEquipmentArray',
    dispatchEquipment:'equipment/dispatchEquipment',
    changeState:'equipment/changeState',
    getStoreHouseList:'store/getStoreHouseList',
    getHouseEquipment:'store/getHouseEquipment',
    addHouseEquipment:'store/addHouseEquipment',
    removeHouseEquipment:'store/removeHouseEquipment',
    dispatchHouseEquipment:'store/dispatchHouseEquipment',
    getStoreArray:'menu/getStoreArray',
    getHouseArray:'menu/getHouseArray',
    getList:'myData/getList',
    getSuggest:'myData/getSuggest',
    saveFiles:'myData/saveFiles',
  }
}

function formatTime() {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getDetectionTime() {
  var date = new Date()
  let year = date.getFullYear().toString().substring(2,4)
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function ajaxUrl(){
    var url = "";  //需要请求其他的域名地址
    return url;
}

function errCode ($k){
  var errCode  = {
    '000001':'网络连接失败,请检查网络',
    '000002':'请求失败',
    '000003':'服务器异常',
    '000004':'其他异常请往下增加',
    '000005':'请求超时',
    '-1':'失败',
    '-2':'权限不足',
    '-3':'该请求是文件类型的HTTP请求',
    '-4':'请求过于频繁',
    '-5':'对比失败',
    '41001':'参数不能为空',
    '41002':'参数有误',
    '41003':'参数类型有误',
    '41004':'手机号码参数有误',
    '41005':'日期参数有误',
    '41006':'数字参数有误',
    '41007':'小数参数有误',
    '41008':'json参数格式或类型有误',
    '41009':'参数格式有误',
    '43001':'用户不存在',
    '43002':'用户已存在',
    '43003':'用户已被停用',
    '42003':'未登录',
    '42004':'密码错误',
    '42005':'记录不存在',
    '42006':'微信号不正确',
    '42007':'账号或者密码错误',
    '42008':'验证码错误',
    '42009':'短信发送失败',
    '50001':'设备不可用',
    '50002':'手机号重复',
    '50000':'系统异常',
    '50003':'设备故障',
    '50004':'token过期，请重新登陆',
    '70001':'微信code无效',
    '50005':'设备ID已经存在',
  }
  return errCode;
}

function zhw_log(data){
  if(debugLog)console.log(data);
}

function str_repeat(str, num){
    return new Array( num + 1 ).join( str );
}

function isPoneAvailable(pone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(pone)) {
    return false;
  } else {
    return true;
  }
}

function getPhone(phone,num) {
  return phone.substr(0,3)+'****'+phone.substr(7,9)
}

function searchList(paramName,key,list){
  var reList = []
  for (var i = 0; i < list.length; i++) {
    if (key == "memberId"&&list[i].memberId.indexOf(paramName) != -1) {
      reList.push(list[i])
    }else if (key == "equipmentName"&&list[i].equipmentName.indexOf(paramName) != -1) {
      reList.push(list[i])
    }else if (key == "name"&&list[i].name.indexOf(paramName) != -1) {
      reList.push(list[i])
    }else if (key == "storeName"&&list[i].storeName.indexOf(paramName) != -1) {
      reList.push(list[i])
    }else if (key == "houseName"&&list[i].houseName.indexOf(paramName) != -1) {
      reList.push(list[i])
    }else{

    }
  }
  return reList;
}


module.exports = {
  formatTime: formatTime,
  getDetectionTime: getDetectionTime,
  ajaxUrl:ajaxUrl,
  errCode:errCode,
  domain:domain,
  utildebug:utildebug,
  zhw_log:zhw_log,
  str_repeat:str_repeat,
  config:config,
  isPoneAvailable:isPoneAvailable,
  getPhone:getPhone,
  searchList:searchList,
}
