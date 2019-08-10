<template>
  <div class="text-detection">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="text-detection-intro">
        <div
          class="pro-item-box"
          v-for="(item, index) in proList"
          :key="index"
        >
          <div class="img-box">
            <img
              :src="item.icon"
              alt=""
            />
          </div>
          <div class="info-text-box">
            <span class="info-title">{{ item.title }}</span>
            <span class="info-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="text-detection-demo-box">
        <div class="demo-box-top">
          <div class="title-box">
            <div class="title">
              <span>您的文本</span>
            </div>
            <span class="intro-text">请输入一段想分析的文本：</span>
            <span
              class="intro-text text-btn"
              @click="expRandom"
            >随机示例</span>
          </div>
          <textarea
            v-model="defaultText"
            name="your_text"
            id="yourText"
            cols="30"
            rows="6"
            :maxlength="totalLength"
          ></textarea>
          <div
            class="start-btn"
            @click="sendText"
          >
            <span v-if="!loading">开始分析</span>
            <!-- <span v-else>分析中...</span> -->
            <div
              v-else
              class="dots"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="text-length">
            <span class="current-length">{{ textLength }}</span><span>/</span><span class="total-length">{{ totalLength }}</span>
          </div>
        </div>
        <div class="demo-box-bottom">
          <div class="result-box">
            <div class="result-title">
              <div class="title">
                <span>分析结果</span>
              </div>
              <span
                v-if="spam===0"
                class="result-text span-check-passed"
              >审核通过</span>
              <span
                v-else-if="spam===1"
                class="result-text span-check-failed"
              >审核不通过</span>
              <span
                v-else
                class="result-text span-check-wait"
              >建议人工复核</span>
            </div>
            <div class="result-table-box">
              <div class="item-row row-title">
                <div
                  class="title-box"
                  v-for="(item, index) in titles"
                  :key="index"
                >
                  <span>{{ item }}</span>
                </div>
              </div>
              <div
                class="item-row row-result"
                v-for="(item, index1) in resultInfo"
                :key="index1"
              >
                <div class="title-box item-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="title-box item-status">
                  <span
                    v-if="item.status===0"
                    class="check-passed"
                  >通过</span>
                  <span
                    v-else-if="item.status===1"
                    class="check-failed"
                  >不通过</span>
                  <span
                    v-else
                    class="check-wait"
                  >待定</span>
                </div>
                <div class="title-box item-reliability">
                  <span>{{ item.reliability }}</span>
                </div>
                <div class="title-box item-prohibitedWords">
                  <span
                    v-if="item.prohibitedWords"
                    class="good-words"
                  >有</span>
                  <span
                    v-else
                    class="bad-words"
                  >无</span>
                </div>
              </div>
            </div>
          </div>
          <div class="response-box">
            <div class="title-box">
              <span>Response</span>
            </div>
            <pre class="response-code">{{theResultJson}}</pre>
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
import { TextDetectionHeaderInfo } from "utils/headerData.js";
import { textDectection } from "utils/api.js";
export default {
  data() {
    return {
      loading: false,
      headerInfo: TextDetectionHeaderInfo,
      titles: ["审核维度", "状态", "置信度", "违禁词"],
      defaultText: "你也滚蛋！跟你很熟吗？起个这ID来恶心人？",  //默认输入文本
      textLength: 0,     //当前输入字数
      totalLength: 300,  //允许输入的总字数
      theResultJson: null,
      spam: 0,  //0表示审核通过，1表示审核未通过，2表示建议人工复审
      randomText: [  //随机文本池
        "你也滚蛋！跟你很熟吗？起个这ID来恶心人？",
        "哈哈哈，我看你有点蠢，大概是个智障！",
        "一个傻子，一个哑巴，死一边去吧！",
        "法轮大法真善美，使上亿人身体健康",
        "中单是不是瞎子，眼睛不要可以捐给游戏要的人，傻逼，nmsl。",
        "孤儿打野，在野区给你妈採灵芝呢?",
        "崽种ad，0-5你在这说尼玛呢。",
        "以前不懂，看贴总是不回 一直没提升等级和增加经验现在我明白了反正回贴可以升级 也可以经验而升级又需要经验 我就把这句话复制下来遇贴就灌水捞经验就闪",
        "奵奺奻奼奾奿妀妁妅妉妊妋妌妍妎妏妐妑妔妕妗妘妚妛妜妟妠妡妢妤妦妧妩妫妭妮妯妰妱妲妴妵妶妷妸妺妼妽妿姀姁姂姃姄姅姆姇姈",
        "黑娃躺在光滑细密的竹皮凉席上，静静地躺在她的旁边。她拉过他的手按在她的奶子上。“男人的牛，女人揉，女人的奶，男人揣。”他记起了李相的歌。”",
      ],
      resultInfo: [  //分析结果显示数据
        {
          title: "低俗辱骂",
          status: 0,  //0表示审核通过，1表示审核未通过，2表示建议人工复审
          reliability: '0',
          prohibitedWords: true
        },
        {
          title: "暴恐违禁",
          status: 0,
          reliability: '0',
          prohibitedWords: true
        },
        {
          title: "色情文本",
          status: 0,
          reliability: '0',
          prohibitedWords: false
        },
        {
          title: "政治敏感",
          status: 0,
          reliability: '0',
          prohibitedWords: false
        },
        {
          title: "恶意推广",
          status: 0,
          reliability: '0',
          prohibitedWords: false
        },
        {
          title: "低质灌水",
          status: 0,
          reliability: '0',
          prohibitedWords: false
        }
      ],
      proList: [  //产品介绍相关信息
        {
          icon: require("../assets/image/intro_box_bg/icon_politics.png"),
          title: "政治敏感",
          text: "识别文中的涉政敏感，反动等不良信息"
        },
        {
          icon: require("../assets/image/intro_box_bg/icon_extend.png"),
          title: "恶意推广",
          text: "识别文中含有推广或售意向的内容"
        },
        {
          icon: require("../assets/image/intro_box_bg/icon_porn.png"),
          title: "智能鉴黄",
          text: "识别文本中不合网络规范的色情内容"
        },
        {
          icon: require("../assets/image/intro_box_bg/icon_vulgar.png"),
          title: "低俗辱骂",
          text: "识别文中包含低俗辱骂的垃圾内容"
        },
        {
          icon: require("../assets/image/intro_box_bg/icon_violence.png"),
          title: "暴恐违禁",
          text: "识别文本中国家法律限制的暴恐、赌博、毒品等违法违规内容"
        },
        {
          icon: require("../assets/image/intro_box_bg/icon_irrigation.png"),
          title: "低质灌水",
          text: "识别无实意字符或乱码等特征的灌水类文本"
        }
      ],
      useData: [   //应用场景相关信息
        {
          title: "用户评论监控",
          desc: "对网站用户的评论信息检测，一旦发现用户提交恶意垃圾内容，可以做到文本的自动审核与过滤，保证产品良好用户体验。"
        },
        {
          title: "注册信息筛查",
          desc: "对网站的注册信息进行检测，过滤筛查用户提交注册的用户名或网名昵称，避免通过用户名的方式恶意推广。"
        },
        {
          title: "文章内容审核",
          desc: "媒体文章的文本内容审核，自动识别文章中可能存在的推广、反动、色情信息，避免已发布文章的线上风险。"
        }
      ]
    }
  },
  components: {
    CommonHeader,
    Footer
  },
  created() {
    this.textLength = this.defaultText.length;
  },
  methods: {
    //获取随机示例
    expRandom() {
      let index = parseInt(Math.random() * 10);
      this.defaultText = this.randomText[index]
      this.textLength = this.defaultText.length;
    },
    //开始分析
    async sendText() {
      //防止多次点击
      if (this.loading) {
        return;
      }
      this.loading = true
      let param = {
        data: []
      }
      param.data.push(this.defaultText);
      let res = await textDectection(param);
      console.log('this is res>>>', res);
      this.loading = false;
      if (res.data.ret === "1") {
        this.spam = res.data.info[0].spam;
        let info = res.data.info[0];
        //处理resultInfo 通过数据
        info.pass.forEach(pv => {
          this.resultInfo.forEach(rv => {
            if (pv.name == rv.title) {
              rv.status = 0;
              rv.reliability = pv.score;
              rv.prohibitedWords = pv.hit.length;
            }
          })
        });
        //处理resultInfo 不通过数据
        info.reject.forEach(rjv => {
          this.resultInfo.forEach(rv => {
            if (rjv.name == rv.title) {
              rv.status = 1;
              rv.reliability = rjv.score;
              rv.prohibitedWords = rjv.hit.length;
            }
          })
        });
        //处理resultInfo 待复核数据
        info.review.forEach(rvv => {
          this.resultInfo.forEach(rv => {
            if (rvv.name == rv.title) {
              rv.status = 2;
              rv.reliability = rvv.score;
              rv.prohibitedWords = rvv.hit.length;
            }
          })
        });
        //要显示的response数据
        this.theResultJson = info;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.text-detection {
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

    .text-detection-intro {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 1200px;
      height: 320px;
      background: $white;

      .pro-item-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 386px;
        height: 120px;
        margin-bottom: 20px;
        border: 1px solid #eee;
        padding-left: 30px;

        .img-box {
          width: 57px;
          height: 60px;
          border: 1px dashed #c7c7c7;

          .img {
            width: 56px;
            height: 59px;
          }
        }

        .info-text-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          flex: 1;
          height: 40px;
          padding-left: 15px;

          .info-title {
            font-size: 14px;
            color: $primaryTitle;
          }

          .info-text {
            font-size: 14px;
            color: #b4b4b4;
          }
        }
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

    .text-detection-demo-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 1200px;
      height: 660px;

      .demo-box-top {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 1200px;
        height: 280px;
        background: #fff;
        border: 1px solid #eee;

        .text-length {
          position: absolute;
          right: 20px;
          bottom: 22px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 80px;
          height: 20px;

          span {
            font-size: 14px;
            color: #999;
          }
        }

        .title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 36px;

          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100%;
            background: $introBgColor;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;

            span {
              font-size: 14px;
              color: #999;
            }
          }

          .intro-text {
            font-size: 14px;
            color: #999;
            margin-left: 21px;
          }

          .text-btn {
            color: $primary;
            cursor: pointer;
          }
        }

        #yourText {
          width: 1160px;
          height: 140px;
          margin: 20px;
          font-size: 14px;
          color: #b4b4b4;
          line-height: 34px;
          resize: none;
          padding: 19px 22px;
        }

        .start-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          width: 180px;
          height: 52px;
          background: $primary;
          cursor: pointer;
          margin-bottom: 20px;

          span {
            font-size: 14px;
            color: $white;
          }

          .dots {
            width: 40px;
            height: 30px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
          }

          .dots div {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            animation: fade 0.8s ease-in-out alternate infinite;
          }

          .dots div:nth-of-type(1) {
            animation-delay: -0.4s;
          }

          .dots div:nth-of-type(2) {
            animation-delay: -0.2s;
          }

          @keyframes fade {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        }
      }

      .demo-box-bottom {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 10px;
        width: 100%;
        flex: 1;
        background: $white;

        .result-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          width: 800px;
          height: 100%;
          border: 1px solid #eee;

          .result-title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 36px;

            .title {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 100%;
              background: $introBgColor;
              border-right: 1px solid #eee;
              border-bottom: 1px solid #eee;

              span {
                font-size: 14px;
                color: #999;
              }
            }

            .result-text {
              font-size: 14px;
              color: #89c997;
              margin-left: 46px;
            }

            .span-check-passed {
              color: #89c997;
            }

            .span-check-failed {
              color: #ee6132;
            }

            .span-check-wait {
              color: #e7d109;
            }
          }

          .result-table-box {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;
            flex: 1;

            .item-row {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
              height: 46px;

              .title-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 200px;
                height: 46px;
                padding-left: 20px;

                span {
                  font-size: 12px;
                  color: #b5b5b5;
                }
              }

              .item-title {
                span {
                  font-size: 14px;
                  color: #666;
                }
              }

              .item-status {
                font {
                  font-size: 14px;
                  color: #89c997;
                }

                .check-failed {
                  color: #ee6132;
                }

                .check-passed {
                  color: #89c997;
                }

                .check-wait {
                  color: #e7d109;
                }
              }

              .item-reliability {
                span {
                  font-size: 14px;
                  color: #666;
                }
              }

              .item-prohibitedWords {
                font {
                  font-size: 14px;
                  color: #b4b4b4;
                }

                .good-words {
                  color: #ee6132;
                }
              }
            }

            .row-result:nth-of-type(even) {
              background: #f8f8f8;
            }
          }
        }

        .response-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          flex: 1;
          height: 100%;
          border: 1px solid #eee;

          .title-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 36px;
            background: $introBgColor;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;

            span {
              font-size: 14px;
              color: #999;
            }
          }

          .response-code {
            width: 100%;
            flex: 1;
            font-size: 14px;
            color: #b5b5b5;
            text-align: left;
            overflow: auto;
            margin-top: 30px;
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
    width: 1200px;
    height: 214px;
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
