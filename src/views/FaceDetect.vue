<template>
  <div class="face-detect">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-intro">
        <p class="face-title">检测图中的人脸，并为人脸标记出边框。
          检测出人脸后，可对人脸进行分析，获得眼、口、鼻轮廓等150个关键点定位，
          准确识别多种人脸属性，如性别，年龄，表情等信息。该技术可适应大角度侧脸，遮挡，模糊，
          表情变化等各种实际环境</p>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <img :src="defaultFaceImg" alt="原始图片" />
          <span class="origin-pic-title">原始图片</span>
          <!-- <ul class="face-data-result">
            <li>性别：女</li>
            <li>年龄：19</li>
            <li>表情：微笑</li>
            <li>人种：黄种人</li>
          </ul> -->
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
      <!-- 实例图片盒子 -->
      <div class="example-box">
        <div class="example-img" v-for="(item, index) of imgList" :key="index" :class="{'example-img-active':activeImg===index}" @click="changeImg(index)">
          <img :src="item.url" alt="原始图片" />
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
/* eslint-disable */
import Footer from "../components/home/Footer";
import CommonHeader from "components/common/CommonHeader";
import { faceDetectHeaderInfo } from "utils/headerData.js";
import { upLoadFaceImg } from "utils/api.js";
import  createWebsocket from "utils/websocket.js";
import { imgTypeCheck } from "utils/utils.js"
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: faceDetectHeaderInfo,
      imgList: [
        {
          url: require("../assets/image/face-rec/face7.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/318800c0-8380-11e9-8333-13bbddb0c65a.jpg"
        },
        {
          url: require("../assets/image/face-rec/face8.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/41d0b440-8380-11e9-8333-13bbddb0c65a.jpg"
        },
        {
          url: require("../assets/image/face-rec/face10.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/494d8610-b807-11e9-8fbc-f1f4110e7b83.jpg"
        },
        {
          url: require("../assets/image/face-rec/face11.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/66613800-b807-11e9-8fbc-f1f4110e7b83.jpg"
        },
        {
          url: require("../assets/image/face-rec/face12.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/7b5e72e0-b807-11e9-8fbc-f1f4110e7b83.jpg"
        },
        {
          url: require("../assets/image/face-rec/face13.jpg"),
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/964c3790-b807-11e9-8fbc-f1f4110e7b83.jpg"
        }
      ],
      defaultFaceImg:require("../assets/image/face-rec/face1.jpg"),//默认识别的图片
      imgUrl: "",
      activeImg:0,
      spinShow:false,//是否显示加载中
      isChecking: false,  //是否检测中
      /* eslint-disable */
      useData: [
        {
          title: "智能相册分类",
          desc: "基于人脸识别，自动识别照片库中的人物角色，并进行分类管理，从而提升产品用户体验。"
        },
        {
          title: "人脸美颜",
          desc: "基于五官及轮廓关键点识别，对人脸特定位置进行修饰加工，实现人脸的特效美颜，特效相机、贴片等互动娱乐功能。"
        },
        {
          title: "人脸美颜",
          desc: "基于关键点、人脸属性值信息，匹配预先设定好的业务内容，可用于线上互动娱乐营销，如脸缘测试、名人换脸、颜值比拼等。"
        }
      ]
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
      console.log(record);
      that.spinShow=false
      that.defaultFaceImg = record.path[0];
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
        let uploadRes = await upLoadFaceImg(formdata);
        if (uploadRes.data.ret == 1) {
          console.log(uploadRes.data.info.disk_path)
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
          cmd: 3,
          name: "",
          disk_path: filePath
        }
      }
      createWebsocket.send(JSON.stringify(param))
    },
    // 示例图片被点击
    changeImg(index){
      //判断是否检测中
      if (this.isChecking) {
        return
      }
      this.isChecking = true;
      this.activeImg=index
      this.spinShow=true
      this.goCheck(this.imgList[index].path)
    },
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();  //关闭ws
    }
  }
};
</script>
<style lang="scss" scoped>
.face-detect {
  .intro-title {
    @include introTitle();
  }
  // 产品介绍相关
  .intro-box {
    .face-intro {
      margin: 0 auto;
      width: 1200px;
      height: 320px;
      border: 1px solid #eeeeee;
      background-color: $introBgColor;
      background: url("../assets/image/intro_box_bg/face-check-bg.jpg") 100% 100% no-repeat;
      .face-title {
        width: 272px;
        font-size: 16px;
        font-weight: 300;
        color:#fff;
        line-height: 24px;
        margin-top: 135px;
        margin-left: 41px;
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
        width: 1200px;
        background-color: #ffffff;
        height: 280px;
        @include flexJA(center, center);
        img {
          width: 500px;
          height: 278px;
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
      .face-data-result{
        position: absolute;
        top: 70px;
        left: 779px;
        text-align: left;
        li{
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 400;
          color:#ffffff;
          background-color: #facd89;
          width: 151px;
          border: 1px solid #ffffff;
        }
      }
    }
    // 实例图片盒子
    .example-box {
      margin: 10px auto;
      width: 1200px;
      height: 130px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      @include flexJA(center, center);
      .example-img {
        width: 176px;
        height: 110px;
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
    // 操作按钮
    .oprate-btn {
      width: 1200px;
      margin: 0 auto;
      @include flexJA(flex-start, center);
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
    //应用场景
    .use-content-title {
      margin-top: 17px;
    }
    .use-content {
      @include flexJA(center, center);
      .use-box {
        margin: 0 10px;
        .use-title {
          width: 386px;
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
          width: 386px;
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
