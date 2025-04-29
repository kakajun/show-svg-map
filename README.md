# show-svg-map

## 说明

这个 demo 是展示 svg 图片在地图中展示的案例, 支持多层级的下钻, 本工程用的vue2, vue3 的可以修改再用

## 特点

> 1. 支持 svg 图片动态展示, 关键点是` echarts.init(this.$refs.echart, null, { renderer: 'svg' }) `, 不能是canvas
> 2. 中国地图轮廓高亮
