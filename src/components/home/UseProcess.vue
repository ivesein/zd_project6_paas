<template>
  <div class="use-process">
    <!-- eslint-disable -->
    <h6 class="process-title">使用流程</h6>
    <div class="process-box">
      <div
        v-for="(item, index) of processData"
        :key="index"
        class="pro-content"
      >
        <img
          :src="item.url"
          :class="item.imgClass"
          alt=""
        />
        <span class="pro-title">{{ item.title }}</span>
        <p class="pro-desc">{{ item.describe }}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // processData: [
      /* eslint-disable */
      processData: [
        {
          url: require('../../assets/image/user-add.png'),
          imgClass: 'image-user',
          title: '1.产品注册',
          describe: '使用常用的手机号注册账号用该账号登录'
        },
        {
          url: require('../../assets/image/api.png'),
          imgClass: 'image-api',
          title: '2.API接入方式',
          describe: '使用常用的手机号注册账号用该账号登录'
        },
        {
          url: require('../../assets/image/test.png'),
          imgClass: 'image-test',
          title: '3.测试产品功能',
          describe: '使用常用的手机号注册账号用该账号登录'
        },
        {
          url: require('../../assets/image/online.png'),
          imgClass: 'image-online',
          title: '4.产品上线',
          describe: '使用常用的手机号注册账号用该账号登录'
        },
      ]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/* eslint-disable */
.use-process {
  width: 100%;
  margin-top: 40px;
  .process-title {
    margin: 0 auto;
    width: 96px;
    height: 24px;
    font-size: 24px;
    font-weight: bold;
    color: $primaryTitle;
    line-height: 18px;
    text-align: center;
  }
  .process-box {
    @include flexJA(center, center);
  }
  .pro-content {
    width: 256px;
    height: 260px;
    background: url("../../assets/image/process-bg2x.png") no-repeat 100% 100%;
    margin: 20px 20px 20px 0;
    .image-user {
      width: 38px;
      height: 38px;
    }
    .image-api {
      width: 44px;
      height: 44px;
    }
    .image-test {
      width: 48px;
      height: 38px;
    }
    .image-online {
      width: 48px;
      height: 38px;
    }
    img {
      margin: 32px auto;
    }
    .pro-title {
      display: block;
      font-size: 16px;
      font-weight: 400;
      color: $primaryTitle;
      line-height: 18px;
    }
    .pro-desc {
      margin: 20px auto;
      display: block;
      width: 168px;
      height: 32px;
      font-size: 14px;
      font-weight: 300;
      color: $subTitle;
      line-height: 18px;
    }
  }
}
</style>
