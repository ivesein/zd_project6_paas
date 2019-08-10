<template>
  <div class="face-detect">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-intro">
        <p class="face-title">为开发者提供业界优质且免费的语音服务，通过场景识别优化，
          为车载导航，智能家居和社交聊天等行业提供语音解决方案，准确率达到90%以上</p>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <div class="time-box">
              <!-- 语音图标 -->
              <span class="start-taste-line">
                <img v-show="!isAudioClick" class="yuyin-png" src="../assets/image/yuyin.png" alt="yuyin">
                <img v-show="isAudioClick"class="yuyin-gif" src="../assets/image/yuyin.gif" alt="yuyin">
              </span>
              <span class="total-time">
                <span class="used-time">{{voiceTime}}</span> / 01: 00
              </span>
          </div>
          <i-button class="rec-btn" v-show="!isAudioClick&&!isRecord" type="primary" size="large" @click="getAudio(isAudioClick)">开始识别</i-button>
          <i-button class="rec-btn"  v-show="isAudioClick&&!isRecord" type="primary" size="large" @click="getAudio(isAudioClick)">结束识别</i-button>
          <i-button class="rec-btn" v-show="isRecord" type="primary" size="large">识别中</i-button>
          <span class="origin-pic-title">原始图片</span>
        </div>
        <!-- 识别结果盒子 -->
        <div class="result-box">
          <p class="result-txt">
            {{voiceTxt}}
          </p>
          <span class="origin-pic-title">识别结果</span>
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
import { voiceRecHeaderInfo } from "utils/headerData.js";
import { voiceRec } from "utils/api.js";
import "../utils/recorder2";
/* eslint-disable */
var recorderr;
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: voiceRecHeaderInfo,
      /* eslint-disable */
      useData: [
        {
          title: "语音输入法",
          desc: "摆脱生僻字和拼音障碍，将所输入文字，直接用语音的方式输入，让输入法更加便捷"
        },
        {
          title: "语音搜索",
          desc: "搜索内容直接以语音的方式输入，让搜索更加高效"
        },
        {
          title: "事后电话质检",
          desc: "通过对已有通话音频文件进行识别，辅助人工进行快速质检智能质检，通过对坐席服务的监控及培训，提升坐席服务水平，进而提高客户满意度"
        },
        {
          title: "电话录音记录",
          desc: "对企业呼叫中心每日大量通话产生的音频文件进行识别后存储，可降低历史数据存储成本，全量保存历史通话文本资料，进而服务于用户画像、营销挖掘等业务"
        }
      ],
      isAudioClick: false, //开始识别是否被点击了
      isRecord:false, //识别中
      audioTimer: 60, //定时时间
      timerObj: null, //定时器对象
      voiceTxt: "", //语音识别后的文字
      audioLength: 0, //音频时间
      voiceTime:"0：00"
    };
  },
  mounted(){
    this.isBrowserSupport()
  },
  methods:{
    // 判断当前浏览器是否支持
    isBrowserSupport(){
      let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        this.$message.warning('当前浏览器不支持语音')
      }
    },
    // 语音按钮被点击了
    getAudio(active) {
      if (active == true) {
        //二次点击
        let record = recorderr.getBlob();
        this.audioLength = recorderr.audioDuration();
        if (this.audioLength < 1) {
          this.isAudioClick = false;
          this.$Message.warning('语音时间过短，请重新识别', 5);
          this.audioTimer = 60
          this.voiceTime = "0：00"
          recorderr.stop();
          clearInterval(this.timerObj)
          this.timerObj = null;
          let timer = setTimeout(() => {
            this.audioLength = 0
            clearTimeout(timer)
          }, 2000)
        } else {
          this.upload_audio_file(record);
          //暂停录音对象
          recorderr.stop();
          clearInterval(this.timerObj)
          this.timerObj = null;
          this.isAudioClick = false;
          this.audioTimer = 60;
        }
      } else {
        //一次点击
        this.voiceTxt = ""
        //开始采集音频
        var config = {
          sampleBits: 16,
          sampleRate: 16000
        };
        let that=this;
        that.timerSet();
        HZRecorder.get(function (rec) {
          recorderr = rec;
          recorderr.start();
          if(typeof recorderr === 'object'){
            that.isAudioClick = true;
            if (that.timerObj === null) {
              that.timerObj = setInterval(() => {
                that.timerSet();
              }, 1000);
            }
          }
        }, config);
      }
    },
    // 语音倒计时
    timerSet() {
      let time = 60-this.audioTimer
      if(time<10){
        this.voiceTime = '0：0'+time
      }else{
        this.voiceTime = '0：'+time
      }
      if (this.audioTimer == 0) {
        this.voiceTime = '1：00'
        // 定时器自动为0
        clearInterval(this.timerObj)
        let record = recorderr.getBlob();
        this.audioLength = recorderr.audioDuration();
        this.upload_audio_file(record);
        //暂停录音对象
        recorderr.stop();
        this.timerObj = null;
        this.isAudioClick = false;
        this.audioTimer = 60;
      } else {
        this.audioTimer--;
      }
    },
    // 上传语音文件
    async upload_audio_file(blob) {
      this.isRecord = true;
      let formData = new FormData();
      formData.append("file", blob, ".wav");
      let res = await voiceRec(formData);
      this.isRecord = false;
      if (res.data.ret == 1) {
        this.audioTimer = 60
        this.voiceTime = "0：00"
        this.voiceTxt = res.data.info.data
      } else {
        this.$message.error(res.errinfo.errmsg)
      }
    },
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
      background: url("../assets/image/intro_box_bg/voice-rec-bg.jpg") 100% 100% no-repeat;
      .face-title {
        width: 415px;
        font-size: 16px;
        font-weight: 300;
        color:#fff;
        line-height: 24px;
        margin-top: 60px;
        margin-left: 69px;
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
        @include flexJA(center, center);
        .time-box {
          @include flexJA(center, center);
          .start-taste-line {
            display: inline-block;
            vertical-align: baseline;
            width: 102px;
            height: 30px;
            .yuyin-png{
              width: 100%;
              height: 100%;
            }
            
          }
          .total-time{
            font-size: 14px;
            display: inline-block;
            margin-left: 20px;
            color: #999999;
            vertical-align: baseline;
          }
        }
        .rec-btn {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          margin-top:80px;
          width: 180px;
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
          width: 100%;
          padding: 20px;
          text-align: left;
          font-size: 14px;
          height: 230px;
          overflow: auto;
        }
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
