<template>
  <div class="face-detect">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-intro">
        <p class="face-title">通过提取人脸的特征，计算两张人脸的相似度，
          从而判断是否同一个人，并给出相似度评分。
          在已知用户ID的情况下帮助确认是否为用户本人的对比操作</p>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <img :src="originImg1" alt="原始图片" />
          <span class="origin-pic-title">对比图片1</span>
        </div>
        <!-- 识别结果盒子 -->
        <div class="result-box">
          <img :src="originImg2" alt="原始图片" />
          <span class="origin-pic-title">对比图片2</span>
        </div>
        <!-- 相似度 -->
        <div class="result-data" v-if="confidence!==null">
          <span v-if="confidence.code===1">相似度 {{confidence.confidence}}</span>
          <!-- <span v-if="confidence.code===1&&confidence.info===1">是同一个人</span> -->
          <span v-if="confidence.code===2&&confidence.info===-1">不是同一个人</span>
          <!-- <span v-if="confidence.status===-1">{{confidence.confidence}}</span> -->
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
      <!-- 实例图片盒子 -->
      <div class="example-box">
        <div class="example-img" v-for="(item, index) of imgList" :key="index" :class="{'example-img-active':activeImg===index}" @click="changeImg(index,item)">
          <img :src="item.url" alt="原始图片" />
          <img :src="item.url1" alt="原始图片" />
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="oprate-box">
        <div class="oprate-btn">
          <Button class="now-upload" size="large" type="primary" @click="uploadFile1">本地上传</Button>
          <input v-show="false" type="file" @change="fileChange1" ref="imageFile1" name="image" accept="image/bmp, image/jpeg, image/png, image/jpg">
          <!-- <span class="or-txt">或</span> -->
          <!-- eslint-disable -->
          <!-- <Input v-model="imgUrl" size="large" placeholder="请输入图片的URL" style="width: 270px" />
          <Button class="test-btn" size="large" type="primary">检测</Button> -->
          <p class="oprate-tip">
            提示：可支持PNG、JPG、JPEG、BMP，请保证需要识别的部分为图片主体部分
          </p>
        </div>
        <div class="oprate-btn">
          <Button class="now-upload" size="large" type="primary" @click="uploadFile2">本地上传</Button>
          <input v-show="false" type="file" @change="fileChange2" ref="imageFile2" name="image" accept="image/bmp, image/jpeg, image/png, image/jpg">
          <!-- <span class="or-txt">或</span> -->
          <!-- eslint-disable -->
          <!-- <Input v-model="imgUrl" size="large" placeholder="请输入图片的URL" style="width: 270px" />
          <Button class="test-btn" size="large" type="primary">检测</Button> -->
          <p class="oprate-tip">
            提示：可支持PNG、JPG、JPEG、BMP，请保证需要识别的部分为图片主体部分
          </p>
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
/* eslint-disable */
import Footer from "../components/home/Footer";
import CommonHeader from "components/common/CommonHeader";
import { FaceCompareHeaderInfo } from "utils/headerData.js";
import { upLoadFaceImg, faceCompare } from "utils/api.js";
import { imgTypeCheck, getObjectURL } from "utils/utils.js"
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: FaceCompareHeaderInfo,
      imgList: [
        {
          url: "http://192.168.1.239:5200/face_reco/1565069622.jpg",
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069622.jpg",
          url1: "http://192.168.1.239:5200/face_reco/1565069861.jpg",
          path1: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069861.jpg",
        },
        {
          url: "http://192.168.1.239:5200/face_reco/1565069611.jpg",
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069611.jpg",
          url1: "http://192.168.1.239:5200/face_reco/1565069616.jpg",
          path1: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069616.jpg",
        },
        {
          url: "http://192.168.1.239:5200/face_reco/1565067755.jpg",
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565067755.jpg",
          url1: "http://192.168.1.239:5200/face_reco/1565069641.jpg",
          path1: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069641.jpg",
        },
        {
          url: "http://192.168.1.239:5200/face_reco/1565069583.jpg",
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069583.jpg",
          url1: "http://192.168.1.239:5200/face_reco/1565069597.jpg",
          path1: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069597.jpg",
        },
        {
          url: "http://192.168.1.239:5200/face_reco/1565069527.jpg",
          path: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069527.jpg",
          url1: "http://192.168.1.239:5200/face_reco/1565069583.jpg",
          path1: "F:/code_clone/ns_light2/recognition/common/files/face_reco/1565069583.jpg",
        }
      ],
      originImg1:"", //图片1
      originImg2:"", //图片2
      originPath1:"", //图片1
      originPath2:"", //图片2
      imgUrl: "",
      activeImg:0,
      spinShow:false,//是否显示加载中
      isChecking: false,  //是否检测中
      confidence:null,//相似度
      /* eslint-disable */
      useData: [
        {
          title: "金融远程开户",
          desc: "通过自拍照与身份证照或公安系统照片之间的人脸对比，核实用户身份是否属实，优化金融等高风险行业复杂的身份验证流程"
        },
        {
          title: "服务人员身份监管",
          desc: "对于用户身份真实性要求较高的服务领域（如家政、货运等），通过人证对比，确保服务人员的身份真实性，提高业务人员身份审核效率"
        },
        {
          title: "企业刷脸考勤",
          desc: "用人脸识别替代指纹识别、刷工卡的方式进行考勤，实现多人同时考勤，提高防作弊能力的同时提升考勤效率"
        },
        {
          title: "酒店自助入住",
          desc: "用户到店后主动出示身份证，通过人脸1：1的服务将用户现成拍摄的照片与身份证信息进行比对验证，实现自助入住"
        },
        {
          title: "民事政务自助办理",
          desc: "原本繁琐费时的窗口业务办理，转为线上自助办理（如制卡、社保核身），保证用户身份真实性的同事，大大缩短业务处理时间"
        }
      ]
    };
  },
  mounted(){
    this.originImg1=this.imgList[0].url //图片1
    this.originImg2=this.imgList[0].url1 //图片2
    this.originPath1=this.imgList[0].path
    this.originPath2=this.imgList[0].path1
    this.spinShow=true
    this.isChecking = true;
    this.goCheck(this.originPath1,this.originPath2)
  },
  methods: {
    // 本地上传按钮被点击了
    uploadFile1(){
      this.$refs.imageFile1.click()
    },
    // 本地上传按钮被点击了
    uploadFile2(){
      this.$refs.imageFile2.click()
    },
    // 文件改变
    async fileChange1(){
      // 判断是否检测中
      if (this.isChecking) {
        return
      }
      //判断上传文件按是否为图片
      if (imgTypeCheck(this.$refs.imageFile1.files[0])) {
        let formdata = new FormData();
        formdata.append("photos", this.$refs.imageFile1.files[0]);
        this.originImg1 = getObjectURL(this.$refs.imageFile1.files[0]); //后去上传照片文件的图片预览地址
        let uploadRes = await upLoadFaceImg(formdata);
        if (uploadRes.data.ret == 1) {
          this.originPath1=uploadRes.data.info.disk_path
          this.spinShow=true
          this.goCheck(uploadRes.data.info.disk_path,this.originPath2)
        } else {
          this.$Message.error("服务器或网络出错，请稍后再试...");
        }
      } else {
        this.$Message.error("只能上传图片文件");
      }
    },
    // 文件改变
    async fileChange2(){
      // 判断是否检测中
      if (this.isChecking) {
        return
      }
      //判断上传文件按是否为图片
      if (imgTypeCheck(this.$refs.imageFile2.files[0])) {
        let formdata = new FormData();
        formdata.append("photos", this.$refs.imageFile2.files[0]);
        this.originImg2 = getObjectURL(this.$refs.imageFile2.files[0]); //后去上传照片文件的图片预览地址
        let uploadRes = await upLoadFaceImg(formdata);
        if (uploadRes.data.ret == 1) {
          this.originPath2=uploadRes.data.info.disk_path
          this.spinShow=true
          this.goCheck(this.originPath1,uploadRes.data.info.disk_path)
        } else {
          this.$Message.error("服务器或网络出错，请稍后再试...");
        }
      } else {
        this.$Message.error("只能上传图片文件");
      }
    },
    //发送照片开始检测
    async goCheck(path1,path2) {
      console.log(path1,path2)
      let param={
        data:{
          first_disk_path:path1,
          second_disk_path:path2
        }
      }
      let showRes = await faceCompare(param);
      console.log("resShow>>>", showRes.data.info);
      this.spinShow=false
      this.confidence = showRes.data.info;
      this.isChecking = false;
    },
    // 示例图片被点击
    changeImg(index,item){
      //判断是否检测中
      if (this.isChecking) {
        return
      }
      this.isChecking=true
      this.activeImg=index
      this.spinShow=true
      this.originImg1=item.url //图片1
      this.originImg2=item.url1 //图片2
      this.goCheck(this.imgList[index].path,this.imgList[index].path1)
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
      background: url("../assets/image/intro_box_bg/face-compare-bg.jpg") 100% 100% no-repeat;
      @include flexJA(center, flex-end);
      .face-title {
        width: 447px;
        font-size: 16px;
        font-weight: 300;
        color:#fff;
        line-height: 24px;
        text-align: left;
        margin-bottom: 33px;
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
      position: relative;
      @include flexJA(center, center);
      .origin-pic-box {
        position: relative;
        width: 592px;
        background-color: #ffffff;
        height: 280px;
        border: 1px solid #eeeeee;
        img {
          width: 391px;
          height: 279px;
        }
      }
      .origin-pic-title {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        padding: 10px 18px;
        font-size: 14px;
        width: 102px;
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
        img {
          width: 391px;
          height: 279px;
        }
      }
      .result-data{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: url('../assets/image/compare.png') no-repeat 100% 100%;
        width: 152px;
        height: 120px;
        @include flexJA(center, center);
        span{
          font-size: 18px;
          color: #fff;
          font-weight: bold;
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
        width: 230px;
        height: 110px;
        background: #f7f9ff;
        border: 2px solid transparent;
        margin: 0 6px;
        cursor: pointer;
        img {
          width: 50%;
          height: 100%;
        }
      }
      .example-img-active {
        border: 2px solid #3170f6;
      }
    }
    // 操作按钮
    .oprate-box{
      margin: 0 auto;
      width: 1200px;
      @include flexJA(space-between, center);
    }
    .oprate-btn {
      width: 592px;
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
        margin-top: 10px;
        margin-left: 12px;
      }
    }
    //应用场景
    .use-content-title {
      margin-top: 17px;
    }
    .use-content {
      width: 1218px;
      margin: 0 auto;
      @include flexJA(flex-start, center);
      flex-wrap: wrap;
      .use-box {
        margin: 0 10px 15px;
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
