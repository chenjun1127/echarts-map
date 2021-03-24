function dealWithData() {
  var geoCoordMap = {
    //这里放你打点的坐标信息，虚拟信息
    莱芜市: [117.678856, 36.223361],
    威海市: [122.121804, 37.524054],
    滨州市: [117.982412, 37.392056],
    临沂市: [118.364156, 35.119965],
    淄博市: [118.069799, 36.82475],
    日照市: [119.532384, 35.425496],
    烟台市: [121.454902, 37.480081],
    菏泽市: [115.48038, 35.248354],
    青岛市: [120.397057, 36.07041],
    东营市: [118.681509, 37.447084],
    潍坊市: [119.164438, 36.71744],
    济南市: [117.122338, 36.661876],
    聊城市: [115.986305, 36.465225],
    泰安市: [117.090143, 36.212179],
    枣庄市: [117.329308, 34.824652],
    济宁市: [116.588817, 35.433025]
  };
  var locValue = [
    { name: '莱芜市', value: '100' },
    { name: '威海市', value: '50' },
    { name: '滨州市', value: '20' },
    { name: '临沂市', value: '90' },
    { name: '淄博市', value: '170' },
    { name: '日照市', value: '190' },
    { name: '德州市', value: '160' },
    { name: '烟台市', value: '140' },
    { name: '菏泽市', value: '130' },
    { name: '青岛市', value: '110' },
    { name: '东营市', value: '105' },
    { name: '潍坊市', value: '142' },
    { name: '济南市', value: '80' },
    { name: '聊城市', value: '184' },
    { name: '泰安市', value: '155' },
    { name: '枣庄市', value: '130' },
    { name: '济宁市', value: '140' }
  ];
  var convertData = function (geoCoordMap, data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };
}
export function echartsMap() {
  return {
    series: [
      {
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.23,
        center: [105, 36],
        data: [
          {
            name: '湖北',
            value: 60
          }
        ],
        // geoIndex: 1,
        // aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#0d0059',
            borderColor: '#389dff',
            borderWidth: 0.5
          },
          emphasis: {
            areaColor: '#17008d',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 5,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '111',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: dealWithData(),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        symbol: 'circle',
        symbolSize: 8,
        hoverSymbolSize: 10,
        tooltip: {
          formatter(value) {
            return value.data.name + '<br/>' + '设备数：' + '22';
          },
          show: true
        },
        encode: {
          value: 2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        itemStyle: {
          color: '#0efacc'
        },
        emphasis: {
          label: {
            show: false
          }
        }
      }
    ]
  };
}
