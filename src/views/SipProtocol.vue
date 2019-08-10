<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <p class="video-desc">方便地接入遵循SIP（Session Initiation Protocol，会话初始协议）的视频，与其他互联网协议结合提供丰富的IP多媒体业务,以便在各种网络环境下部署</p>
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
import { sipProtocolHeaderInfo } from "utils/headerData.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: sipProtocolHeaderInfo,
      /* eslint-disable */
      useData: [
        {
          title: "智能硬件应用场景",
          desc: "建立设备间的“沟通”桥梁，提供给可穿戴设备、智能家居、智能车载、传统硬件等领域合作伙伴"
        },
        {
          title: "呼叫中心应用场景",
          desc: "快速部署、功能强大，带来清晰稳定的通话效果，适用客户服务、、电话销售等场景"
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
      background: url("../assets/image/intro_box_bg/sip-protocol-bg.jpg") no-repeat;
      background-size: 100% 100%;
      @include flexJA(flex-start, center);
      .video-txt {
        margin-left: 80px;
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
