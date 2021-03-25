const { createApp, reactive, toRefs } = Vue;

import initEcharts from './initEcharts.js';
import { barBase, lineBase, pieBase } from './chart/commonEcharts.js';
import { initEchartsMap } from './chart/initEchartsMap.js';
const data = reactive({
  parkCount: 373,
  nopersonCount: 170,
  parkSeat: 1500,
  orderCount: 1800,
  onlineOrder: 160,
  moneyOrder: 650,
  totalMoney: 18000,
  chargeData: [
    {
      parkName: '慧谷车场-停车场',
      plate: '粤B235416',
      content: '停车1小时8秒并支付停车费5元',
      time: '09:10'
    },
    {
      parkName: '天安小区车场-停车场',
      plate: '粤BZ6895',
      content: '停车1小时8秒并支付停车费5元',
      time: '09:10'
    },
    {
      parkName: '智慧云谷车场-停车场',
      plate: '粤B23541',
      content: '停车1小时8秒并支付停车费5元',
      time: '09:10'
    },
    {
      parkName: '和平小区车场-停车场',
      plate: '粤B23516',
      content: '停车1小时8秒并支付停车费5元',
      time: '09:10'
    }
  ]
});
const app = createApp({
  setup() {
    return {
      ...toRefs(data)
    };
  },
  data() {
    return { date: new Date() };
  },
  mounted() {
    var parkData = {
      nameArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      data: [
        {
          name: '人流量',
          arr: [1200, 150, 32551, 2652, 5412, 1200, 1100]
        },
        {
          name: '车流量',
          arr: [10000, 1540, 25236, 1500, 1896, 980, 356]
        }
      ]
    };
    let aa = lineBase(parkData, ['#00c6ff', '#ff724c']);
    initEcharts(document.querySelector('#left-mid-charts'), aa);

    let bb = pieBase([
      { value: 1048, name: '产权车' },
      { value: 735, name: '临时车' },
      { value: 580, name: '人防车' }
    ]);
    initEcharts(document.querySelector('#left-bottom-charts'), bb);

    let cc = barBase([100, 1000, 2500, 15620, 652, 25000]);
    initEcharts(document.querySelector('#right-bottom-charts'), cc);

    var myChartMap = echarts.init(document.querySelector('#content-mid-charts'));
    window.chartMap = myChartMap;
    initEchartsMap('china', '中国');

    var incomeData = {
      nameArr: ['03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25'],
      data: [
        {
          name: '总收入',
          arr: [640, 314, 1302, 1574, 1550, 560, 4165]
        },
        {
          name: '现金收入',
          arr: [120, 132, 101, 1340, 900, 230, 1065]
        },
        {
          name: '移动收入',
          arr: [520, 182, 1201, 234, 650, 330, 3100]
        }
      ]
    };

    let dd = lineBase(incomeData);
    initEcharts(document.querySelector('#right-mid-charts'), dd);

    var _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改日期数据
    }, 1000);
  },
  methods: {
    setZero(a) {
      //设置小于10的数字在加0
      return a < 10 ? '0' + a : a;
    },
    formatDate(date) {
      var vm = this;
      //当前时间格式化处理
      var str = '<div><p>';
      var weekDay = ['<em>星</em><em>期</em><em>天</em>', '<em>星</em><em>期</em><em>一</em>', '<em>星</em><em>期</em><em>二</em>', '<em>星</em><em>期</em><em>三</em>', '<em>星</em><em>期</em><em>四</em>', '<em>星</em><em>期</em><em>五</em>', '<em>星</em><em>期</em><em>六</em>'];
      str += vm.setZero(date.getFullYear()) + '/'; //获取年份
      str += vm.setZero(date.getMonth() + 1) + '/'; //获取月份
      str += vm.setZero(date.getDate()); //获取日
      str += '</p><p>' + weekDay[date.getDay()] + ''; //获取星期
      str += '</p></div><div>' + vm.setZero(date.getHours()) + ':'; //获取时
      str += '' + vm.setZero(date.getMinutes()) + ':'; //获取分
      str += vm.setZero(date.getSeconds()); //获取秒
      str += '</div>';
      return str;
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
    }
  }
});
app.mount('#app');
