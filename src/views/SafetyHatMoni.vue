<template>
  <div class="safety-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="safety-intro">
        <div class="safety-txt">
          <h5 class="safety-title">安全帽监测</h5>
          <p class="safety-desc">在施工场景下，监测人员是否按照要求佩戴安全帽，并做安全预警</p>
        </div>
      </div>
    </div>
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="demo-comtainer">
        <!-- 识别后的图片文件 -->
        <div class="rec-img">
          <Spin
            fix
            v-if="isChecking"
          ></Spin>
          <img
            v-show="isImg"
            :src="resImgUrl"
            alt="tupian"
          >
          <div
            v-show="!isImg"
            class="video-box"
            id="myPlayer"
          ></div>
        </div>
        <!-- 操作按钮 -->
        <div class="oprate-btn">
          <!-- eslint-disable -->
          <!-- <Input
            v-model="imgUrl"
            size="large"
            placeholder="请输入图片的URL"
            style="width: 621px"
          />
          <Button
            class="test-btn"
            size="large"
            type="primary"
          >检测</Button>
          <span class="or-txt">或</span> -->
          <Button
            class="now-upload"
            size="large"
            type="primary"
            @click="uploadFile"
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
            图片或视频格式
          </p>
        </div>
        <!-- 实例图片盒子 -->
        <div class="example-box">
          <img
            v-for="(item, index) of imgList"
            :key="index"
            :src="item"
            alt="原始图片"
          />
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
import { safetyHatMoniHeaderInfo } from "utils/headerData.js";
import { helmetUploadFileType, getObjectURL, videoShot } from "utils/utils.js";
import { helmetUpload, helmetCheck, helmetShow } from "utils/api.js"
import Player from 'xgplayer';
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: safetyHatMoniHeaderInfo,
      isImg: true,
      resImgUrl: require("../assets/image/safe_hat/hat1.png"),
      currentFileType: "", //当前成功上传的文件类型
      isChecking: false,   //是否检测中
      file_name: "",       //上传成功后返回的文件名
      imgShowPrefix: "http://192.168.111.209:5070/static/helmet_image/", //要显示的图片列表路径修正
      videoPrefix: "http://192.168.111.209:5070/static/helmet_video_output/", //检测结果 视频文件路径修正
      imgPrefix: "http://192.168.111.209:5070/static/helmet_image_output/",  //检测结果 图片文件路径修正
      imgList: [
      ],
      config: {
        id: 'myPlayer',
        url: '',
        poster: '',
        // videoInit: true,
        enterLogo: { // video loading page logo
          url: require('../assets/image/logo.png'),
          width: 37,
          height: 10
        },
        enterBg: { // video loading page background
          color: 'rgba(0,0,0,0.87)'
        },
        enterTips: { // video loading page effects
          background: 'linear-gradient(to right, rgba(0,0,0,0.87), #3D96FD, rgba(86,195,248), #3D96FD, rgba(0,0,0,0.87))'
        },
        autoplay: true,
        autoplayMuted: true
      },
      player: null,
      uploadedFiles: [], //用户上传的图片
      imgUrl: "",//图片路劲
      useData: [
        {
          title: "联动门禁模式",
          desc: "在企业高危区域大门部署安全帽识别系统结合门禁系统，当工作人员要进如防护区域进行工作时，门禁刷卡后，需检测是否佩戴安全帽，若未佩戴安全帽则无法开启门禁。工作人员必须佩戴安全帽才能打开门禁进入防护区工作，安全帽识别系统形成统计报表统计每天进出生产区域的人员流动情况。"
        },
        {
          title: "动态监测模式",
          desc: "在安全生产区域内部署安全帽识别系统，通过对摄像机画面内是否有人员活动实时监测，当检测到有人时，识别检测在岗人员是否佩戴安全帽，若未佩戴安全帽则输出报警信息，通知后台监控人员。"
        }
      ]
    };
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile() {
      if (this.isChecking) { return; };
      this.$refs.imageFile.click()
    },
    // 文件改变
    fileChange() {
      console.log(this.$refs.imageFile.files)
      let type = helmetUploadFileType(this.$refs.imageFile.files[0])
      if (type == "文件类型不正确") {
        this.$Message.error("请上传png、jpg、mp4等类型文件");
      } else {
        // if (this.uploadedFiles.length >= 6) {
        //   //维持上传的照片为最近上传的6张
        //   this.uploadedFiles.shift();
        //   this.imgList.shift();
        // }
        // let url = getObjectURL(this.$refs.imageFile.files[0]);
        // //如果是MP4 获取视频第一帧后 存入imgList用于显示
        // if (type == "mp4") {
        //   videoShot(url).then(res => {
        //     this.imgList.push(res)
        //   })
        // } else {
        //   //如果是jpg png 直接存入imgList用于显示
        //   this.imgList.push(url)
        // }
        // this.uploadedFiles.push(this.$refs.imageFile.files[0])
        let formData = new FormData()
        formData.append("file", this.$refs.imageFile.files[0]);
        this.uploadHelmetFile(type, formData);  //上传文件
      }
    },
    //上传文件处理方法
    async uploadHelmetFile(type, data) {
      //此处开始执行识别请求
      try {
        let res = await helmetUpload(type, data);
        console.log("res>>>", res)
        if (res.data.ret == 1) {
          this.$Message.info("上传成功，开始监测！");
          //如果上次上传的是视频文件 隐藏视频并重置图片为初始图片
          this.isImg = true;
          if (this.currentFileType == "mp4") {
            this.resImgUrl = require("../assets/image/safe_hat/hat1.png")
          }
          //开始检测
          // this.isCheckReady = true;   //上传成功 可开始检测
          this.currentFileType = type;  //设置当前可检测文件类型
          this.file_name = res.data.info.file_name;
          this.isChecking = true;
          let showRes = await helmetShow();//获取上传成功的图片 用于显示
          // console.log("showRes>>>", showRes)
          if (showRes.data.ret == 1) {
            //获取要显示图片列表
            this.imgList = [];
            showRes.data.info.upload_files.forEach(v => {
              this.imgList.push(this.imgShowPrefix + v)
            });
          }
          let checkRes = await helmetCheck(this.currentFileType, this.file_name)
          console.log("checkRes>>>", checkRes);
          if (checkRes.data.ret == 1) {
            this.resImgUrl = this.imgPrefix + checkRes.data.info.output + "." + type;  //设置识别后要显示的图片地址
            console.log("this.resImgUrl>>>", this.resImgUrl);
            //如果检测的文件为视频文件 设置视频播放地址
            if (type == "mp4") {
              this.isImg = false;
              this.resImgUrl = this.videoPrefix + checkRes.data.info.output + "." + type;
              console.log("this.resImgUrl>>>", this.resImgUrl);
              this.initVideo(this.resImgUrl)
            } else {
              this.isImg = true;
            }
          } else {
            this.$Message.error("网络或服务器出错，请稍后再试...")
          }
          this.isChecking = false;
        }
      } catch (error) {
        console.log(error);
        this.isChecking = false;
        this.$Message.error("网络或服务器出错，请稍后再试...")
      }
    },
    //初始化视频播放器
    initVideo(url) {
      if (this.player) {
        this.player.start(url);
      } else {
        setTimeout(() => {
          // this.player = null;
          this.config.url = url;
          this.player = new Player(this.config)
        }, 0);
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.safety-storage {
  .intro-title {
    @include introTitle();
  }
  // 产品介绍相关
  .intro-box {
    .safety-intro {
      margin: 0 auto;
      width: 1200px;
      height: 466px;
      border: 1px solid #eeeeee;
      background: url("../assets/image/intro_box_bg/safety-hat-bg.jpg")
        no-repeat;
      background-size: 100% 100%;
      @include flexJA(flex-end, center);
      .safety-txt {
        margin-right: 35px;
        .safety-title {
          font-size: 72px;
          font-weight: bold;
          color: #ffffff;
          text-align: right;
        }
        .safety-desc {
          width: 477px;
          font-size: 16px;
          font-weight: 300;
          color: #ffffff;
          margin-top: 22px;
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
    .demo-comtainer {
      margin: 0 auto;
      width: 1200px;
      background: #ffffff;
      border: 1px solid #eeeeee;
    }
    .rec-img {
      position: relative;
      margin: 26px auto;
      width: 713px;
      height: 460px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 实例图片盒子
    .example-box {
      margin: 10px auto;
      width: 1200px;
      padding: 25px 45px;
      @include flexJA(flex-start, center);
      flex-wrap: wrap;
      img {
        width: 170px;
        height: 110px;
        margin: 6px;
      }
    }
    .oprate-btn {
      width: 1200px;
      @include flexJA(center, center);
      .now-upload {
        width: 160px;
      }
      .or-txt {
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
        color: #333333;
      }
      .test-btn {
        width: 120px;
      }
      .oprate-tip {
        height: 33px;
        font-size: 14px;
        font-weight: 400;
        color: #b5b5b5;
        line-height: 18px;
        text-align: left;
        margin-top: 10px;
        margin-left: 12px;
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
<style>
.xgplayer {
  width: 713px !important;
  height: 460px !important;
}
</style>
