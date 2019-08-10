<template>
  <div
    class="common-header"
    :style="{
      backgroundImage: 'url(' + headerInfo.headerBgImg + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <HeaderNav></HeaderNav>
    <div class="header-content-box">
      <div class="content-left">
        <div class="content-btn-box">
          <span class="content-text">{{ headerInfo.title }}</span>
          <p class="introduce-text">
            {{ headerInfo.subTitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderNav from "components/common/HeaderNav"
export default {
  props: ['headerInfo'],
  data() {
    return {

    }
  },
  components: {
    HeaderNav
  }
}
</script>

<style scoped lang="scss">
.common-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 440px;
  background: #fff;

  .header-content-box {
    display: flex;
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;

    .content-left {
      display: flex;
      width: 1200px;
      height: 100%;
      justify-content: flex-start;
      align-items: center;

      .content-btn-box {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;

        .content-text {
          font-size: 68px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 6px;
          width: 100%;
          white-space: nowrap;
          text-align: left;
        }

        .introduce-text {
          width: 500px;
          font-size: 16px;
          color: $subTitle;
          text-align: left;
        }
      }
    }
  }
}
</style>
