<template>
  <div class="file-conversion">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-check-intro">
        <span class="intro-sub-title">现在支持的文件转换的格式如下:</span>
        <p class="intro-sub-text" v-for="(item, index) in subText" :key="index">
          {{ item }}
        </p>
        <p class="efficiency"><span>效率： 100页的doc转为pdf</span>3秒</p>
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="file-conversion-demo-box">
        <div class="upload-box">
          <img src="../assets/image/pro_demo/demo-box-left-img.png" alt="" />
          <img src="../assets/image/pro_demo/demo-box-left-img.png" alt="" />
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button id="submitBtn">本地上传</Button>
          </Upload>
        </div>
        <div class="convert-btn">
          <div class="trans-btn btn-pdf">
            <span>转换为pdf</span>
          </div>
          <div class="trans-btn btn-png">
            <span>转换为png</span>
          </div>
        </div>
        <div class="upload-box result-box">
          <img src="../assets/image/pro_demo/demo-box-left-img.png" alt="" />
          <img src="../assets/image/pro_demo/demo-box-left-img.png" alt="" />
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
import { FileConversionHeaderInfo } from "utils/headerData.js";
export default {
  data() {
    return {
      headerInfo: FileConversionHeaderInfo,
      subText: [
        "1. doc/docx 可以转换为 pdf，png",
        "2. PDF 转为 png",
        "3. dwg 转为 png"
      ],
      useData: [
        {
          title: "图纸转PDF",
          desc: "使用图纸转化技术，实现将dwg的源文件图纸转换为PDF，防篡改，防盗图。"
        },
        {
          title: " Office，PDF，png互转",
          desc: "自动实现Word，PPT等office转为PDF，PDF与图片png自动互转。"
        }
      ]
    }
  },
  components: {
    CommonHeader,
    Footer
  }
}
</script>

<style scoped lang="scss">
.file-conversion {
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
      padding-top: 204px;
      padding-left: 606px;
      background: url("../assets/image/intro_box_bg/file-conversion-intro-bg.jpg")
        no-repeat center;

      .intro-sub-title {
        font-size: 32px;
        line-height: 32px;
        color: $white;
        text-align: left;
        letter-spacing: 4px;
        margin-bottom: 24px;
      }

      .intro-sub-text {
        // width: 487px;
        font-size: 23px;
        color: $white;
        text-align: left;
        font-weight: 300;
        font-family: SourceHanSansCN-Light;
      }

      .efficiency {
        width: 100%;
        height: 34px;
        font-size: 36px;
        color: #ff0000;
        font-weight: 700;
        text-align: left;

        span {
          font-size: 20px;
          color: $white;
          margin-right: 10px;
          letter-spacing: 2px;
        }
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

    .file-conversion-demo-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1200px;
      height: 730px;
      background: $white;
      padding: 58px 78px;
      border: 1px solid #c7c7c7;

      .upload-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 320px;
        height: 100%;

        img {
          width: 310px;
          height: 252px;
          margin-bottom: 24px;
        }

        .ivu-upload {
          width: 98px;
          height: 48px;
          margin-top: 15px;

          #submitBtn {
            width: 96px;
            height: 48px;
            border-radius: 0;
            background: $primary;
            border: none;
            font-size: 18px;
            font-weight: 700;
            color: $white;
          }
        }
      }

      .convert-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 326px;
        height: 174px;
        margin: 0 46px;

        .trans-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 68px;
          cursor: pointer;
        }

        .btn-pdf {
          background: $primary;

          span {
            font-size: 18px;
            font-weight: 400;
            color: $white;
          }
        }

        .btn-png {
          background: $white;
          border: 1px solid $primary;

          span {
            font-size: 18px;
            font-weight: 400;
            color: $primary;
          }
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
