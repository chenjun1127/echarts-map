export function initEchartsMap(pName, Chinese_) {
  var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

  var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

  var option = {
    title: {
      text: Chinese_ || pName,
      left: 'center',
      top: 30,
      textStyle: {
        fontSize: 20,
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return '<p>' + params.name + '</p><p class="conut-next">停车场：' + params.value[2] + '个</p>';
      },
      backgroundColor: '#26272F',
      borderRadius: 5,
      borderColor: '#26272F',
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: pName,
      zoom: 1,
      label: {
        emphasis: {
          show: false
        }
      },
      // roam: true,
      itemStyle: {
        normal: {
          areaColor: '#142957',
          borderColor: '#0692a4'
        },
        emphasis: {
          areaColor: '#0b1c2d'
        }
      }
    },
    series: [
      {
        name: 'pm2.5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        mapType: pName,
        roam: false, //是否开启鼠标缩放和平移漫游
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        symbolSize: function (val) {
          // return val[2] / 20;
          return 10
        },
        itemStyle: {
          normal: {
            color: '#07B684'
          }
        },
        data: [
          {
            name: '新乡',
            value: [116.402217, 35.311657, 200]
          },
          {
            name: '齐齐哈尔',
            value: [123.973652, 47.335877, 2000]
          }
        ]
      }
    ]
  };
  // chartMap为window全局对象
  chartMap.setOption(option);

  chartMap.off('click');

  if (pName === 'china') {
    // 全国时，添加click 进入省级
    chartMap.on('click', function (param) {
      // 遍历取到provincesText 中的下标  去拿到对应的省js
      for (var i = 0; i < provincesText.length; i++) {
        if (param.name === provincesText[i]) {
          //显示对应省份的方法
          showProvince(provinces[i], provincesText[i]);
          break;
        }
      }
      // if (param.componentType === 'series') {
      //   var provinceName = param.name;
      //   console.log(provinceName)
      //   $('#box').css('display', 'block');
      //   $('#box-title').html(provinceName);
      // }
    });
  } else {
    // 省份，添加双击 回退到全国
    chartMap.on('dblclick', function () {
      initEchartsMap('china', '中国');
    });
  }
}

// 展示对应的省
function showProvince(pName, Chinese_) {
  console.log(pName);
  //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
  loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function () {
    initEchartsMap(Chinese_);
  });
}

// 加载对应的JS
function loadBdScript(scriptId, url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  script.id = scriptId;
  document.getElementsByTagName('head')[0].appendChild(script);
}
