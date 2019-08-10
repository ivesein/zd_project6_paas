<template>
  <div class="face-detect">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-intro">
        <p class="face-title">给定一张照片，与指定人脸库中的N个人脸进行比对，
          找出最相似的一张脸或多张人脸。 根据待识别人脸与现有人脸库中的人脸匹配程度，
          返回用户信息和匹配度</p>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <img
            :src="defaultCarNumImg"
            alt="原始图片"
          />
          <span class="origin-pic-title">原始图片</span>
        </div>
        <!-- 识别结果盒子 -->
        <div class="result-box">
          <Spin
            fix
            v-if="isChecking"
          ></Spin>
          <ul
            class="result-ul-box"
            v-if="recYes"
          >
            <li
              class="similar-box"
              v-for="(item, index) of similarList"
              :key="index"
            >
              <img
                :src="item.imgurl"
                class="similar-img"
                alt="原始图片"
              />
              <!-- <span class="similar-txt">相似度：{{ item.similarModel }}%</span> -->
              <span class="similar-txt">{{ recName }}</span>
            </li>
          </ul>
          <span
            class="similar-recres-text"
            v-else
          >{{recRes}}</span>
          <span class="origin-pic-title">识别结果</span>
        </div>
      </div>
      <!-- 实例图片盒子 -->
      <div class="example-box">
        <div
          class="example-img"
          v-for="(item, index) of imgList"
          :key="index"
          :class="{'example-img-active':activeImg===index}"
          @click="changeImg(index)"
        >
          <img
            :src="item.url"
            alt="原始图片"
          />
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="oprate-btn">
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
          accept="image/bmp, image/jpeg, image/png, image/jpg"
        >
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
import { faceSearchHeaderInfo } from "utils/headerData.js";
import { Ws, upLoadFaceImg, filePathPreFix } from "utils/api.js";
import { getObjectURL, imgTypeCheck } from "utils/utils.js"

