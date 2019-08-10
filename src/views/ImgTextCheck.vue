<template>
  <div class="img-text-check">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="img-text-check-intro">
        <span class="intro-sub-title">图像中的文本识别</span>
        <p class="intro-sub-text">
          检查文件是否为图纸，如公路设计行业的图表
        </p>
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="file-conversion-demo-box">
        <div class="demo-box-lef">
          <div class="img-box">
            <div class="img-item img-left">
              <span class="img-title">
                原始图片
              </span>
              <img :src="defaultImg" alt="" />
            </div>
            <div class="img-item img-right">
              <Spin fix v-if="isChecking"></Spin>
              <span class="img-title">
                框处文本的图片
              </span>
              <img
                src="../assets/image/pro_demo/demo-box-left-img.png"
                alt=""
              />
            </div>
          </div>
          <div class="input-box">
            <!-- <input
              type="text"
              placeholder="请输入网络图片URL"
              class="url-input"
            />
            <div class="check-btn"><span>检测</span></div>
            <span class="text-or">或</span> -->
            <Button
              class="now-upload"
              size="large"
              type="primary"
              @click="uploadFile"
              >本地上传</Button
            >
            <input
              v-show="false"
              type="file"
              @change="fileChange"
              ref="imageFile"
              name="image"
              accept="*"
            />
            <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button id="submitBtn">本地上传</Button>
            </!-->
          </div>
          <div class="img-list-box">
            <img
              v-for="(item, index) in imgList"
              :key="index"
              :src="item"
              alt=""
            />
          </div>
        </div>
        <div class="demo-box-right">
          <Spin fix v-if="isChecking"></Spin>
          <div class="box-right-title">
            <span>识别结果</span>
          </div>
          <div class="check-result-box">
            <p class="res-info">{{ resInfo }}</p>
          </div>
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
import { ImgTextCheckHeaderInfo } from "utils/headerData.js";
import { imgTextCheckFileType, getObjectURL } from "utils/utils.js";
import { imgTextCheckUpload, ImgTextCheck, imgTextCheckShow } from "utils/api.js"

export default {
  data() {
    return {
      headerInfo: ImgTextCheckHeaderInfo,
      defaultImg: require("../assets/image/pro_demo/demo-box-left-img.png"),
      resaultImg: require("../assets/image/pro_demo/demo-box-left-img.png"),
      isChecking: false,
      imgList: [
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
        require("../assets/image/img-text-check.png"),
      ],
      imgShowPrefix: "http://192.168.111.209:5070/static/text_image/", //要显示的图片列表路径修正
      imgResPrefix: "http://192.168.111.209:5070/static/text_image_output/", //识别结果图片路径修正
      resInfo: "",
      useData: [
        {
          title: "图片内容审核",
          desc: "在社交、电商等应用中，大量的UGC图片中包含微商广告、敏感内容，使用网络图片文字识别可以准确识别图片中的文字，规避业务风险。"
        },
        {
          title: "视频内容分析和审核",
          desc: "针对复杂背景、复杂字体进行了专项优化，应用于短视频、直播等视频场景下的文字识别，方便用户进行视频标注，视频违规判断等处理。"
        }
      ]
    }
  },
  components: {
    CommonHeader,
    Footer
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile() {
      if (this.isChecking) { return; };
      this.$refs.imageFile.click()
    },
    fileChange() {
      console.log(this.$refs.imageFile.files)
      let type = imgTextCheckFileType(this.$refs.imageFile.files[0])
      if (type == "文件类型不正确") {
        this.$Message.error("请上传png、jpg类型文件");
      } else {
        this.defaultImg = getObjectURL(this.$refs.imageFile.files[0]);
        let formData = new FormData()
        formData.append("file", this.$refs.imageFile.files[0]);
        this.imgTextCheckFileUpload(type, formData);  //上传文件
      }
    },
    //上传文件处理方法
    async imgTextCheckFileUpload(type, data) {
      try {
        let res = await imgTextCheckUpload(type, data);
        console.log("upload res>>>", res);
        if (res.data.ret == 1) {
          this.$Message.info("上传成功，开始监测！");
          this.isChecking = true;
          let showRes = await imgTextCheckShow();
          console.log("resShow>>>", showRes);
          if (showRes.data.ret == 1) {
            //获取要显示图片列表
            this.imgList = [];
            showRes.data.info.upload_files.forEach(v => {
              this.imgList.push(this.imgShowPrefix + v)
            });
          }
          let checkRes = await ImgTextCheck(type, res.data.info.file_name);
          console.log("checkRes>>>", checkRes)
          if (checkRes.data.ret == 1) {
            this.resaultImg = this.imgShowPrefix + this.imgResPrefix + "." + type;
            this.resInfo = checkRes.data.info.text;
            this.isChecking = false;
          } else {
            this.isChecking = false;
            this.$Message.error("未识别出文字，请稍后再试...")
          }
        }
      } catch (error) {
        console.log(error);
        this.isChecking = false;
        this.$Message.error("网络或服务器出错，请稍后再试...")
      }
    }
  }
}
</script>

