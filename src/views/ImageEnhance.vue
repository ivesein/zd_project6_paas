<template>
  <div class="video-storage">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="video-intro">
        <div class="video-txt">
          <h5 class="video-title">图像增强</h5>
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
        <div class="image-content">
          <div class="origin-pic-box">
            <img :src="defaultImg" alt="原始图片">
          </div>
          <div class="origin-pic-box">
            <img v-if="resultImg!==''" :src="resultImg" alt="增强图片">
            <Spin size="large" fix v-if="spinShow"></Spin>
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="oprate-btn">
          <Button class="now-upload" size="large" type="primary" @click="uploadFile">本地上传</Button>
          <input v-show="false" type="file" @change="fileChange" ref="imageFile" name="image" accept="image/bmp, image/jpeg, image/png, image/jpg">
          <!-- <span class="or-txt">或</span> -->
          <!-- eslint-disable -->
          <!-- <Input v-model="imgUrl" size="large" placeholder="请输入图片的URL" style="width: 380px" /> -->
          <!-- <Button class="test-btn" size="large" type="primary">检测</Button> -->
          <p class="oprate-tip">
            提示：可支持PNG、JPG、JPEG、BMP，请保证需要识别的部分为图片主体部分
          </p>
        </div>
        <!-- 实例图片盒子 -->
        <div class="example-box">
          <div class="example-img" v-for="(item, index) of imgList" :key="index" :class="{'example-img-active':activeImg===index}" @click="changeImg(index)">
            <img :src="item.url" alt="原始图片" />
          </div>
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
import { ImageEnhanceHeaderInfo } from "utils/headerData.js";
import { upLoadEnhaceImg } from "utils/api.js";
import  createWebsocket from "utils/websocket.js";
import { imgTypeCheck, getObjectURL } from "utils/utils.js"
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: ImageEnhanceHeaderInfo,
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
      ],
      defaultImg:require("../assets/image/img/1.jpg"),//默认识别的图片
      resultImg:require("../assets/image/img/1.jpg"),
      imgUrl: "",
      activeImg:0,
      spinShow:false,//是否显示加载中
      isChecking: false,  //是否检测中
      imgList: [
        {
          url: require("../assets/image/img/1.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/image/1.jpg"
        },
        {
          url: require("../assets/image/img/2.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/image/2.jpg"
        },
        {
          url: require("../assets/image/img/3.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/image/3.jpg"
        },
        {
          url: require("../assets/image/img/5.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/image/5.jpg"
        },
        {
          url: require("../assets/image/img/1108357-20181012170404154-1532828303.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/image/1108357-20181012170404154-1532828303.jpg"
        }
      ],
    };
  },
  mounted(){
    this.spinShow=true
    this.isChecking = true;
    createWebsocket.websocket=null
    createWebsocket.create()
    var that=this
    // 连接成功建立的回调方法
    createWebsocket.websocket.onopen = (event) => {
      console.log('成功建立连接！')
      that.goCheck(that.imgList[0].path)
    }
    // 接收到消息的回调方法
    createWebsocket.websocket.onmessage = function (event) {
      let record = JSON.parse(event.data);
      console.log(record)
      that.spinShow=false
      that.resultImg = record.path[0];
      that.isChecking = false;
    }
  },
  beforeDestroy(){
    createWebsocket.closeWebSocket()
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile(){
      this.$refs.imageFile.click()
    },
    // 文件改变
    async fileChange(){
      // 判断是否检测中
      if (this.isChecking) {
        return
      }
      //判断上传文件按是否为图片
      if (imgTypeCheck(this.$refs.imageFile.files[0])) {
        this.spinShow=true
        let formdata = new FormData();
        formdata.append("photos", this.$refs.imageFile.files[0]);
        this.defaultImg = getObjectURL(this.$refs.imageFile.files[0]); //后去上传照片文件的图片预览地址
        this.resultImg = ''
        let uploadRes = await upLoadEnhaceImg(formdata);
        if (uploadRes.data.ret == 1) {
            this.goCheck(uploadRes.data.info.disk_path)
        } else {
          this.$Message.error("服务器或网络出错，请稍后再试...");
        }
      } else {
        this.$Message.error("只能上传图片文件");
      }
    },
    //发送照片开始检测
    async goCheck(filePath) {
      let param = {
        query: {
          cmd: 21,
          name: "",
          disk_path: filePath
        }
      }
      console.log(param)
      createWebsocket.send(JSON.stringify(param))
    },
    // 示例图片被点击
    changeImg(index){
      //判断是否检测中
      if (this.isChecking) {
        return
      }
      this.defaultImg = this.imgList[index].url
      this.resultImg = ''
      this.isChecking = true;
      this.activeImg=index
      this.spinShow=true
      this.goCheck(this.imgList[index].path)
    },
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
      background: url("../assets/image/intro_box_bg/image-enh-bg.jpg")
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
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      padding:30px;
      .image-content{
        @include flexJA(space-around, center);
        margin-bottom:30px;
      }
      .origin-pic-box {
        position: relative;
        width: 552px;
        height: 390px;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      // 操作按钮
      .oprate-btn {
        width: 1200px;
        margin: 0 auto;
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
          width: 460px;
          height: 33px;
          font-size: 14px;
          font-weight: 400;
          color: #b5b5b5;
          line-height: 18px;
          text-align: left;
          margin-left: 12px;
        }
      }
      // 实例图片盒子
      .example-box {
        margin: 30px auto 0;
        background: #ffffff;
        @include flexJA(center, center);
        .example-img {
          width: 206px;
          height: 146px;
          background: #f7f9ff;
          border: 2px solid transparent;
          margin: 0 6px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .example-img-active {
          border: 2px solid #3170f6;
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
