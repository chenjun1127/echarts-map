export function lineBase(data, colorArr = ['#00c6ff', '#ff724c', '#f90']) {
  const legendArr = data.data.map(item => item.name);
  const series = [];
  data.data.forEach((item, i) => {
    series.push({
      type: 'line',
      name: legendArr[i],
      smooth: true,
      symbol: 'none',
      lineStyle: {
        normal: {
          color: colorArr[i],
          width: 1
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#fff'
        }
      },
      data: item.arr
    });
  });
  return {
    color: colorArr,
    legend: {
      top: 0,
      right: 5,
      data: legendArr,
      selectedMode: false,
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      // formatter: '{b}<br/>' + legendArr[0] + '：{c0}<br/>' + legendArr[1] + '：{c1}',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)'
        }
      },
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      borderColor: '#39437b',
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
          width: 1
        }
      },
      axisLabel: {
        margin: 5,
        fontSize: 12,
        color: '#fff'
      },
      data: data.nameArr
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          width: 1
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
    series: series
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

export function barBase(data, seriesName) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      borderColor: '#39437b',
      backgroundColor: '#39437b',
      textStyle: {
        color: '#fff',
        fontSize: 14
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
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, .2)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      // data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
      data: data.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 1
        }
      }
    },
    series: [
      {
        name: seriesName[0],
        type: 'bar',
        barWidth: 8,
        data: data.map(item => item.value0),
        itemStyle: {
          normal: {
            borderRadius: [0, 20, 20, 0],
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
      },
      {
        name: seriesName[1],
        type: 'bar',
        barWidth: 8,
        data: data.map(item => item.value1),
        itemStyle: {
          normal: {
            borderRadius: [0, 20, 20, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#E87E82'
              },
              {
                offset: 1,
                color: '#F6A078'
              }
            ])
          }
        }
      },
      {
        name: seriesName[2],
        type: 'bar',
        barWidth: 8,
        data: data.map(item => item.value2),
        itemStyle: {
          normal: {
            borderRadius: [0, 20, 20, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#A9DF96'
              },
              {
                offset: 1,
                color: '#22DF96'
              }
            ])
          }
        }
      }
    ]
  };
}
