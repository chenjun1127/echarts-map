export default function initEcharts(ele, option) {
  var myChart = echarts.init(ele);
  myChart.setOption(option);
}