<style scoped lang="scss">
.img-text-check {
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

    .img-text-check-intro {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      width: 1200px;
      height: 466px;
      padding-top: 302px;
      padding-right: 36px;
      background: url("../assets/image/intro_box_bg/img-text-check-intro-bg.jpg")
        no-repeat center;

      .intro-sub-title {
        font-size: 72px;
        line-height: 72px;
        color: $white;
        text-align: right;
        letter-spacing: 4px;
        margin-bottom: 32px;
      }

      .intro-sub-text {
        // width: 487px;
        font-size: 16px;
        color: $white;
        text-align: left;
        font-weight: 300;
        font-family: SourceHanSansCN-Light;
        margin-right: 4px;
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

      .demo-box-lef {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 840px;
        height: 100%;
        padding: 20px 36px;
        border: 1px solid #c7c7c7;

        .img-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 336px;

          .img-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            width: 365px;
            height: 100%;

            .img-title {
              font-size: 18px;
              font-weight: 700;
              color: #000;
            }

            img {
              width: 365px;
              height: 296px;
            }
          }

          .img-right {
            position: relative;
          }
        }

        .input-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 52px;
          margin: 12px 0;

          .now-upload {
            width: 160px;
          }

          .url-input {
            width: 443px;
            height: 100%;
            border: 1px solid #c7c7c7;
            font-size: 20px;
            color: #8f8f8f;
            text-indent: 22px;
          }

          .url-input::placeholder {
            font-size: 18px;
            color: #8f8f8f;
          }

          .check-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 142px;
            height: 100%;
            background: $primary;
            cursor: pointer;

            span {
              font-size: 18px;
              color: $white;
            }
          }

          .text-or {
            font-size: 18px;
            color: #000;
            font-weight: 700;
            margin: 0 10px;
          }

          .ivu-upload {
            width: 142px;
            height: 52px;

            #submitBtn {
              width: 142px;
              height: 52px;
              border-radius: 0;
              background: $primary;
              border: none;
              font-size: 18px;
              color: $white;
            }
          }
        }

        .img-list-box {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          width: 100%;

          img {
            width: 186px;
            height: 112px;
            margin-bottom: 20px;
            cursor: pointer;
          }
        }
      }

      .demo-box-right {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex: 1;
        height: 100%;
        margin-left: 6px;
        border: 1px solid #c7c7c7;

        .box-right-title {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160px;
          height: 58px;
          background: #dad9d9;
          border-right: 1px solid #c0c0c0;

          span {
            font-size: 24px;
            color: #787878;
            font-weight: 400;
          }
        }

        .check-result-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          flex: 1;
          height: 164px;
          margin: 26px 14px;

          .res-info {
            width: 324px;
            flex: 1;
            text-align: left;
            font-size: 16px;
            color: #000;
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
