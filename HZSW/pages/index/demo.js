import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height,option) {
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
    color:['#ff9cb8'],
    xAxis : [
        {
            type : 'value',
            axisTick : {show: false},
            splitArea: {
                show: true
            },
            axisLabel: {
                formatter: '{value}次'
            }
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            splitArea: {
                show: true
            },
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
                    position: 'insideRight',
                    formatter:'{c}次'
                }
            },
            data:[32,30, 34, 37,39,45,42,60,52]
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
