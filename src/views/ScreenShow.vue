<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <h5 class="video-title">大屏展示</h5>
          <p class="video-desc">
            数据可视化，可以增强数据的呈现效果，方便用户以更加直观的方式观察数据，进而发现数据中隐藏的信息，支持指挥中心大屏数据展示，快速集成
          </p>
        </div>
      </div>
    </div>
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <!-- 产品演示 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <img
            src="../assets/image/intro_box_bg/operation-demo.png"
            @click="jumpOperation"
            alt=""
          >
          <p class="screen-title">可视化运维大屏展示</p>
        </div>
        <div class="origin-pic-box">
          <img
            src="../assets/image/intro_box_bg/construction-demo.png"
            @click="jumpConstruction"
            alt=""
          >
          <p class="screen-title">可视化工地大屏展示</p>
        </div>
      </div>
      <!-- 应用场景 -->
      <h5 class="intro-title use-content-title">应用场景</h5>
      <div class="use-content">
        <div
          class="use-box"
          v-for="(item, index) of useData"
          :key="index"
        >
          <p class="use-title">{{ item.title }}</p>
          <p class="use-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script type="text/ecmascript-6">
import Footer from "../components/home/Footer";
import CommonHeader from "components/common/CommonHeader";
import { ScreenShowHeaderInfo } from "utils/headerData.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: ScreenShowHeaderInfo,
      /* eslint-disable */
      useData: [
        {
          title: "监控视频的存储",
          desc: "工地等场景接入视频，无需跟摄像头的厂家合作，即可存储视频存储到任意目标服务器"
        },
        {
          title: "会议视频的存储",
          desc: "记录会议视频，并自由存储，随意读取"
        }
      ]
    };
  },
  methods: {
    jumpOperation() {
      window.open("http://192.168.3.244:9080/beiyong/daping/#/home")
    },
    jumpConstruction() {
      window.open("http://120.27.21.149:9089/bimonlinePC/dist/index.html#/login?PaaS=paas")
    }
  }
};
</script>
<style lang="scss" scoped>
.video-storage {
  .intro-title {
    @include introTitle();
  }
  // 产品介绍相关
  .intro-box {
    .video-intro {
      margin: 0 auto;
      width: 1200px;
      height: 320px;
      border: 1px solid #eeeeee;
      background: url("../assets/image/intro_box_bg/screen-show-bg.jpg")
        no-repeat 100% 100%;
      @include flexJA(flex-end, center);
      .video-txt {
        margin-right: 20px;
        .video-title {
          width: 304px;
          font-size: 72px;
          font-weight: bold;
          color: #ffffff;
          text-align: right;
        }
        .video-desc {
          width: 304px;
          font-size: 16px;
          font-weight: 300;
          color: #ffffff;
          margin-top: 12px;
          text-align: right;
        }
      }
    }
  }
  // 演示demo相关
  .demo-box {
    width: 100%;
    background-color: $introBgColor;
    margin-top: 30px;
    padding-bottom: 30px;
    .img-result {
      margin: 0 auto;
      width: 1200px;
      height: 428px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      @include flexJA(space-around, center);
      .origin-pic-box {
        position: relative;
        img {
          width: 553px;
          height: 312px;
          cursor: pointer;
        }
        .screen-title {
          width: 553px;
          text-align: center;
          color: #263659;
          margin-top: 20px;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 24px;
        }
      }
    }
    //应用场景
    .use-content-title {
      margin-top: 17px;
    }
    .use-content {
      @include flexJA(center, center);
      .use-box {
        margin: 0 10px;
        .use-title {
          width: 588px;
          height: 52px;
          background: #ffffff;
          font-size: 14px;
          font-weight: 400;
          color: $primaryTitle;
          padding: 20px 20px 18px 20px;
          text-align: left;
          border-bottom: 2px solid $introBgColor;
        }
        .use-desc {
          width: 588px;
          height: 160px;
          background: #ffffff;
          font-size: 14px;
          font-weight: 300;
          color: #b5b5b5;
          line-height: 24px;
          padding: 16px 26px 0 16px;
          text-align: left;
        }
      }
    }
  }
}
</style>
