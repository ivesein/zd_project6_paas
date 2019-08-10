<template>
  <div class="video-carnum-check">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="carnum-check-intro">
        <span class="intro-sub-title">豫H81888</span>
        <!-- <p class="intro-sub-text">
          基于深度学习的人脸识别方案，准确识别视频中的人脸信息
          提供人脸属性识别，关键点定位、人脸1:1比对、人脸1：N识别
        </p> -->
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="carnum-check-demo-box">
        <div class="video-list-box">
          <span class="video-list-title">选择一段视频做测试:</span>
          <div
            class="video-list-item"
            v-for="(item, index) in videoList"
            :key="index"
            :class="{ 'video-list-item-selected': item.clicked }"
            @click="choseVideo(item)"
          >
            <div class="play-icon-box">
              <div class="triangle-symbol"></div>
            </div>
            <img :src="item.img" alt="" class="video-screen" />
          </div>
        </div>
        <div class="result-box">
          <div class="video-box" id="myPlayer"></div>
          <div class="result-box-bottom">
            <div class="result-bottom-left">
              <span class="left-title">
                选择一个人以查看他们在视频中的显示位置
              </span>
              <div class="avatar-list">
                <img
                  v-for="(item, index) in avatarList"
                  :key="index"
                  :src="item.img"
                  alt=""
                  class="avatar-img"
                  :class="{ 'avatar-img-selected': item.selected }"
                  @click="selectAvatar(item)"
                />
              </div>
            </div>
            <div class="result-bottom-right">
              <Spin fix v-if="isChecking"></Spin>
              <span class="left-title">
                识别结果
              </span>
              <span class="result-text result-name">
                {{ theRecName }}
              </span>
              <span class="result-text">
                出现{{ appearTimes }}次 共占视频的{{ percentage }}%
              </span>
              <TimeLine ref="line" :info="info"></TimeLine>
            </div>
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
import TimeLine from "components/video_face_check/TimeLine";