export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: faceSearchHeaderInfo,
      recYes: false,
      isChecking: false,
      theFile: null,
      defaultCarNumImg: require("../assets/image/avatar/tuqinyao.png"),
      recRes: "请点击下列图片进行识别或手动上传图片识别",
      recName: "",
      similarList: [
        {
          imgurl: "",
          similarModel: '0'
        }
      ],
      imgList: [
        {
          url: require("../assets/image/avatar/tuqinyao.png"),
          path: filePathPreFix + "recognition/common/files/face_reco/0b5e6d70-81f1-11e9-b1b2-cd6d3e54be78.png"
        },
        {
          url: require("../assets/image/avatar/mashao.png"),
          path: filePathPreFix + "recognition/common/files/face_reco/4a178e70-81f1-11e9-b1b2-cd6d3e54be78.png"
        },
        {
          url: require("../assets/image/avatar/xueruomei.png"),
          path: filePathPreFix + "recognition/common/files/face_reco/2.jpg"
        },
        {
          url: require("../assets/image/avatar/qianbo.jpg"),
          path: filePathPreFix + "recognition/common/files/face_reco/d2a51bb0-81f4-11e9-a88f-89a5b7056ee1.jpg"
        },
        // {
        //   url: require("../assets/image/face-rec/face5.jpg"),
        //   path: "F:/git_clone/ns_light2/recognition/common/files/face_reco/11865e40-7dfc-11e9-abb6-ed6f71fad3b8.jpg"
        // },
        // {
        //   url: require("../assets/image/face-rec/face6.jpg"),
        //   path: "F:/git_clone/ns_light2/recognition/common/files/face_reco/4bb9ad30-7df5-11e9-95b4-6b9db73c66d1.jpg"
        // }
      ],
      imgUrl: "",
      activeImg: 0,
      /* eslint-disable */
      useData: [
        {
          title: "门禁闸机",
          desc: "通过人脸识别，快速为用户录入人脸信息，用户需要通行时，只需简单地进行人脸验证，即可完成身份信息确认。实现企业、商业、住宅等多种场景的刷脸进门，提升安全性、效率和用户体验"
        },
        {
          title: "签到考勤",
          desc: "与会人员、公司员工或学员等预先录入人脸，在需要验证身份时，实现刷脸签到、考勤打卡、学员登记等操作，提升业务处理效率及用户体验"
        },
        {
          title: "安防监控",
          desc: "在银行、机场、商场、市场等人流密集的公共场所对人群进行监控，实现人流自动统计、特定人物的自动识别和追踪"
        }
      ],
      ws: null
    };
  },
  mounted() {
    //初始化ws对象
    this.ws = new Ws({ cb: this.message });
    this.ws.init();
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close()
    }
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile() {
      this.$refs.imageFile.click()
    },
    // 文件改变
    fileChange() {
      console.log(this.$refs.imageFile.files)
      // 判断是否检测中
      if (this.isChecking) {
        return
      }
      //判断上传文件按是否为图片
      if (imgTypeCheck(this.$refs.imageFile.files[0])) {
        this.isChecking = true;
        this.theFile = this.$refs.imageFile.files[0];
        this.defaultCarNumImg = getObjectURL(this.theFile); //后去上传照片文件的图片预览地址
        this.theRecResult = "车牌待识别";
        this.defaultImgSelected = false;
        this.handleCheckBtn()  //上传后进行识别
      } else {
        this.$Message.error("只能上传图片文件");
      }
    },
    // 示例图片被点击
    changeImg(index) {
      //判断是否检测中
      if (this.isChecking) {
        return
      }
      this.activeImg = index;
      this.isChecking = true;
      this.goCheck(this.imgList[index].path)  //切换图片进行识别
      this.defaultCarNumImg = this.imgList[index].url;
    },
    //检测按钮点击处理
    async handleCheckBtn() {
      let formdata = new FormData();
      formdata.append("photos", this.theFile);
      //上传图片到图片服务器 获取上传后图片地址
      let uploadRes = await upLoadFaceImg(formdata);
      console.log("uploadRes:", uploadRes);
      if (uploadRes.data.ret == 1) {
        this.goCheck(uploadRes.data.info.disk_path)
      } else {
        this.$Message.error("服务器或网络出错，请稍后再试...");
      }
    },
    //发送照片开始检测
    goCheck(filePath) {
      console.log("gocheck")
      let param = {
        query: {
          cmd: 4,
          name: "",
          disk_path: filePath
        }
      }
      console.log("param>>>", param)
      console.log(this.ws.socket.readyState == 3)
      if (this.ws.socket.readyState == 3) {
        this.$Message.error("webSocket服务连接失败,请稍后再试...");
        this.isChecking = false;
      } else {
        this.ws.send(param)
      }
    },
    message(data) {
      console.log(data)
      if (data.name == "") {
        this.recYes = false;
        this.recRes = "未能识别出图片中人物"
      } else if (data.name == "no face") {
        this.recYes = false;
        this.recRes = "没有识别到人脸"
      } else {
        this.recYes = true;
        this.similarList[0].imgurl = data.path[0];
        this.recName = data.name;
      }
      // this.theRecResult = data.name == "no plate" ? "未识别出车牌" : data.name;
      this.isChecking = false;
    },
    error(err) {
      this.isChecking = false;
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
      background: url("../assets/image/intro_box_bg/face-search-bg.jpg") 100%
        100% no-repeat;
      .face-title {
        float: right;
        width: 365px;
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        line-height: 24px;
        margin-top: 193px;
        margin-right: 24px;
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
        background-color: #ffffff;
        height: 280px;
        border: 1px solid #eeeeee;
        img {
          width: 80%;
          height: 100%;
          object-fit: contain;
          object-position: center;
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
        height: 280px;
        background: #fff;
        border: 1px solid #eee;
        margin-left: 20px;
        @include flexJA(center, center);
        .result-ul-box {
          @include flexJA(center, center);
        }

        .similar-recres-text {
          font-size: 20px;
          color: $primaryTitle;
        }

        .similar-box {
          width: 176px;
          height: 200px;
          background-color: $introBgColor;
          margin: 0 6px;
          .similar-img {
            width: 176px;
            height: 160px;
          }
          .similar-txt {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
          }
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
          object-fit: cover;
          object-position: center;
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
