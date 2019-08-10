<template>
  <div class="header-bg-box">
    <HeaderNav></HeaderNav>
    <div class="header-content-box">
      <div class="content-right">
        <div class="content-btn-box">
          <span class="content-text">用AI连接世界</span>
          <span class="sub-text"
            >平台免费提供：
            视频技术、语音技术、图像技术、文本检测技术CAD图纸识别技术、BIM模型技术</span
          >
          <div class="btn-check-all-demos">
            <span @click="jump">查看所有demo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderNav from "components/common/HeaderNav"
export default {
  data() {
    return {
    }
  },
  components: {
    HeaderNav
  },
  methods: {
    showService() {
      console.log('show-on')
      this.isServiceShow = !this.isServiceShow;
    },
    hideService() {
      console.log('show-off')
      this.isServiceShow = false;
    },
    jump() {
      this.$router.push({ path: '/desktop' })
    }
  }
}
</script>

<style scoped lang="scss">
.header-bg-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  background: url("../../assets/image/header-bg.jpg") no-repeat;
  background-size: 100% 100%;

  .header-content-box {
    display: flex;
    width: 100%;
    flex: 1;
    justify-content: flex-end;
    align-items: center;

    .content-right {
      display: flex;
      width: 49%;
      height: 100%;
      justify-content: flex-start;
      align-items: center;

      .content-btn-box {
        width: 469px;
        height: 230px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;

        .content-text {
          font-size: 68px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 6px;
          width: 469px;
          text-align: left;
          white-space: nowrap;
        }

        .sub-text {
          font-size: 16px;
          color: $primary;
          text-align: left;
          margin-bottom: 20px;
        }

        .btn-check-all-demos {
          width: 220px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3170f6;
          cursor: pointer;

          span {
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
