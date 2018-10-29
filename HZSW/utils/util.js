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
    smsCode:'index/smsCode',
    perfectInformation:'index/perfectInformation',
    resetPassword:'index/resetPassword',
    addImg:'index/addImg',
    scansion:'index/scansion',
    addDetectionRecord:'statistics/addDetectionRecord',
    confirmUnlock:'statistics/confirmUnlock',
    getStaffList:'myData/getStaffList',
    getTendency:'statistics/getTendency',
    getMenuEquipment:'menu/getMenuEquipment',
    getStatistics:'statistics/getStatistics',
    updatePhone:'myData/updatePhone',
    updateSex:'myData/updateSex',
    getPersonal:'myData/getPersonal',
    getStaffList:'myData/getStaffList',
    getMemberList:'myData/getMemberList',
    getDetectionRecordList:'myData/getDetectionRecordList',
    deleteDetectionRecord:'myData/deleteDetectionRecord',
    getEquipmentList:'myData/getEquipmentList',
    addStaff:'myData/addStaff',
    getStoreList:'store/getStoreList',
    removeStoreList:'store/removeStoreList',
    addStoreList:'store/addStoreList',
    inviteShopowner:'store/inviteShopowner',
    getEquipmentArray:'equipment/getEquipmentArray',
    dispatchEquipment:'equipment/dispatchEquipment',
    getStoreHouseList:'store/getStoreHouseList',
    getHouseEquipment:'store/getHouseEquipment',
    addHouseEquipment:'store/addHouseEquipment',
    removeHouseEquipment:'store/removeHouseEquipment',
    dispatchHouseEquipment:'store/dispatchHouseEquipment',
    getStoreArray:'menu/getStoreArray',
    getHouseArray:'menu/getHouseArray',
  }
}

function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
}
