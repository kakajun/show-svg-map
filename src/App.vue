<template>
  <div id="app">
    <div class="mapwrapper">
      <echartMap :mapCode="mapCode" ref="mapEchart" @mapChange="mapChange" />
    </div>
  </div>
</template>

<script>
import echartMap from './components/echartMap.vue'

export default {
  name: 'App',
  components: {
    echartMap
  },
  data() {
    return {
      mapCode: '100000'
    }
  },
  methods: {
    //地图改变了
    mapChange(mapCode) {
      this.mapCode = String(mapCode)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  background: #0e0c0d;
}
.mapwrapper {
  margin: 0 auto;
  color: #2c3e50;
  padding-top: 60px;
  width: 865px;
  height: 660px;
}
</style>
