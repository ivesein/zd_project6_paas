<template>
  <div class="content-page">
    <div class="content">
      <div class="content-title">
        <span class="title-text">服务分类</span>
      </div>
      <Service></Service>
      <!-- 放你的content内的组件 -->
      <UseProcess></UseProcess>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from 'components/home/Service';

import UseProcess from "./UseProcess";
export default {
  data() {
    return {

    }
  },
  components: {
    Service,
    UseProcess
  }
}
</script>

<style scoped lang="scss">
.content-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 804px;
  background: $white;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 1216px;
    height: 100%;

    .content-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 84px;

      .title-text {
        font-size: 24px;
        color: $primaryTitle;
        font-weight: 800;
      }
    }
  }
}
</style>
