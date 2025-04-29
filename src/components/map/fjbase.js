import axios from 'axios'

const fjbase = `<svg   xmlns="http://www.w3.org/2000/svg" width="30" height="60">
  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .blades {
      transform-origin: 15px 19.3px; /* 调整旋转中心 */
      animation: spin 3s linear infinite;
    }
  </style>

  <!-- 风机塔架 -->
  <path d="M15 19.3v29.3h-2v-29.3q0-2 2-2t2 2z" fill="#CCC"/>

  <!-- 机舱 -->
  <circle cx="15" cy="19.3" r="3.9" fill="#333"/>

  <!-- 三叶片风机 -->
  <g class="blades">
    <!-- 叶片1 (水平右侧) -->
    <path d="M15 19.3l17.8-5.9q2.4-1 0.5-2 2l1-12.7q1-1.5 2.9-1z" fill="#EEE"/>

    <!-- 叶片2 (120度) -->
    <path d="M15 19.3l-8.8 14.6q-1 1.5-2 1l6.8-12.7q1-1.5 2-1z" fill="#DDD"/>

    <!-- 叶片3 (240度) -->
    <path d="M15 19.3l-8.8-14.6q-1-1.5-2-1l6.8 12.7q1 1.5 2 1z" fill="#CCC"/>
  </g>
</svg>

`
export const fjbase64 = `data:image/svg+xml;base64,${btoa(
  unescape(encodeURIComponent(fjbase))
)}`
const guanfuban = `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 光伏板背景 -->
  <rect x="50" y="50" width="300" height="100" fill="#ccc" rx="5" ry="5"/>

  <!-- 光伏板电池格 -->
  <g fill="#444" stroke="#555" stroke-width="2">
    <!-- 横向分割线 -->
    <rect x="50" y="100" width="300" height="1"/>
    <!-- 纵向分割线 (每列光伏电池) -->
    <rect x="116.67" y="50" width="1" height="100"/>
    <rect x="190" y="50" width="1" height="100"/>
    <rect x="270" y="50" width="1" height="100"/>
  </g>

  <!-- 移动的光条 (使用动画) -->
  <rect x="200" y="50" width="50" height="100" fill="url(#lightGradient)" opacity="0.8">
    <animate attributeName="x" from="50" to="300" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- 光条的渐变效果 -->
  <defs>
    <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="white" stop-opacity="0"/>
      <stop offset="30%" stop-color="white" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="white" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- 光伏板边框 -->
  <rect x="50" y="50" width="300" height="100" fill="none" stroke="#666" stroke-width="2" rx="5" ry="5"/>

  <!-- 光伏板支架 -->
  <rect x="75" y="150" width="50" height="20" fill="#ccc"/>
  <rect x="275" y="150" width="50" height="20" fill="#ccc"/>
</svg>

`

export const guanfuban64 = `data:image/svg+xml;base64,${btoa(
  unescape(encodeURIComponent(guanfuban))
)}`

const sun = `<svg t="1745760428654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6773" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18">
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 512 512" to="360 512 512" dur="5s" repeatCount="indefinite" />
    <path d="M501.48 493.55m-233.03 0a233.03 233.03 0 1 0 466.06 0 233.03 233.03 0 1 0-466.06 0Z" fill="#e4e4e4" p-id="6774"></path>
    <path d="M501.52 185.35H478.9c-8.28 0-15-6.72-15-15V87.59c0-8.28 6.72-15 15-15h22.62c8.28 0 15 6.72 15 15v82.76c0 8.28-6.72 15-15 15zM281.37 262.76l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.86-5.86-15.36 0-21.21l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.35 0 21.21zM185.76 478.48v22.62c0 8.28-6.72 15-15 15H88c-8.28 0-15-6.72-15-15v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15zM270.69 698.63l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.36 5.86-21.21 0l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.85-5.86 15.35-5.86 21.21 0zM486.41 794.24h22.62c8.28 0 15 6.72 15 15V892c0 8.28-6.72 15-15 15h-22.62c-8.28 0-15-6.72-15-15v-82.76c0-8.28 6.72-15 15-15zM706.56 709.31l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.36 0 21.21l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.85-5.86-15.35 0-21.21zM802.17 493.59v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15v22.62c0 8.28-6.72 15-15 15h-82.76c-8.28 0-15-6.72-15-15zM717.24 273.44l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.86-5.86 15.36-5.86 21.21 0l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.35 5.86-21.21 0z" fill="#e4e4e4" p-id="6775"></path>
  </g>
</svg>
`
export const sun64 = `data:image/svg+xml;base64,${btoa(
  unescape(encodeURIComponent(sun))
)}`

