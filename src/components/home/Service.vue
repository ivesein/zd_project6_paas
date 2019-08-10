<template>
  <div class="service-page">
    <div class="service-item-box">
      <div
        class="service-item"
        v-for="(item, index) in serviceItem"
        :key="index"
        :class="{ 'service-item-focused': item.isFocused }"
        @click="choseService(item)"
      >
        <img
          class="
        service-icon"
          :src="item.icon"
          :alt="item.title"
        />
        <span class="service-item-text">{{ item.title }}</span>
      </div>
    </div>
    <div class="service-content-box">
      <!-- <ServiceCarousel :theSelected="theSelected"></ServiceCarousel> -->
      <MySwiper :theSelected="theSelected"></MySwiper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { serviceData } from "utils/serviceData.js"
// import ServiceCarousel from "components/home/ServiceCarousel"
import MySwiper from "components/home/MySwiper"

export default {
  data() {
    return {
      serviceItem: serviceData,
      theSelected: null,
      finalData: []  //处理好的要轮播的数据
    }
  },
  components: {
    // ServiceCarousel,
    MySwiper
  },
  created() {
    // console.log('here>>>', serviceData)
    this.theSelected = this.cutArray(serviceData[0].items, 6)
  },
  methods: {
    // 选择服务类别 动态绑定focused样式
    choseService(item) {
      console.log('this is item>>>', item)
      this.theSelected = this.cutArray(item.items, 6);
      this.serviceItem.forEach(v => {
        v.isFocused = false;
      });
      item.isFocused = true;
    },
    //切割要传过去的数据来 方便根据数据显示轮播页面数量
    cutArray(array, size) {
      //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
      const length = array.length
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return []
      }
      //核心部分
      let index = 0 //用来表示切割元素的范围start
      let resIndex = 0 //用来递增表示输出数组的下标
      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size))
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      //输出新数组
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.service-page {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 330px;

  .service-item-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 100%;
    border: 1px solid #eee;
    padding: 10px 0;
    margin-right: 8px;

    .service-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 40px;
      cursor: pointer;

      .service-icon {
        // width: 20px;
        height: 20px;
        margin-left: 20px;
      }

      .service-item-text {
        font-size: 14px;
        color: $primaryTitle;
        margin-left: 20px;
      }
    }

    .service-item-focused {
      color: $primary;
      background: rgba(49, 112, 246, 0.08);
    }
  }

  .service-content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    // background: #ccc;
  }
}
</style>
