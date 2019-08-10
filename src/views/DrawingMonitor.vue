<template>
  <div class="vehicle-rec">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="paper-intro">
        <div class="paper-txt-box">
          <p class="paper-title">图纸监测</p>
          <p class="paper-txt">上传文件，监测文件是否为图纸</p>
        </div>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <div class="img-span-box">
            <img
              v-if="isPng"
              class="drawing-img"
              :src="pngUrl"
              alt="原始图片"
            />
            <span v-else>{{theFileName}}</span>
          </div>
          <Button
            class="now-upload"
            size="large"
            type="primary"
            @click="uploadFile"
            ghost
          >本地上传</Button>
          <input
            v-show="false"
            type="file"
            @change="fileChange"
            ref="imageFile"
            name="image"
            accept="*"
          >
          <p class="oprate-tip">
            支持格式png,pdf,doc,docx
          </p>
          <Button
            class="test-btn"
            size="large"
            type="primary"
            @click="goCheck"
          >检 测</Button>
        </div>
        <!-- 识别结果盒子 -->
        <div class="result-box">
          <Spin
            fix
            v-if="isChecking"
          ></Spin>
          <div>
            <img
              v-if="checkRes"
              src="../assets/image/is-right.png"
              alt=""
            >
            <img
              v-else
              src="../assets/image/is-error.png"
              alt=""
            >
            <h5
              v-if="checkRes"
              class="result-txt"
            >是图纸，含有CAD图纸或表格</h5>
            <h5
              v-else
              class="result-txt"
            >不是图纸，不含CAD图纸或表格</h5>
          </div>
          <span class="origin-pic-title">识别结果</span>
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
import { drawingMonitorHeaderInfo } from "utils/headerData.js";
import { drawingUpload, drawingCheck } from "utils/api.js";
import { fileTypeCheck, getObjectURL } from "utils/utils.js"
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: drawingMonitorHeaderInfo,
      theFile: null,  //上传成功后的文件对象
      pngUrl: "",   //上传的文件为png图片文件时创建的预览地址
      isPng: false, //上传的文件是否为png图片文件
      theFileName: "请上传图纸文件", //上传成功的文件名
      isCheckReady: false, //是否可以开始检测
      currentFileType: "", //当前成功上传的文件类型
      isChecking: false,   //是否检测中
      file_name: "",       //上传成功后返回的文件名
      checkRes: true,      //监测结果 是否有图纸
      /* eslint-disable */
      useData: [
        {
          title: "设计行业检测异地成员提交的成果是否为图纸",
          desc: "当设计成员在异地协同工作，无法实时跟进成员的设计成果，可以通过该服务来监测成员上传的是否为图纸"
        },
        {
          title: "设计行业外包或众包，自动检测成员的设计成果",
          desc: "当将公路设计，房建等设计工作众包或者外包的情况下，发包人无法实时跟进成员的设计成果，可以通过该服务来监测成员上传的是否为图纸"
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
    async fileChange() {
      console.log(this.$refs.imageFile.files)
      if (this.isChecking) { return; };
      let type = fileTypeCheck(this.$refs.imageFile.files[0])
      console.log("type>>>", type)
      if (type == "文件类型不正确") {
        this.$Message.error("请上传png、pdf、doc、docx等类型文件");
      } else {
        this.setPngOrName(type, this.$refs.imageFile.files[0]) //如果文件正确 设置预览内容
        this.theFile = this.$refs.imageFile.files[0]
        let formData = new FormData()
        formData.append("file", this.theFile);
        this.uploadDrawingFile(type, formData);  //上传文件
      }
    },
    // 上传文件处理方法
    async uploadDrawingFile(type, data) {
      let res = await drawingUpload(type, data);
      console.log("res>>>", res)
      if (res.data.ret == 1) {
        this.$Message.info("上传成功");
        this.isCheckReady = true;   //上传成功 可开始检测
        this.currentFileType = type;  //设置当前可检测文件类型
        this.file_name = res.data.info.file_name;
      }
    },
    //设置要预览的png图片或其他类型文件的文件名
    setPngOrName(type, file) {
      if (type === "png") {
        this.isPng = true;
        this.pngUrl = getObjectURL(file)
      } else {
        this.isPng = false;
        this.theFileName = file.name
      }
    },
    async goCheck() {
      if (!this.isCheckReady) { return }; //是否准备好
      if (this.isChecking) { return };    //是否还在检测中
      this.isChecking = true;
      let res = await drawingCheck(this.currentFileType, this.file_name);  //开始检测
      console.log("check res>>>", res)
      if (res.data.ret == 1) {
        if (res.data.info.spam == 0) {
          //是图纸
          this.checkRes = true;
        } else {
          //不是图纸
          this.checkRes = false;
        }
      } else if (res.data.ret == -1) {
        this.$Message.error("网络或后台服务出错，请稍后再试..")
      }
      this.isChecking = false;
      this.isCheckReady = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.vehicle-rec {
  .intro-title {
    @include introTitle();
  }
  // 产品介绍相关
  .intro-box {
    .paper-intro {
      margin: 0 auto;
      width: 1200px;
      height: 320px;
      border: 1px solid #eeeeee;
      background-color: $introBgColor;
      background: url("../assets/image/intro_box_bg/drawing-moni-bg.jpg")
        no-repeat;
      background-size: 100% 100%;
      @include flexJA(flex-end, flex-end);
      .paper-txt-box {
        margin-right: 65px;
        margin-bottom: 50px;
      }
      .paper-title {
        width: 301px;
        font-size: 72px;
        font-weight: bold;
        color: #fff;
        text-align: left;
      }
      .paper-txt {
        width: 230px;
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        text-align: left;
      }
    }
  }
  // 演示demo相关
  .demo-box {
    width: 100%;
    padding-bottom: 30px;
    background-color: $introBgColor;
    margin-top: 30px;
    .img-result {
      @include flexJA(center, center);
      .origin-pic-box {
        position: relative;
        width: 592px;
        height: 723px;
        border: 1px solid #eeeeee;
        background: #fff;
        padding: 30px;

        .img-span-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 346px;
          border: 1px solid #c7c7c7;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }

          span {
            font-size: 18px;
            color: $primaryTitle;
          }
        }

        .drawing-img {
          margin: 0 auto;
          width: 490px;
          height: 346px;
        }
        .now-upload {
          margin-top: 38px;
          // color: $primary;
          // border-color: $primary;
          width: 275px;
          font-size: 24px;
        }
        .test-btn {
          width: 275px;
          font-size: 24px;
        }
        .oprate-tip {
          margin: 30px 0;
          font-size: 14px;
          font-weight: 400;
          color: #3d1b1b;
          line-height: 18px;
          text-align: center;
        }
      }
      .origin-pic-title {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        padding: 10px 20px;
        font-size: 14px;
        width: 100px;
        color: #999999;
        background: #f7f9ff;
        border: 1px solid #eeeeee;
      }
      .result-box {
        position: relative;
        width: 592px;
        height: 723px;
        background: #fff;
        border: 1px solid #eee;
        margin-left: 20px;
        @include flexJA(center, center);
        .result-txt {
          font-size: 32px;
          font-weight: bold;
          color: #000000;
          margin-top: 60px;
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
