<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <h5 class="video-title">图纸成册</h5>
          <p class="video-desc">
            对于公路设计行业，根据公路行业的篇章目录模板自动对图纸成册，自动生成封皮，扉页，目录
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
            src="../assets/image/intro_box_bg/book-demo.png"
            alt=""
          >
          <!-- <Button class="test-btn" size="large" @click="jumpToBook" type="primary">立即试用</Button> -->
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
import { DrawToBookHeaderInfo } from "utils/headerData.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: DrawToBookHeaderInfo,
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
    jumpToBook() {
      window.open("https://192.168.1.238:8080/static/toBook/tobook.html?id=7")
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
      background: url("../assets/image/intro_box_bg/to-book-bg.jpg") no-repeat
        100% 100%;
      @include flexJA(flex-start, flex-end);
      .video-txt {
        margin-left: 50px;
        margin-bottom: 39px;
        .video-title {
          width: 360px;
          font-size: 72px;
          font-weight: bold;
          color: #ffffff;
          text-align: left;
        }
        .video-desc {
          width: 590px;
          font-size: 16px;
          font-weight: 300;
          color: #ffffff;
          margin-top: 12px;
          text-align: left;
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
      @include flexJA(center, center);
      .origin-pic-box {
        position: relative;
        @include flexJA(center, center);
        width: 1200px;
        background-color: #ffffff;
        height: 428px;
        border: 1px solid #eeeeee;
        img {
          width: 637px;
          height: 369px;
        }
        .test-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding-top: 7px;
          padding-bottom: 7px;
          width: 205px;
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
