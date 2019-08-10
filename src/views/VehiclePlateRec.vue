<template>
  <div class="vehicle-rec">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="vehicle-intro">
        <div class="vehicle-plate">
          <img
            src="../assets/image/chepai.png"
            class="chepai-img"
          />
        </div>
        <img
          src="../assets/image/arrow.png"
          class="arrow-img"
        />
        <h1 class="chepai-name">豫H 81888</h1>
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
          <h5
            v-else
            class="result-txt"
          >{{theRecResult}}</h5>
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
        <!-- <Input
          v-model="imgUrl"
          size="large"
          placeholder="请输入图片的URL"
          style="width: 380px"
        />
        <Button
          class="test-btn"
          size="large"
          type="primary"
          @click="handleCheckBtn"
          :loading="loading"
        >
          <span v-if="!loading">检测</span>
          <span v-else>识别中</span>
        </Button> -->
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
import { vehiclePlateHeaderInfo } from "utils/headerData.js";
import { Ws, upLoadImg, filePathPreFix } from "utils/api.js";
import { getObjectURL, imgTypeCheck } from "utils/utils.js"
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      isChecking: false,  //是否检测中
      defaultCarNumImg: "http://192.168.1.239:5200/plate_reco/6ead1cb0-7dcc-11e9-b19c-cbee0a9c8f51.jpg",
      headerInfo: vehiclePlateHeaderInfo,
      imgList: [
        {
          url: "http://192.168.1.239:5200/plate_reco/6ead1cb0-7dcc-11e9-b19c-cbee0a9c8f51.jpg",
          disk_path: filePathPreFix + "recognition/common/files/plate_reco/6ead1cb0-7dcc-11e9-b19c-cbee0a9c8f51.jpg"
        },
        {
          url: "http://192.168.1.239:5200/plate_reco/1558678038.jpg",
          disk_path: filePathPreFix + "recognition/common/files/plate_reco/1558678038.jpg"
        },
        {
          url: "http://192.168.1.239:5200/plate_reco/7be2b510-7dd2-11e9-ae4a-1d07fb7a5a00.jpg",
          disk_path: filePathPreFix + "recognition/common/files/plate_reco/7be2b510-7dd2-11e9-ae4a-1d07fb7a5a00.jpg"
        },
        {
          url: "http://192.168.1.239:5200/plate_reco/1558678032.jpg",
          disk_path: filePathPreFix + "recognition/common/files/plate_reco/1558678032.jpg"
        }
      ],
      imgUrl: "",
      activeImg: 0,
      /* eslint-disable */
      useData: [
        {
          title: "停车场闸机识别",
          desc: "在停车场的闸机上使用车牌识别，自动识别车牌号码实现无卡，无人的停车管理，方便快捷。"
        },
        {
          title: "道路违章检测",
          desc: "在交通道路上的摄像头中加入车牌识别结合违章判断，对违章的车辆号码进行自动识别，实现自动化的违章审计。"
        }
      ],
      theFile: null,
      theRecResult: "京N2B945",
      ws: null,
      ws1: null
    };
  },
  mounted() {
    //初始化ws对象
    this.ws = new Ws({ cb: this.onmessage });
    this.ws.init();
  },
  methods: {
    onmessage(data) {
      console.log(data)
      this.theRecResult = data.name == "no plate" ? "未识别出车牌" : data.name;
      this.isChecking = false;
    },
    // 本地上传按钮被点击了
    uploadFile() {
      this.$refs.imageFile.click()
    },
    // 文件改变
    fileChange() {
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
        this.handleCheckBtn()  //上传后进行识别
      } else {
        this.$Message.error("只能上传图片文件");
      }

    },
    //检测按钮点击处理
    async handleCheckBtn() {
      let formdata = new FormData();
      formdata.append("photos", this.theFile);
      //上传图片到图片服务器 获取上传后图片地址
      let uploadRes = await upLoadImg(formdata);
      console.log("uploadRes:", uploadRes);
      if (uploadRes.data.ret == 1) {
        this.goCheck(uploadRes.data.info.disk_path)
      } else {
        this.$Message.error("服务器或网络出错，请稍后再试...");
      }
    },
    //发送照片开始检测
    goCheck(filePath) {
      console.log("gocheck", filePath)
      let param = {
        query: {
          cmd: 13,
          name: "",
          disk_path: filePath
        }
      }
      console.log("车牌识别发送参数>>>", param)

      if (this.ws.socket.readyState == 3) {
        this.$Message.error("webSocket服务连接失败,请稍后再试...");
        this.isChecking = false;
      } else {
        this.ws.send(param)
      }
    },
    // 示例图片被点击
    changeImg(index) {
      //判断是否检测中
      if (this.isChecking) {
        return
      }
      this.isChecking = true;
      this.goCheck(this.imgList[index].disk_path)  //切换图片进行识别
      this.activeImg = index;
      this.defaultCarNumImg = this.imgList[index].url; //设置初始显示照片
      this.theRecResult = "";
    }
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();  //关闭ws
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
    .vehicle-intro {
      margin: 0 auto;
      width: 1200px;
      height: 320px;
      border: 1px solid #eeeeee;
      background-color: $introBgColor;
      @include flexJA(center, center);
      .vehicle-plate {
        width: 456px;
        height: 202px;
        background: url("../assets/image/rec-kuang.png") no-repeat 100% 100%;
        @include flexJA(center, center);
        .chepai-img {
          width: 396px;
          height: 141px;
        }
      }
      .arrow-img {
        width: 56px;
        height: 32px;
        margin: 0 100px 0 60px;
      }
      .chepai-name {
        font-size: 56px;
        font-weight: 400;
        color: $primaryTitle;
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
        height: 280px;
        border: 1px solid #eeeeee;
        img {
          width: 100%;
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
        .result-txt {
          background-color: $introBgColor;
          border: 1px solid #eeeeee;
          border-radius: 20px;
          font-size: 60px;
          font-weight: 400;
          color: $primaryTitle;
          padding: 42px 82px;
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
