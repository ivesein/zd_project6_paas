<template>
  <div class="invoice-check-page">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="face-check-intro">
        <div class="intro-info-top">
          <span class="info-title info-top-title">
            二维码识别校验
          </span>
          <p class="info-text info-top-text">
            识别票面左上角二维码，获取发票代码，号码，金额
          </p>
          <p class="info-text info-top-text">
            等字段，与识别的对应字段信息进行匹配校验，保证更高的识别准确率
          </p>
        </div>
        <div class="intro-info-bottom">
          <span class="info-title info-top-title">
            全字段识别
          </span>
          <p class="info-text info-top-text">
            支持对增值税普票或专票全部字段的结构化识别
          </p>
          <p class="info-text info-top-text">
            能够满足财税报销等场景中对任意字段的识别需求
          </p>
        </div>
      </div>
    </div>
    <!-- 产品演示 -->
    <div class="demo-box">
      <h5 class="intro-title">产品演示</h5>
      <div class="face-check-demo-box">
        <div class="demo-box-left">
          <div class="file-box">
            <div class="input-box">
              <input
                type="text"
                class="url-input"
                placeholder="请输入网络图片URL"
              />
              <div class="input-btn"><span>检测</span></div>
              <span class="text-or">或</span>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button id="submitBtn">本地上传</Button>
              </Upload>
            </div>
          </div>
          <div class="invoice-list">
            <img
              v-for="(img, index) in imgList"
              :key="index"
              :src="img"
              alt=""
              class="invoice-img"
            />
          </div>
        </div>
        <div class="demo-box-right">
          <p class="box-right-title">识别结果</p>
          <div
            class="result-info"
            v-for="(item, index) in theResult"
            :key="index"
          >
            <p class="info-title">发票基本信息</p>
            <div class="info-item" v-for="(info, index1) in item" :key="index1">
              <span class="item-title">{{ info.title }}</span>
              <span class="item-text">{{ info.text }}</span>
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
import CommonHeader from "components/common/CommonHeader"
import Footer from "../components/home/Footer";
import { invoiceCheckHeaderInfo } from "utils/headerData.js"
export default {
  data() {
    return {
      headerInfo: invoiceCheckHeaderInfo,
      useData: [
        {
          title: "财税报销",
          desc: "使用增值税发票识别技术，实现对增值税普票或专票各字段信息的识别和录入，可应用于企业税务核算及内部报销等场景，能够有效减少人工核算工作量，降低人力成本，实现财税报销的自动化。"
        },
        {
          title: "发票验真",
          desc: "使用增值税发票识别技术，实现对发票代码、号码、开具金额、开票日期四个关键字段的识别，供用户接入税务机关发票查验平台进行真伪查验，能够实现发票真伪查验的自动化，有效降低人力成本，控制业务风险。"
        }
      ],
      theResult: [
        [
          { text: "专用发票", title: "发票名称" },
          { text: "1234567890", title: "发票代码" },
          { text: "0123456789", title: "发票号码" },
          { text: "2015年12月31日", title: "开票日期" },
          { text: "任铁兵", title: "收款人" },
          { text: "张文", title: "复核" },
          { text: "胡延军", title: "开票人" }
        ],
        [
          { text: "专用发票", title: "发票名称" },
          { text: "1234567890", title: "发票代码" },
          { text: "0123456789", title: "发票号码" },
          { text: "2015年12月31日", title: "开票日期" },
          { text: "任铁兵", title: "收款人" },
          { text: "张文", title: "复核" },
          { text: "胡延军", title: "开票人" }
        ]
      ],
      imgList: [
        require("../assets/image/invoice.png"),
        require("../assets/image/invoice.png"),
        require("../assets/image/invoice.png"),
        require("../assets/image/invoice.png"),
      ]
    }
  },
  components: {
    CommonHeader,
    Footer
  }
}
</script>

<style scoped lang="scss">
.invoice-check-page {
  width: 100%;

  .intro-title {
    @include introTitle();
  }

  .intro-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .face-check-intro {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 1200px;
      height: 466px;
      background: url("../assets/image/intro_box_bg/invoice-check-intro-bg.jpg")
        no-repeat center;

      .info-title {
        font-size: 26px;
        color: $white;
        margin-bottom: 10px;
        line-height: 32px;
      }

      .info-text {
        font-size: 14px;
        color: $white;
      }

      .intro-info-top {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-top: 120px;
        margin-left: 325px;
      }

      .intro-info-bottom {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        flex: 1;
        margin-top: 100px;
        margin-left: 626px;
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

    .face-check-demo-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 1200px;
      height: 720px;
      // background: #797b7f;

      .demo-box-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 968px;
        height: 720px;
        border: 1px solid #cacaca;

        .file-box {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          flex: 1;

          .input-box {
            position: absolute;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 92px;
            background: rgba(0, 0, 0, 0.5);
            padding-left: 24px;

            .url-input {
              width: 676px;
              height: 48px;
              text-indent: 14px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid $white;
              font-size: 20px;
              color: $white;
              font-weight: 700;
            }

            .url-input::placeholder {
              font-size: 20px;
              color: $white;
              font-weight: 700;
            }

            .input-btn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 94px;
              height: 48px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid $white;
              border-left: none;
              cursor: pointer;

              span {
                font-size: 18px;
                color: $white;
                font-weight: 700;
              }
            }

            .text-or {
              font-size: 18px;
              font-weight: 700;
              color: $white;
              margin: 0 18px;
            }

            .ivu-upload {
              width: 98px;
              height: 48px;

              #submitBtn {
                width: 96px;
                height: 48px;
                border-radius: 0;
                background: $primary;
                border: none;
                font-size: 18px;
                font-weight: 700;
                color: $white;
              }
            }
          }
        }

        .invoice-list {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 176px;
          cursor: pointer;

          .invoice-img {
            width: 200px;
            height: 110px;
            border-bottom: 1px solid #000;
          }
        }
      }

      .demo-box-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex: 1;
        height: 100%;
        border: 1px solid #cacaca;

        .box-right-title {
          width: 100%;
          height: 74px;
          line-height: 74px;
          text-align: left;
          margin-left: 4px;
          font-size: 18px;
          font-weight: 700;
          color: #000;
        }

        .result-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          height: 263px;
          margin-bottom: 30px;

          .info-title {
            width: 100%;
            height: 14px;
            line-height: 14px;
            text-align: left;
            padding-left: 6px;
            border-left: 2px solid $primary;
            margin-left: 15px;
          }

          .info-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 14px;
            margin-left: 24px;

            span {
              font-size: 12px;
              color: #000;
              text-align: left;
            }

            .item-title {
              width: 80px;
              line-height: 14px;
            }

            .item-text {
              height: 100%;
              flex: 1;
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
