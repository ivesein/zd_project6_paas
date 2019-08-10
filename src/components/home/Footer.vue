<template>
  <div class="footer">
    <!-- eslint-disable -->
    <!-- 服务文字 -->
    <div class="serve-container">
      <span class="serve-title">全部服务</span>
      <span v-for="item in serveData" :key="item" class="serve-txt">{{ item }}</span>
    </div>
    <!-- 关于我们信息 -->
    <div class="us-container">
      <div class="footer-left">
        <h5 class="know-text">扫一扫了解更多</h5>
        <img class="e-code" src="../../assets/image/code.png" alt="">
      </div>
      <div class="footer-center">
        <p class="about-us">关于我们</p>
        <p class="company">陕西中达公路技术服务有限公司</p>
        <p class="address">地址：陕西省西安市汇鑫IBC C-801</p>
        <p class="website">官网：www.sxzd365.com</p>
        <p class="copyright">copyright2014-2019中达公路技术服务有限公司版权所有 陕ICP备17018161号-1</p>
      </div>
      <div class="footer-right">
        <p class="service">联系客服</p>
        <!-- <p class="tel">24小时服务热线：4000-51-2727</p> -->
        <p class="tel">电话：180 9158 9062</p>
        <p class="tel">QQ：418511899</p>
        <!-- <p class="tel">微信：</p> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      serveData:['Sip视频接入','视频会议','视频人脸检索','视频存储',
      '图像增强','人脸检测','人脸搜索','人脸对比',
      '车牌识别','发票识别','安全帽检测','文本识别',
      '语音识别','敏感词检测','语义分析','可视化运维',
      '图纸检测','图纸成册','电子白板','BIM大模型展示',
      'BIM建模','文件转换云盘']
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
/* eslint-disable */
.footer {
  width: 100%;
  height: 320px;
  background-color: $footerBgColor;
  font-size: 14px;
  color: $footerColor;
  .serve-container {
    width: 1118px;
    margin: 0 auto;
    font-size: 14px;
    text-align: left;
    padding: 19px 0;
    .serve-title {
      display: block;
      color: #fff;
      line-height: 25px;
    }
    .serve-txt {
      line-height: 25px;
      display: inline-block;
      margin-right: 43px;
    }
  }
  .us-container {
    border-top: 1px solid rgba(108, 116, 137, 0.2);
    @include flexJA(center, center);
    padding-top: 20px;
    .footer-left {
      .know-text {
        color: #fff;
        line-height: 25px;
      }
      .e-code {
        margin-top: 17px;
        width: 82px;
        height: 84px;
      }
    }
    .footer-center {
      .about-us {
        color: #fff;
        line-height: 25px;
      }
      text-align: left;
      width: 498px;
      height: 117px;
      border-right: 1px solid rgba(108, 116, 137, 0.2);
      border-left: 1px solid rgba(108, 116, 137, 0.2);
      padding: 0 65px;
      margin: 0 65px;
      box-sizing: content-box;
    }
    .footer-right {
      text-align: left;
      .service {
        color: #fff;
        line-height: 25px;
      }
    }
  }
}
</style>
