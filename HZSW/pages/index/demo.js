import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid:{
      left:'20%', 
    },
    color:['pink'],
    xAxis : [
        {
            type : 'value',
            axisTick : {show: false},
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['08~10点','10~12点','08~10点','08~10点','08~10点','08~10点','08~10点','08~10点','其他']
        }
    ],
    series : [
        {
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data:[320, 302, 341, 374, 390, 450, 420, 420, 420]
        }
        
    ]
};

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
