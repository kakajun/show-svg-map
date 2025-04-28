<template>
  <div class="echart-box">
    <div ref="echart" class="echart"></div>
    <div
      class="echart-return"
      v-if="mapCode != 100000"
      @click="handlereturnSuperior"
    >
      <img title="返回上级" src="~@/assets/icon-return.webp" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import china_boundary from './china_boundary.json'
import { getOption } from './mapconfig.js'
import { getTopIcons, getFilterFc, getGeoJournal, getTooltip } from './fjbase'
import allFcData from './mock.js'
/**
 * mapChange 用来抛出数据 每次绘制地图就会触发 不能用来调用接口渲染画布 会死循环
 * mapChange 用来抛出数据
 */
export default {
  name: 'mapIndex',
  props: {
    mapCode: String,
    offMapClick: {
      type: Boolean,
      default: false
    },
    offMapDblclick: {
      type: Boolean,
      default: false
    },
    offMapMouseover: {
      type: Boolean,
      default: false
    },
    offMapMouseout: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allFcData,
      mapNode: null,
      chart: null, // echarts实例
      mapInfo: null, // 地图渲染时保存的每个区域的json节点上的数据
      nodeList: [] // 下钻节点
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeUpdate)
  },
  mounted() {
    echarts.registerMap('china_boundary', china_boundary)
    this.creatMap(this.mapCode)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeUpdate)
    this.clear()
  },
  methods: {
    /**
     * @description:组装option
     * @param {*} mapCode
     */
    assignOption(mapCode) {
      // 宽高比例
      const aspectScale = mapCode == '100000' ? 0.75 : 1
      const zoom = mapCode == '100000' ? 1.2 : 0.85 // 地图缩放比例
      let option = getOption(mapCode, aspectScale, zoom)
      let filterDatas = this.allFcData
      // 过滤场站
      filterDatas = getFilterFc(this.allFcData, mapCode, this.mapNode)
      // 下面状态数据
      const scaters = filterDatas.map(item => {
        return {
          ...item,
          name: item.fcNickname,
          value: [item.jd, item.wd]
        }
      })

      option.series[1].data = scaters
      // 获取图标数据
      const topIcons = getTopIcons(filterDatas)
      option.series = [...option.series, ...topIcons]
      option.tooltip = getTooltip(this.allFcData)
      return option
    },

    // 获取地图json数据
    async creatMap(mapCode, eventType = null, mapNode) {
      let usaJson = await getGeoJournal(mapCode) // 获取地图数据
      if (usaJson) {
        // 保存json上地图信息用于点击事件
        this.severMapInfo(usaJson)
        this.$emit('mapChange', mapCode, mapNode)
        // 事件类型
        if (eventType) {
          if (eventType === 'mapClick') {
            console.log('@#@#@#', mapNode)
            this.mapNode = mapNode
            this.$emit('mapClick', mapCode, mapNode)
          }
          if (eventType === 'mapDblclick') {
            this.$emit('mapDblclick', mapCode, mapNode)
          }
        }
      } else {
        return
      }
      echarts.registerMap(mapCode, usaJson) // 设置地图
      this.initMap(mapCode) // 绘制地图与地图上的数据
    },

    // 绘制地图上的数据
    initMap(mapCode) {
      this.clear() // 清除画布 暂时不开试试 清除重新绘制会有一点白屏时间
      this.chart = echarts.init(this.$refs.echart, null, { renderer: 'svg' }) // 保存实例
      // 合并配置
      const option = this.assignOption(mapCode)
      this.option = option // 保存配置
      this.chart.setOption(option)
      console.log(option, 'option')
      // 点击事件
      this.chart.off('click')
      // 关闭事件注册
      if (!this.offMapClick) {
        // 地图散点事件
        this.chart.on('click', 'series', (params, a, s, d) => {
          const nodeMap = this.getMapCode(params.name) // 根据name获取code
          if (nodeMap) {
            if (nodeMap.level === 'district') {
              // 禁止区县下探
              return
            }
            this.addNodeList(nodeMap)
            this.creatMap(nodeMap.adcode, 'mapClick', nodeMap)
          }
          if (params.seriesType === 'scatter') {
            // 90 的跳转
            // if (this.mapNode.level === 'city') {
            console.log(params, 'params')
            const d = params.data
            alert(`跳转到${d.fcNickname}`)
            // }
          }
        })
      }
      // 双击事件 下钻
      this.chart.off('dblclick')
      if (!this.offMapDblclick) {
      }
      this.chart.off('mouseover')
      if (!this.offMapMouseover) {
        this.chart.on('mouseover', 'series', params => {
          this.$emit('mapMouseover', params, mapCode)
        })
      }
      this.chart.off('mouseout')
      if (!this.offMapMouseout) {
        this.chart.on('mouseout', 'series', params => {
          this.$emit('mapMouseout', params, mapCode)
        })
      }
    },

    // 清除画布
    clear() {
      if (this.chart) {
        this.chart.clear()
        this.chart.dispose()
        this.chart = null
      }
    },
    // 动态适配
    resizeUpdate() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    // 返回上级
    handlereturnSuperior() {
      // 删除当前节点缓存 并返回节点信息拿父级code
      const nodeMap = this.delNodeList(this.mapCode)
      // 获取父级节点
      const adcode = nodeMap.acroutes[nodeMap.acroutes.length - 1]
      const PNode = this.nodeList.find(item => item.adcode == adcode)
      this.creatMap(adcode)
      this.$emit('returnSuperior', adcode, PNode)
    },
    // 获取点击地图的name 或者 code
    getMapCode(name) {
      const objName = this.mapInfo.find(item => item.name === name)
      return objName
    },
    // 保存json上地图信息用于点击事件
    severMapInfo(usaJson) {
      const list = []
      usaJson.features.map(item => {
        list.push(item.properties)
      })
      this.mapInfo = list
    },
    // 新增节点数据
    addNodeList(node) {
      if (node) {
        const item = this.nodeList.find(item => item.adcode == node.adcode)
        if (!item) {
          this.nodeList.push(node)
        }
      }
      console.log('this.nodeList 2', this.nodeList)
    },
    // 删除节点数据
    delNodeList(adcode) {
      const dObj = this.nodeList.find(item => item.adcode == adcode)
      this.nodeList = this.nodeList.filter(item => item.adcode !== adcode)
      return dObj
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-box {
  position: relative;
  width: 100%;
  height: 660px;
  margin-top: -40px;
}
.echart {
  width: 100%;
  height: 100%;
}
@keyframes chartWgbg {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.echart-return {
  position: absolute;
  bottom: 25%;
  left: 5%;
  z-index: 100;
  height: 48px;
  width: 47px;
  cursor: pointer;
  img {
    width: 100%;
  }
}
.hnImg {
  position: absolute;
  left: 77%;
  bottom: 14%;
}
</style>

<style lang="scss">
.mapToolBox {
  width: 400px;
  position: relative;
  border: 1px solid;
  border-color: #fff;
  border-image: linear-gradient(180deg, #7eb5fd, #142538) 10 10;
  background: linear-gradient(
    0deg,
    rgba(1, 20, 43, 0.7) 0%,
    rgba(0, 50, 103, 0.7) 100%
  );
  .imgt {
    display: block;
    position: absolute;
    top: -5px;
    width: calc(100% + 1px);
    left: -1px;
    height: 3px;
    background-image: url('~@/assets/bd_t.png');
  }
  .imgb {
    display: block;
    position: absolute;
    bottom: -4px;
    width: calc(100% + 1px);
    left: -1px;
    height: 3px;
    background-image: url('~@/assets/bd_b.png');
  }
  .itemBox {
    display: flex;
    width: 400px;
    flex-wrap: wrap;
  }
  .mapTool {
    width: 200px;
    color: #fff;
    padding: 12px;
  }
  h4 {
    margin: 0;
    padding: 0 0 0 10px;
    line-height: 30px;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(90deg, #3090f5, transparent);
  }
  ul {
    margin: 0;
    padding: 4px 0 0 10px;
  }
  li {
    list-style: none;
    font-size: 14px;
    margin-top: 8px;
    label {
      width: 120px;
      margin-right: 20px;
      color: #f2f4f6;
      letter-spacing: 0.5px;
    }
    span {
      display: inline-block;
      color: #dce6f7;
      letter-spacing: 0.5px;
    }
  }
}
</style>
