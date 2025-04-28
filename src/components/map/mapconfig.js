export const getOption = (mapCode, aspectScale, zoom) => {
  return {
    aspectScale, // geo 再这里设置生效 series 中的需要单独设置
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    geo: [
      {
        show: false,
        map: mapCode,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        roam: false,
        zoom: zoom,
        layoutSize: '95%',
        layoutCenter: ['50%', '48%'],
        animationDurationUpdate: 0,
        zlevel: 99
      },

      {
        map: 'china_boundary',
        show: mapCode == '100000',
        //避免边框选中，设置不响应事件
        silent: true,
        layoutSize: '124%',
        layoutCenter: ['50%', '66%'],
        itemStyle: {
          normal: {
            //外边框大小
            borderWidth: 4,
            borderColor: 'rgba(89, 253, 254, 1)',
            shadowColor: 'rgba(89, 253, 254, 1)',
            //发光效果
            shadowBlur: 30,
            // Y 向阴影偏移量
            shadowOffsetY: 10,
            areaColor: 'rgba(0, 0, 0,0)'
          },
          emphasis: {
            label: { show: false },
            areaColor: 'rgba(0, 0, 0,0)'
          }
        },
        zlevel: 9
      }
    ],
    // 业务部分摘除 由父组件传入
    series: [
      {
        type: 'map',
        map: mapCode,
        aspectScale: aspectScale,
        zoom: zoom,
        // zlevel: 10,
        roam: false,
        layoutSize: '95%',
        layoutCenter: ['50%', '48%'],
        animationDurationUpdate: 0,

        itemStyle: {
          normal: {
            borderColor: 'rgba(70, 141, 206,.6)',
            borderWidth: 2,
            shadowOffsetY: 0,
            areaColor: 'rgba(28, 99, 193,.8)'
          },
          // 高亮样式
          emphasis: {
            areaColor: '#3e92e5'
          }
        },
        label: {
          show: true,
          color: '#ffffff', // 设置正常状态下的字体颜色为白色
          formatter: (params, ticket, call) => {
            // if (params.name.indexOf('台湾') > -1) {
            //   console.log(params.name, 'params.name')

            //   return ''
            // }
            // 隐藏南海诸岛的点
            if (
              ['南海诸岛', '香港特别行政区', '澳门特别行政区'].includes(
                params.name
              )
            ) {
              return ''
            }
            let name = params.name
            if (name) {
              let isAutonomy = name.search('自治区') !== -1
              if (isAutonomy) {
                return name.search('内') !== -1
                  ? name.substr(0, 3)
                  : name.substr(0, 2)
              } else {
                const match = name.match(/(\S*)(省|市|特别行政区)/)
                return (match && match[1]) || name
              }
            }
          },
          emphasis: {
            color: '#ffffff', // 设置正常状态下的字体颜色为白色
            fontSize: 16 // 设置高亮时的字体大小为16px，可以根据需要调整
          }
        },
        tooltip: {
          show: false
        }
        // 高亮样式
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: {
          scale: 3,
          brushType: 'stroke'
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            // color: '#00d30a'
            color: '#1ac395'
          }
        },
        label: {
          normal: {
            color: '#fff'
          }
        },
        symbol: 'circle',
        symbolSize: [5, 2.5],
        data: [],
        zlevel: 99
      }
    ]
  }
}
