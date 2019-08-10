<template>
  <div class="service-carousel-page">
    <swiper
      :options="swiperOption"
      heigh="330px"
      tref="mySwiper"
      @someSwiperEvent="callback"
    >
      <swiper-slide
        v-for="(item, index) in theSelected"
        :key="index"
      >
        <div class="item-info-box">
          <div
            class="item-info"
            v-for="(info, index1) in item"
            :key="index1"
          >
            <div class="info-content">
              <img
                :src="info.subIcon"
                alt=""
              />
              <div class="title-box">
                <span class="sub-title">{{ info.subTitle }}</span>
                <p class="sub-text">{{ info.subText }}</p>
              </div>
            </div>
            <div class="info-btn-box">
              <div
                class="btn-box btn-try"
                @click="goTry(info)"
              >
                <span class="tbn-text">试试看</span>
              </div>
              <div
                class="btn-box btn-detail"
                @click="goDetail(info)"
              >
                <span class="tbn-text">详情</span>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div
        class="swiper-pagination"
        slot="pagination"
      ></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: ['theSelected'],
  data() {
    return {
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'outside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'never',
      },
      finalData: [],   //处理好的要轮播的数据
      swiperOption: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    console.log('要轮播的数据>>>', this.theSelected);
  },
  beforeUpdate() {

    console.log('更新要轮播的数据>>>', this.theSelected);
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    goTry(info) {
      if (info.open) {
        window.open(info.subUrl)
      } else {
        this.$router.push({ path: info.subUrl });
      }
    },
    goDetail(info) {
      if (info.open) {
        window.open(info.subUrl)
      } else {
        this.$router.push({ path: info.subUrl });
      }
    },
    handleOnChange(oldValue, value) {
      console.log('oldValue>>>', oldValue)
      console.log('value>>>', value)

    },
    callback() { }
  }
}
</script>

<style scoped lang="scss">
.service-carousel-page {
  width: 1012px;
  height: 100%;
  overflow: hidden;

  .swiper-wrapper {
    height: 330px;
  }

  .item-info-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    // align-items: flex-start;
    align-content: space-between;
    width: 996px;
    height: 330px;
    overflow: hidden;
    box-sizing: border-box;

    .item-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 320px;
      height: 160px;
      border: 1px solid #eee;
      margin-left: 12px;
      padding: 10px 20px;

      .info-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex: 1;
        // background: #000;

        img {
          // width: 60px;
          height: 60px;
        }

        .title-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
          height: 100%;
          padding-left: 10px;

          .sub-title {
            font-size: 14px;
            color: $primaryTitle;
          }

          .sub-text {
            // border: 1px solid #ccc;
            overflow: hidden;
            display: -webkit-box;
            text-align: left;
            color: $subTitle;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }

      .info-content:hover {
        .sub-title {
          color: $primary;
        }
      }

      .info-btn-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 36px;
        cursor: pointer;

        .btn-try {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 136px;
          height: 100%;
          background: $primary;

          .tbn-text {
            font-size: 14px;
            color: $white;
          }
        }

        .btn-detail {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 136px;
          height: 100%;
          border: 1px solid #ddd;
          background: $white;

          .tbn-text {
            font-size: 14px;
            color: #999;
          }
        }

        .btn-detail:hover {
          border: 1px solid #ccc;
        }

        .tbn-text {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
<style>
.swiper-wrapper {
  height: 330px;
}

.swiper-container-vertical > .swiper-pagination-bullets {
  right: 0;
}

.swiper-pagination-bullet {
  width: 6px;
  height: 16px;
  border-radius: 0;
}
</style>
