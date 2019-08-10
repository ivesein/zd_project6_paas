<template>
  <!--eslint-disable-->
  <div class="header-nav-box">
    <div class="header-nav">
      <img
        src="../../assets/image/logo-xl.png"
        alt="中达"
        @click="goHome"
        class="logo"
      />
      <span
        class="logo-text"
        @click="goHome"
      >中达PaaS服务平台</span>
      <div class="nav-item-box">
        <span @click="goHome">平台介绍</span>
      </div>
      <div class="nav-item-box service-box">
        <span @mouseenter="showService">产品服务</span>
        <div
          class="triangle-symbol"
          v-show="isServiceShow"
        ></div>
      </div>
      <div class="nav-item-box">
        <span @click="telModal">合作联系</span>
      </div>
      <div class="btn-box">
        <div
          class="btn-check-all-demos"
          @click="jumpToAll"
        >
          <span>查看所有demo</span>
        </div>
      </div>
      <div
        class="service-item-box"
        @mouseleave="hideService"
        v-show="isServiceShow"
      >
        <div
          class="service-item"
          v-for="(item, index) in serviceInfo"
          :key="index"
        >
          <div class="title">
            <span class="title-text">{{ item.title }}</span>
          </div>
          <span
            class="service-info-text"
            v-for="(info, index) in item.items"
            :key="index"
            @click="goItemPage(info)"
          >{{ info.subTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import { serviceData } from "utils/serviceData.js";

export default {
  data() {
    return {
      isServiceShow: false,
      serviceInfo: serviceData,
    };
  },
  components: {},
  methods: {
    showService() {
      console.log("show-on");
      this.isServiceShow = !this.isServiceShow;
    },
    hideService() {
      console.log("show-off");
      this.isServiceShow = false;
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    jumpToAll() {
      this.$router.push({ path: "/desktop" });
    },
    goItemPage(info) {
      if (info.subUrl) {
        if (info.open) {
          window.open(info.subUrl)
        } else {
          this.$router.push({ path: info.subUrl });

        }
      } else {
        this.$router.push({ path: "/" });
      }
    },
    telModal() {
      this.$Modal.confirm({
        okText: false,
        render: h => {
          return (
            <p>如您有需要的服务可电话联系：钱先生180 9158 9062</p>
          )
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.header-nav-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 59px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .header-nav {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1200px;
    height: 100%;
    // overflow: hidden;

    .service-box {
      position: relative;

      .triangle-symbol {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 0;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-bottom: 10px solid #fff;
        z-index: 888;
      }
    }

    .service-item-box {
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      right: 0;
      bottom: -330px;
      width: 900px;
      height: 330px;
      background: #fff;
      padding: 0 40px;

      .service-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 110px;
        height: 100%;

        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100px;
          height: 64px;
          border-bottom: 1px solid #eee;
          margin-left: 10px;

          span {
            font-size: 14px;
            color: $primary;
          }
        }

        .service-info-text {
          cursor: pointer;
          display: block;
          width: 110px;
          padding-left: 10px;
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          text-align: left;
          color: $primaryTitle;
          margin-top: 6px;
        }

        .service-info-text:hover {
          color: $primary;
          background: rgba(49, 112, 246, 0.08);
        }
      }
    }
  }

  .logo {
    width: 74px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .logo-text {
    white-space: nowrap;
    display: inline-block;
    width: 153px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    color: #fff;
    margin-right: 45px;
    cursor: pointer;
  }

  .nav-item-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 100%;
    cursor: pointer;

    span {
      font-size: 14px;
      color: #fff;
    }

    span:hover {
      // font-size: 14px;
      color: #3170f6;
    }
  }

  .btn-box {
    cursor: pointer;
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: flex-end;
    align-items: center;

    .btn-check-all-demos {
      width: 154px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      background: #3170f6;

      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
