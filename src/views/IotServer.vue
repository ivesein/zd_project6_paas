<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <p class="video-title">IoT SERVER</p>
          <p class="video-desc">
            支持接入MQTT、CoAP以及JT808等标准协议，同时支持用户自定义协议。
            平台提供消息订阅功能，并提供API接口，以供用户获取数据
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
            src="../assets/image/intro_box_bg/iot-server-demo-bg.jpg"
            alt=""
          >
          <Button
            class="test-btn"
            size="large"
            type="primary"
            @click="goIoTServer"
          >立即试用</Button>
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
import { IotServerHeaderInfo } from "utils/headerData.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: IotServerHeaderInfo,
      /* eslint-disable */
      useData: [
        {
          title: "车辆人员轨迹展示",
          desc: "前端定位设备上传定位经纬度数据至该平台，用户可通过APP查看人员车辆的轨迹数据，实现轨迹的可视化。"
        },
        {
          title: "温度可视化",
          desc: "温度传感器数据上传至IoT平台，实现温度数据的可视化，进而可进行温度数据分析"
        }
      ]
    };
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile() {
      this.$refs.imageFile.click()
    },
    // 文件改变
    fileChange() {
      console.log(this.$refs.imageFile.files)
    },
    goIoTServer() {
      // window.open("http://iotserver.vip/#/dashboard")
      window.open("http://192.168.3.244:9069")
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
      height: 466px;
      border: 1px solid #eeeeee;
      background: url("../assets/image/intro_box_bg/iot-server-intro-bg.jpg")
        no-repeat 100% 100%;
      @include flexJA(flex-start, center);
      .video-txt {
        margin-left: 50px;
        .video-title {
          width: 360px;
          font-size: 44px;
          font-weight: bold;
          color: #fff;
          text-align: left;
          margin-top: 314px;
        }
        .video-desc {
          width: 600px;
          font-size: 16px;
          font-weight: 300;
          color: #fff;
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
