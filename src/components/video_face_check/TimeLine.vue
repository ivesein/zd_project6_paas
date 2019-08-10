<template>
  <div class="time-line">
    <div class="bg-line"></div>
    <div class="pos-bpx" :style="{ width: getWidth, left: getLeft }"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["info"],
  data() {
    return {
      position: {
        width: 0,
        left: 0
      }
    }
  },
  components: {

  },
  computed: {
    //计算滑块宽度
    getWidth() {
      return (this.info.endTime - this.info.startTime) * this.info.theWidth / this.info.duration + "px";
    },
    //计算滑块偏移量
    getLeft() {
      if (this.info.startTime == 0) {
        return 0;
      }
      return this.info.startTime * this.info.theWidth / this.info.duration + "px";
    }
  },
  mounted() {
    console.log("this.info", this.info)
  }
}
</script>

<style scoped lang="scss">
.time-line {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12px;

  .bg-line {
    width: 100%;
    height: 3px;
    background: $primaryTitle;
  }

  .pos-bpx {
    position: absolute;
    top: 0;
    left: 45px;
    width: 30px;
    height: 12px;
    background: #4498eb;
  }
}
</style>
