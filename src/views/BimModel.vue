<template>
  <div class="bim-model">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-check-intro">
        <span class="intro-sub-title">BIM模型展示</span>
        <p class="intro-sub-text">
          基于BIM server实现对BIM模型的展示，200M以内的模型秒速
          展示，可选择性查看或隐藏BIM中的构件
        </p>
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="face-check-demo-box">
        <div class="demo-box-left">
          <img
            class="left-img"
            src="../assets/image/pro_demo/demo-box-left-img.png"
            alt=""
          />
          <span class="left-text">支持格式： ifc， obj， fbx</span>
        </div>
        <div class="demo-box-right">
          <Button class="test-btn" size="large" type="primary" @click="goModel"
            >模型展示</Button
          >
          <!-- <button @click="goModel">模型</button> -->
          <!-- <iframe
            id="bimIframe"
            src="static/modelViewer/index.html"
            frameborder="0"
          ></iframe> -->
        </div>
      </div>
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
import { BimModelHeaderInfo } from "utils/headerData.js";
export default {
  data() {
    return {
      headerInfo: BimModelHeaderInfo,
      useData: [
        {
          title: "BIM模型展示",
          desc: "针对公路、房建行业施工时使用的BIM模型，该功能可对ifc格式的BIM模型进行展示。"
        },
        {
          title: "BIM模型操作",
          desc: "针对用户上传的BIM模型，可进行子模型选中、高亮、旋转、信息展示等操作。"
        }
      ]
    }
  },
  components: {
    CommonHeader,
    Footer
  },
  methods: {
    goModel() {
      window.open("http://192.168.6.224.:3001/obj_Viewer.html")
    }
  }
}
</script>

<style scoped lang="scss">
.bim-model {
  width: 100%;
  // overflow-y: scroll;

  .intro-title {
    @include introTitle();
  }

  .intro-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .face-check-intro {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 1200px;
      height: 466px;
      padding: 310px 40px 37px 710px;
      // padding-top: 117px;
      // padding-left: 152px;
      background: url("../assets/image/intro_box_bg/bim-model-intro-bg.jpg")
        no-repeat center;

      .intro-sub-title {
        font-size: 56px;
        line-height: 56px;
        color: $white;
        text-align: left;
        letter-spacing: 8px;
      }

      .intro-sub-text {
        // width: 487px;
        line-height: 24px;
        font-size: 16px;
        color: $white;
        text-align: left;
      }
    }
  }

  .demo-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 27px;
    background: $introBgColor;
    padding-bottom: 30px;

    .face-check-demo-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 1200px;
      height: 730px;
      background: $white;

      .demo-box-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 17px 22px;
        width: 355px;
        height: 100%;
        border: 1px solid #c7c7c7;

        .left-img {
          width: 311px;
          height: 252px;
        }

        .left-text {
          margin-top: 40px;
          font-size: 14px;
          color: #000;
        }
      }

      .demo-box-right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        padding: 10px;
        border: 1px solid #c7c7c7;
        background: url("../assets/image/pro_demo/bim_model2.jpg") no-repeat
          center;

        #bimIframe {
          width: 100%;
          height: 100%;
        }

        .test-btn {
          width: 205px;
          font-size: 24px;
        }
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
</style>
