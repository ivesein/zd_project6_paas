<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <h5 class="video-title">支持任意格式的视频存储无需跟摄像头的厂家合作</h5>
          <p class="video-desc">完整视频存储解决方案转码,存储,分发,让您的应用服务更轻盈</p>
        </div>
      </div>
    </div>
    <div class="demo-box">
      <!-- 应用场景 -->
      <h5 class="intro-title use-content-title">应用场景</h5>
      <div class="use-content">
        <div class="use-box" v-for="(item, index) of useData" :key="index">
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
import { videoStorageHeaderInfo } from "utils/headerData.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: videoStorageHeaderInfo,
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
    // 本地上传按钮被点击了
    uploadFile(){
      this.$refs.imageFile.click()
    },
    // 文件改变
    fileChange(){
      console.log(this.$refs.imageFile.files)
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
      background: url("../assets/image/intro_box_bg/video-stroage-bg.jpg") no-repeat 100% 100%;
      @include flexJA(flex-start, center);
      .video-txt {
        margin-left: 80px;
        .video-title {
          width: 360px;
          font-size: 30px;
          font-weight: bold;
          color: #ffffff;
          line-height: 36px;
          text-align: left;
        }
        .video-desc{
          width:414px;
          font-size:14px;
          font-weight:300;
          color:#ffffff;
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
