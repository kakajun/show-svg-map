<template>
  <div class="mapEchart">
    <custom-map
      ref="customMapRef"
      @mapClick="mapClick"
      @mapMouseout="mapMouseout"
      @returnSuperior="mapClick"
      :mapCode="mapCode"
    />
    <mapIcon :mapCode="mapCode"></mapIcon>
  </div>
</template>

<script>
import customMap from './map/mapIndex.vue'
import * as echarts from 'echarts'
import mapIcon from './map/mapIcon.vue'

window.echarts = echarts
export default {
  name: 'mapEchart',
  props: {
    mapCode: String
  },
  data() {
    return {
    }
  },
  components: {
    customMap,
    mapIcon
  },
  mounted() {},

  methods: {
    mapClick(mapCode, mapNode) {
      this.$emit('mapChange', mapCode)
    },
    mapMouseout(params) {}
  }
}
</script>

<style lang="scss" scoped>
.mapEchart {
  position: relative;
  width: 100%;
  height: calc(100vh - 155px);
  background-size: 100%;
  background-position: 50% 70%;
  background-repeat: no-repeat;
  .bg_end {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 2%;
  }
}
</style>
