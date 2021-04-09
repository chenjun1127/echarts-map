const { createApp, reactive, toRefs } = Vue;
import { getQueryString } from './utils.js';
import initEcharts from './initEcharts.js';
import { barBase, lineBase, pieBase } from './chart/commonEcharts.js';
import { initEchartsMap } from './chart/initEchartsMap.js';
const userName = getQueryString('user_name');
const password = getQueryString('password');
const data = reactive({
  parkCount: 0,
  nopersonCount: 0,
  parkSeat: 0,
  fixCount: 0,
  saveDutycount: 0,
  saveDutymoney: 0,
  orderCount: 0,
  onlineOrder: 0,
  moneyOrder: 0,
  totalMoney: 0,
  logo: '',
  title1: '',
  title2: '',
  title3: '',
  title4: '',
  title5: '',
  chargeData: [],
  securityData: []
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
    if (!userName || !password) {
      document.body.innerHTML = '用户名或密码不能为空！';
      document.body.classList.add('no-data');
      return;
    }
    this.getData();
    this.getDataRefresh();
    var _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改日期数据
    }, 1000);
    this.timer1 = setInterval(() => {
      this.getData();
      this.getDataRefresh();
    }, 20000);
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
    },
    getData() {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: '/park-api/HMKY_getpark_info',
        data: JSON.stringify({ password: password, user_name: userName }),
        success: function (res) {
          if (res.errcode === 0) {
            data.parkCount = res.park_count;
            data.nopersonCount = res.noperson_count;
            data.parkSeat = res.park_seat;
            data.fixCount = res.fix_count;
            data.saveDutycount = res.save_dutycount;
            data.saveDutymoney = res.save_dutymoney;
            data.title1 = res.title1;
            data.title2 = res.title2;
            data.title3 = res.title3;
            data.title4 = res.title4;
            data.title5 = res.title5;
            data.logo = 'data:image/jpg;base64,' + res.pic_log;
            var mapData = [];
            res.park_position.forEach(item => {
              mapData.push({
                name: item.park_name,
                value: [item.jin_du, item.wei_du, item.car_seat, item.use_seat]
              });
            });
            sessionStorage.setItem('mapData', JSON.stringify(mapData));
            var myChartMap = echarts.init(document.querySelector('#content-mid-charts'));
            window.chartMap = myChartMap;
            if (res.map_type === 1) {
              initEchartsMap('china', '中国');
            } else {
              initEchartsMap('guangdong', '广东');
            }
          } else {
            alert(res.errmsg);
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    },
    getDataRefresh() {
      var _this = this;
      $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: '/park-api/HMKY_refreshpark_info',
        data: JSON.stringify({ password: password, user_name: userName }),
        success: function (res) {
          if (res.errcode === 0) {
            data.totalMoney = res.today_money;
            data.orderCount = res.order_count;
            data.onlineOrder = res.online_order;
            data.moneyOrder = res.money_order;
            _this.getRevenueData(res.revenue);
            data.securityData = res.real_data;
            data.chargeData = res.charge_data;
            _this.getExcepData(res.excep_data);
            _this.getInOutData(res.inout_data);
          } else {
            alert(res.errmsg);
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    },
    // 收入趋势
    getRevenueData(data) {
      if (!data.length) return;
      var nameArr = data.map(item => item.data_time);
      var dataArr = [
        {
          name: '总收入',
          arr: data.map(item => item.total_money)
        },
        {
          name: '现金收入',
          arr: data.map(item => item.manual_money)
        },
        {
          name: '移动收入',
          arr: data.map(item => item.online_money)
        }
      ];
      var incomeData = { nameArr: nameArr, data: dataArr };
      initEcharts(document.querySelector('#right-mid-charts'), lineBase(incomeData));
    },
    // 异常
    getExcepData(data) {
      if (!data.length) return;
      let barData = [];
      data.forEach(item => {
        barData.push({
          name: item.park_name,
          value0: item.excep_count,
          value1: item.excep_complete,
          value2: item.excep_ratio
        });
      });
      initEcharts(document.querySelector('#right-bottom-charts'), barBase(barData, ['异常总数', '已完成总数', '处理比率']));
    },
    // 车流量
    getInOutData(data) {
      if (!data.length) return;
      var parkData = {
        nameArr: data.map(item => item.inout_date),
        data: [
          {
            name: '出场总数',
            arr: data.map(item => item.carout_count)
          },
          {
            name: '入场总数',
            arr: data.map(item => item.carin_count)
          }
        ]
      };
      initEcharts(document.querySelector('#left-mid-2-charts'), lineBase(parkData, ['#00c6ff', '#ff724c']));
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
    }
    if (this.timer1) {
      clearInterval(this.timer1);
    }
  }
});
app.mount('#app');
