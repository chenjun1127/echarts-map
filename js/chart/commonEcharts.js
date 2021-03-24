export function lineBase(xdata, ydata1, ydata2) {
  return {
    color: ['#00c6ff', '#ff724c'],
    legend: {
      top: 0,
      right: 5,
      data: ['人流量', '车流量'],
      selectedMode: false,
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '时间：{b}<br/>人流量：{c0}<br/>车流量：{c1}',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          width: 2
        }
      },
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      backgroundColor: '#39437b'
    },
    grid: {
      left: 5,
      right: 20,
      top: 25,
      bottom: 5,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          width: 2
        }
      },
      axisLabel: {
        margin: 5,
        fontSize: 12,
        color: '#fff'
      },
      data: xdata
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          width: 2
        }
      },
      axisLabel: {
        fontSize: 12,
        color: '#fff'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        type: 'line',
        name: '人流量',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            color: '#fff',
            width: 1
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        data: ydata1
      },
      {
        type: 'line',
        name: '车流量',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            color: '#fff',
            width: 1
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        data: ydata2
      }
    ]
  };
}
export function pieBase(data) {
  return {
    legend: {
      bottom: 4,
      itemGap: 12,
      itemWidth: 12,
      itemHeight: 12,
      selectedMode: false,
      textStyle: {
        color: '#fff',
        fontWeight: 'bold'
      },
      data: data.map(item => item.name)
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '45%'],
        radius: ['45%', '60%'],
        color: ['#ffda2e', '#2951ff', '#00ffea'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            color: '#fff',
            formatter: '{b} \n {c} ({d}%)'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
}

export function barBase(data) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 20,
      right: 30,
      bottom: 10,
      top: 20,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 0.5
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        barWidth:12,
        data,
        itemStyle: {
          normal: {
            borderRadius: [0, 20, 20, 0] ,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#3e57bc'
              },
              {
                offset: 1,
                color: '#1f3699'
              }
            ])
          }
        }
      }
    ]
  };
}
