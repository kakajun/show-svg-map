<template>
  <div class="status-container" :style="cpustyle">
    <div class="icon-group">
      <span class="icon wind-farm mr10px">
        <img src="./fj.svg" width="20px" height="30px" alt="风电场" />
        风电场
      </span>
      <span class="icon distributed-solar mr10px">
        <img src="./sun.svg" width="20px" alt="分布式光伏" />
        分布式光伏
      </span>
      <span class="icon centralized-solar">
        <img src="./guangfu.svg" width="20px" height="20px" alt="集中式光伏" />
        集中式光伏
      </span>
    </div>
    <div class="status-group">
      <div class="status" v-for="(status, index) in statusList" :key="index">
        <div class="mr5px item-radius" :style="getStyle(status)" />
        {{ status.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapIcon',
  props: {
    mapCode: String
  },
  data() {
    return {
      statusList: [
        { type: 'idle', name: '运行', color: '#1ac395', icon: '待机.png' },
        {
          type: 'maintenance',
          name: '维护',
          color: 'yellow',
          icon: '维护.png'
        },
        { type: 'fault', name: '故障', color: 'red', icon: '故障.png' },
        { type: 'interrupt', name: '中断', color: 'gray', icon: '中断.png' }
      ]
    }
  },
  computed: {
    cpustyle() {
      return this.mapCode.startsWith('36')
        ? { right: 10 + 'px', left: 'auto' }
        : {}
    }
  },
  methods: {
    getStyle(status) {
      return {
        width: '10px',
        height: '10px',
        backgroundColor: status.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.status-container {
  position: absolute;
  background: url('~@/assets/图例框.png');
  background-size: 100% 100%;
  width: 350px;
  bottom: 0;
  left: 10px;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.icon-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.icon {
  font-size: 16px;
  display: flex;
  align-items: center;
}
.icon img {
  margin-right: 5px;
}
.status-group {
  display: flex;
  justify-content: space-between;
}
.status {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.item-radius {
  border-radius: 10px;
}
</style>