import { videoCarNumCheckHeaderInfo } from "utils/headerData.js";
import { Ws } from "utils/api.js";
import Player from 'xgplayer';
export default {
  data() {
    return {
      headerInfo: videoCarNumCheckHeaderInfo,
      isChecking: false,
      config: {
        id: 'myPlayer',
        url: 'http://192.168.1.239:5200/plate_reco/plate.mp4',
        poster: 'http://192.168.1.239:5200/plate_reco/1559541583.jpg',
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
      videoList: [
        {
          img: "http://192.168.1.239:5200/plate_reco/1559541583.jpg",
          url: "http://192.168.1.239:5200/plate_reco/plate.mp4",
          clicked: true
        }
      ],
      avatarList: [
        {
          img: require("../assets/image/avatar/carnum01.jpg"),
          name: "陕AD630J",
          selected: false
        },
        {
          img: require("../assets/image/avatar/carnum02.jpg"),
          name: "陕AY3E60",
          selected: false
        },
        {
          img: require("../assets/image/avatar/carnum3.png"),
          name: "陕AY3M77",
          selected: false
        },
        {
          img: require("../assets/image/avatar/carnum4.png"),
          name: "陕AA382Q",
          selected: false
        }
      ],
      useData: [
        {
          title: "停车场闸机识别",
          desc: "在停车场的闸机上使用车牌识别，自动识别车牌号码实现无卡、无人的停车场管理，方便快捷。"
        },
        {
          title: "道路违章检测",
          desc: "在交通道路上的摄像头中加入车牌识别结合违章判断，对违章的车辆号码进行自动识别，实现自动化的违章审计。"
        },
        {
          title: "工地现场车辆检测",
          desc: "在工地现场，使用车牌识别技术，自动识别监测是否为外来车辆，记录车辆出入记录。"
        }
      ],
      ws: null,
      filePath: "F:/code_clone/ns_light2/recognition/common/files/plate_reco/plate.mp4", //F:/git_clone/media_server_2019/recognition/identification/bin/plate_reco/plate.mp4
      theRecName: "未知",
      videoDuration: 0,
      info: {
        startTime: 0,
        endTime: 0,
        duration: 0,
        theWidth: 0
      },
      appearTimes: 0, //出现次数
      percentage: 0  //出现时长百分比
    }
  },
  components: {
    CommonHeader,
    TimeLine,
    Footer
  },
  mounted() {
    this.player = new Player(this.config)
    this.player.once('complete', () => {
      setTimeout(() => {
        console.log('complete', this.player);
        this.info.duration = this.player.duration;
        console.log("this.info.duration", this.info.duration)
        console.log("this.player.duration", this.player.duration)
        // debugger
      }, 1000)    })
    this.player.once("ended", () => {
      console.log("ended>>>", this.player)
    })
    // this.player.once('play', () => {
    //   console.log('play', this.player);
    //   this.player.pause()
    // })
    this.info.theWidth = this.$refs.line.$el.clientWidth;
    this.ws = new Ws({ cb: this.onmessage });
    this.ws.init();
  },
  destroyed() {
    if (this.ws) {
      this.ws.close()
    }
  },
  computed: {
  },
  methods: {
    onmessage(data) {
      console.log(data)
      this.theRecName = data.name;
      this.info.startTime = data.starttime;
      this.info.endTime = data.endtime;
      this.appearTimes = data.sum; //获取出现此时
      this.percentage = ((data.endtime - data.starttime) / this.info.duration * 100).toFixed(2);  //计算时长百分比
      this.isChecking = false;
    },
    choseVideo(item) {
      this.videoList.forEach(v => {
        v.clicked = false;
      })
      item.clicked = true;
    },
    selectAvatar(item) {
      if (this.isChecking) {
        return;
      }
      this.isChecking = true;
      this.avatarList.forEach(v => {
        v.selected = false;
      });
      item.selected = true;
      this.goCheck(this.filePath, item.name)
    },
    initWs() { },
    goCheck(filePath, name) {
      let param = {
        query: {
          cmd: 14,
          name: encodeURI(name),
          // name: name,
          disk_path: filePath
        }
      };
      console.log("发送参数>>>", decodeURI(param.query.name), param)
      if (this.ws.socket.readyState == 3) {
        this.$Message.error("webSocket服务连接失败,请稍后再试...");
        this.isChecking = false;
      } else {
        this.ws.send(param)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.video-carnum-check {
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

    .carnum-check-intro {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      width: 1200px;
      height: 320px;
      padding-top: 117px;
      padding-left: 152px;
      background: url("../assets/image/intro_box_bg/video_carNum_check_intro_bg.jpg")
        no-repeat center;

      .intro-sub-title {
        font-size: 56px;
        color: $white;
        text-align: left;
        letter-spacing: 4px;
        margin-right: 170px;
      }

      .intro-sub-text {
        width: 487px;
        line-height: 36px;
        font-size: 16px;
        color: $white;
        text-align: left;
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

    .carnum-check-demo-box {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 1200px;
      height: 760px;
      background: #797b7f;

      .video-list-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 233px;
        height: 100%;
        padding: 26px 16px 26px 25px;
        border-right: 1px solid #fff;

        .video-list-title {
          font-size: 18px;
          color: #fff;
        }

        .video-list-item {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 194px;
          height: 114px;
          border: 2px solid #000;
          margin-top: 21px;
          cursor: pointer;

          .play-icon-box {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 56px;
            height: 56px;
            border: 4px solid $primary;
            border-radius: 100%;
            padding-left: 10px;
            background: rgba(0, 0, 0, 0);

            .triangle-symbol {
              width: 0;
              height: 0;
              border-top: 16px solid transparent;
              border-bottom: 16px solid transparent;
              border-left: 28px solid #fff;
            }
          }

          img {
            width: 190px;
            height: 110px;
            object-fit: cover;
            object-position: center;
          }
        }

        .video-list-item-selected {
          border: 2px solid #fff;
        }
      }

      .result-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 966px;
        height: 100%;

        .video-box {
          width: 966px;
          height: 538px;
          border-bottom: 1px solid #fff;

          img {
            width: 966px;
            height: 538px;
          }
        }

        .result-box-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          flex: 1;
          padding: 16px 0;

          .left-title {
            font-size: 18px;
            font-weight: 700;
            color: $white;
          }

          .result-bottom-left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 50%;
            height: 100%;
            padding: 10px 20px;

            .avatar-list {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
              flex: 1;

              .avatar-img {
                width: 58px;
                height: 58px;
                border-radius: 50%;
                margin-right: 15px;
                cursor: pointer;
              }

              .avatar-img-selected {
                width: 75px;
                height: 75px;
                border: 2px solid #fff;
              }
            }
          }

          .result-bottom-right {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 10px 20px;
            width: 50%;
            height: 100%;
            border-left: 1px solid #fff;

            .ivu-spin-fix {
              background: rgba(0, 0, 0, 0.3);
            }

            .result-name {
              margin-top: 22px;
            }

            .result-text {
              font-size: 14px;
              color: $white;
              margin-bottom: 19px;
            }
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
</style>
<style>
.xgplayer {
  width: 966px !important;
  height: 538px !important;
}
</style>