const getCodeLength = node => {
  const level = node && node.level
  switch (level) {
    case 'province': // 省
      return 2
    case 'city': // 市
      return 4
    case 'district': // 区县
      return 6
    default:
      return 2
  }
}

/**
 * @description: 如果是全国这里要做过滤, 每个省留三个不同的做代表
 */
export const getFilterFc = (arrs, mapCode, mapNode) => {
  // 1. 按areaCode 的前两位, 区分出省份
  const provinceMap = {}
  // 将每个对象按省份分组
  arrs.forEach(item => {
    const code = item.areaCode
    const sf = code.substring(0, getCodeLength(mapNode))
    if (!provinceMap[sf]) {
      provinceMap[sf] = []
    }
    provinceMap[sf].push(item)
  })

  const filteredArr = []
  for (const province in provinceMap) {
    //   对每个省份的对象列表进行筛选，只保留三个不同类型的对象
    if (mapCode == 100000) {
      const provinceItems = provinceMap[province]
      const uniqueItems = []
      const fdList = provinceItems.filter(o => o.fdlx == 1)
      if (fdList.length) {
        uniqueItems.push(fdList[fdList.length - 1])
      }
      const gfList = provinceItems.filter(o => o.fdlx == 2)
      const jzList = gfList.filter(o => o.fcType == 1)
      if (jzList.length) {
        uniqueItems.push(jzList[jzList.length - 1])
      }
      const zcList = gfList.filter(o => o.fcType == 2)
      if (zcList.length) {
        uniqueItems.push(zcList[zcList.length - 1])
      }
      filteredArr.push(...uniqueItems)
    } else {
      filteredArr.push(...provinceMap[province])
    }
  }

  return filteredArr
}

/**
 * 地图导入用小写 json 格式 geoJson 报错
 * 获取地图文件路径 暂时不管理文件 直接放根路径
 */
function getMapPath(mapCode, leve) {
  const basePath =
    process.env.NODE_EN == 'development' ? '/mapJson' : '/show-svg-map/mapJson'
  let path = null
  path = `${basePath}/${mapCode}.json`
  return path
}

// 获取地图json数据 返回成功或者失败
export async function getGeoJournal(mapCode) {
  let usaJson = null
  try {
    const path = getMapPath(mapCode)
    const json = await axios.get(`${path}`)
    usaJson = json.data
  } catch (error) {
    usaJson = null
  }
  if (!usaJson) {
    // this.$message.warning(`该地区暂未接入，行政编号：${mapCode}`)
  }
  return usaJson
}

export function getTopIcons(filterDatas) {
  return filterDatas.map(item => {
    const fjObj = {
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: `image://${fjbase64}`,
      symbolOffset: [0, '-8px'],
      symbolSize: [20, 40]
    }
    const gfObj = {
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: `image://${guanfuban64}`,
      symbolOffset: [0, '-14px'],
      symbolSize: 25
    }

    const sunObj = {
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: `image://${sun64}`,
      symbolOffset: [0, '-14px'],
      symbolSize: 25
    }
    const obj = item.fdlx == 1 ? fjObj : item.fcType == 1 ? gfObj : sunObj
    // const obj = fjObj
    obj.data = [
      { ...item, name: item.fcNickname, value: [item.jd, item.wd, 100] }
    ]
    obj.id = item.fcNickname
    obj.name = item.fcNickname
    return obj
  })
}

export function getTooltip() {
  return {
    show: true,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderColor: 'transparent',
    borderWidth: 0,
    triggerOn: 'mousemove',
    textStyle: {
      color: '#fff',
      fontSize: 14,
      textShadowColor: 'transparent',
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0
    },
    // 优化 修复鼠标移动持续触发接口调用
    formatter: params => {
      console.log(params, 'params')

      // 隐藏南海诸岛
      if (
        ['南海诸岛', '香港特别行政区', '澳门特别行政区'].includes(params.name)
      ) {
        return ''
      }
      const data = params.data
      const sunHtml = data => {
        const dom = `
  <div class="mapTool">
  <h4>${params.name}</h4>
  <ul>
  <li>
  <label>装机容量:</label>
  <span>${data.zjrl.toFixed(2)}MW</span>
  </li>
  </ul>
  </div>
  `

        return dom
      }
      const allHtml = `
  <div class="mapToolBox" style="width: 240px;}">
  <i class="imgt" ></i>
  <div class="itemBox">
  ${sunHtml(data)}

  </div>
  <i class="imgb"></i>
  </div>
  `
      return allHtml
    }
  }
}
