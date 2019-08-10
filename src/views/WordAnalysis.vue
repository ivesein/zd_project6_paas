<template>
  <div class="face-detect">
    <!-- eslint-disable -->
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 产品介绍相关 -->
    <div class="intro-box">
      <h5 class="intro-title">产品介绍</h5>
      <div class="words-intro">
        <div>
          <h5 class="word-title">三大功能分析</h5>
          <p class="words-txt">向用户提供分词、词性标注、命名实体识别三大功能。
            该服务能够识别出文本串中的基本词汇（分词），
            对这些词汇进行重组、标注组合后词汇的词性，并进一步识别出命名实体</p>
        </div>
      </div>
    </div>
    <!-- 演示demo相关 -->
    <div class="demo-box">
      <h5 class="intro-title">演示Demo</h5>
      <!-- 原始图片与识别结果 -->
      <div class="img-result">
        <!-- 原始图片盒子 -->
        <div class="origin-pic-box">
          <div class="input-box">
            <textarea maxlength="150" @input="inputChage" v-model="inputWords" class="com-txt"></textarea>
          </div>
          <p class="origin-tip">请输入一段想分析的文本：<span class="random-btn" @click="randomBtn">随机示例</span></p>
          <span class="origin-pic-title">您的文本</span>
          <span class="words-num">{{wordsLength}}/150</span>
        </div>
        <!-- 识别结果盒子 -->
        <div class="result-box">
          <!-- 分词词性 -->
          <div class="participle-box">
            <p class="result-title">分词词性</p>
            <div class="words-box">
              <div v-for="(item,index) of wordsItems" :key="index" @click="changeNow(index,item)" class="words-content" :class="{'words-active':wordsActive==index,'words-time':item.wordsTime,'words-per':item.wordsPer,'words-org':item.wordsOrg,'words-loc':item.wordsLoc}">
                <span class="words-title">{{item.item}}</span>
                <span class="words-txt" v-if="item.pos!==''">{{item.pos}}</span>
                <span class="words-txt" v-if="item.ne!==''">{{item.ne}}</span>
              </div>
            </div>
          </div>
          <!-- 词汇相关 -->
          <div class="about-words">
            <p class="result-title">词汇详情</p>
            <div class="words-detail" v-for="item of wordsDetailList">
              <Icon type="ios-arrow-back" @click="leftBtn" v-if="wordsDetailListMore.length!==1&&nowDetailMoreIndex!==0" class="left-btn" size="20" color="#666"/>
              <p><span>词汇：</span>{{item.title}}</p>
              <p><span>词性：</span>{{item.pos}}</p>
              <p><span>实体识别：</span>{{item.par}}</p>
              <Icon type="ios-arrow-forward" @click="rightBtn" v-if="wordsDetailListMore.length!==1&&nowDetailMoreIndex!==wordsDetailListMore.length-1" class="right-btn" size="20" color="#666"/>
            </div>
            <p class="result-title">专名识别</p>
            <div class="proper-noun">
              <span v-for="item in neList" @click="changePar(item.ne)">{{item.name}}</span>
            </div>
          </div>
          <span class="origin-pic-title">分析结果</span>
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
import { WordAnalysisHeaderInfo } from "utils/headerData.js";
import { neObj,participleObj } from "utils/wordsData.js";
import { wordAnalysis } from "utils/api.js";
export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      headerInfo: WordAnalysisHeaderInfo,
      /* eslint-disable */
      inputWords: "",//输入框输入的文字
      wordsLength: 0,//字符长度
      useData: [
        {
          title: "语音指令解析",
          desc: "以分词和词性标注为基础，分析语音命令中的关键名词、动词、数量、时间等，准确理解命令的含义，提高用户体验"
        },
        {
          title: "多轮交互式搜索",
          desc: "通过专名识别定位多轮对话中的核心实体，自动判断后续对话中对该实体的进一步信息需求 "
        },
        {
          title: "实体数据库构建",
          desc: "通过挖掘实体之间、实体与关键词之间的关联，构建实体信息（如人物、机构）数据库 "
        }
      ],
      neObj:neObj,//专有名词
      neList:[],//专名识别
      participleObj:participleObj,//词性
      wordsDetailList:[],
      wordsDetailListMore:[],
      nowDetailMoreIndex:0,
      wordsActive:0,
      randomWordList:[
        "根据这家美国媒体的说法，多年来，华为与硅谷主流公司具有业务往来：从高通公司和博通采购智能手机芯片，从英特尔公司采购蜂窝塔组件，从甲骨文公司采购软件，还从美国各地一系列规模较小的科技公司采购其他零部件。",
        "对芯片公司来说，这无疑是重大利空消息。分析认为，华为等中国企业是这些美国企业的重要客户。半导体产业、乃至整个科技产业的布局都相对超前，很多硅谷企业是按照华为等中国企业几年后的需求来规划生产线、产能及进行产品设计的。",
        "上世纪70年代的时候，中国的稀土资源一度占彼时世界探明储量的71%之多。随着勘探技术的进步，其他国家也发现了一些大型稀土矿藏，中国储量占比下降到36%，但仍居世界第一；排在中国后面的，有巴西、越南和俄罗斯。",
        "“考虑到我们知道网络战的开展方式，而且近期的袭击对全球的交通和基建枢纽造成冲击，商务部必须……彻底检查中国中车就纽约地铁系统所做的任何计划或工作，包括我们的信号、无线网络等。”舒默补充说。",
        "中国跆拳道奥运冠军郑姝音在上周结束的世界跆拳道锦标赛女子73公斤以上级决赛后的一段采访中告诉记者：“从我练跆拳道那天开始，我就知道他是对抗性项目，是竞技体育没有绝对公平，但是我练了16年，我才知道比赛还有这样的。我拜托裁判，我拜托她公平些。",
        "中国民航局表示，《中欧民用航空安全协定》确立了中国与欧盟在适航和环保审定、飞行运行、空管服务、人员执照与培训等民航安全领域进行广泛合作的法律框架，特别是适航和环保审定附件的签署，给中欧双方航空产品的适航审定合作创造了条件，为双方航空产品的交流提供了广阔途径。",
        "中国美术馆与俄罗斯、韩国、希腊、白俄罗斯、哈萨克斯坦、越南、斯里兰卡、乌克兰、立陶宛、保加利亚、孟加拉国、匈牙利、土耳其、摩尔多瓦、亚美尼亚、波兰等18个国家的21家美术馆和重点美术机构共同成立丝绸之路国际美术馆联盟",
        "在如今的井冈山，和毛浩夫同龄且有高学历的讲解员，并不少见。在这样的实践中，他们收获着信仰和热爱。毛浩夫说，他和伙伴们正在做的事，正如爷爷信上所写：“宣传别人与改造自己相结合……改造自己的世界观，对井冈山精神做到真学、真信、真用。这是一辈子的事情。”",
        "北京大学工学院研究员、北京大学机器人研究中心副主任王启宁表示，人工智能和机器人技术在科技革命进程中正扮演越来越重要的角色，也是当前世界各国都关注的重点发展领域之一，北大希望能培养出掌握机器人关键技术的领军人才，助力我国科技发展。",
        "智班旨在培养人工智能领域领跑国际的拔尖科研创新人才，并通过其广基础、重交叉的培养模式，打造学科间的深层交叉合作平台，进一步地促进不同学科之间的交叉结合；并在助力不同学科发展的同时，深化对人工智能前沿的理解并进一步推进人工智能发展"
      ],
      wordsItems: [],
      timerObj:null,
    };
  },
  mounted(){
    this.randomBtn();
  },
  methods:{
    // 改变当前的词汇
    changeNow(index,item){
      this.wordsActive=index;
      this.wordsDetailList=[]
      this.wordsDetailListMore=[]
      for(let item of this.wordsItems){
        item.wordsTime=false 
        item.wordsPer=false
        item.wordsOrg=false 
        item.wordsLoc=false 
      }
      let obj={}
      obj.title=item.item
      if(item.ne!==""){
        obj.par=this.neObj[item.ne]
        obj.pos=this.neObj[item.ne]
      }else if(item.pos!==""){
        obj.par=""
        obj.pos=this.participleObj[item.pos]
      }
      this.wordsDetailList.push(obj)
      this.wordsDetailListMore=this.wordsDetailList
    },
    // 输入框输入内容改变时
    inputChage(){
      if(this.timerObj!==null){
        clearInterval(this.timerObj)
        this.timerObj=null
      }
      this.timerObj = setTimeout(()=>{
        this.wordsLength=this.inputWords.length;
        this.wordAnalysis(this.inputWords)
        clearInterval(this.timerObj)
      },1000)
    },
    // 随机示例按钮被点击了
    randomBtn(){
      let index = parseInt(Math.random()*10);
      this.inputWords=this.randomWordList[index]
      this.wordsLength=this.inputWords.length;
      this.wordAnalysis(this.inputWords)
    },
    // 词法分析接口
    async wordAnalysis(txt){
      let param={
        data:txt
      }
      let res = await wordAnalysis(param);
      let data = res.data
      if (data.ret == 1) {
        for(let i of data.info.items){
          i.wordsTime=false 
          i.wordsPer=false
          i.wordsOrg=false 
          i.wordsLoc=false 
        }
        this.wordsItems=data.info.items
        let list=[]
        for(let item of data.info.ne_list){
          list.push(
            {
              ne:item,
              name:this.neObj[item]
            }
          )
        }
        this.neList=list
        this.changeNow(0,this.wordsItems[0])
      } else {
        this.$message.error(res.errinfo.errmsg)
      }
    },
    // 专名识别被点击了
    changePar(ne){
      this.wordsDetailList=[]
      this.wordsDetailListMore=[]
      this.wordsActive=null;
      let list = []
      for(let item of this.wordsItems){
        item.wordsTime=false 
        item.wordsPer=false
        item.wordsOrg=false 
        item.wordsLoc=false 
        if(ne===item.ne){
          switch (ne){
            case 'TIME': 
              item.wordsTime=true 
              break;
            case 'PER': 
              item.wordsPer=true 
              break;
            case 'ORG': 
              item.wordsOrg=true 
              break;
            case 'LOC': 
              item.wordsLoc=true 
              break;
          }
          let obj={}
          obj.title=item.item
          if(item.ne!==""){
            obj.par=this.neObj[item.ne]
            obj.pos=this.neObj[item.ne]
          }else if(item.pos!==""){
            obj.par=""
            obj.pos=this.participleObj[item.pos]
          }
          list.push(obj)
        }
      }
      this.wordsDetailList.push(list[0])
      this.nowDetailMoreIndex=0
      this.wordsDetailListMore=list
    },
    // 左侧按钮被点击了
    leftBtn(){
      this.wordsDetailList=[]
      this.nowDetailMoreIndex=this.nowDetailMoreIndex-1
      this.wordsDetailList.push(this.wordsDetailListMore[this.nowDetailMoreIndex])
    },
    // 右侧按钮被点击了
    rightBtn(){
      this.wordsDetailList=[]
      this.nowDetailMoreIndex=this.nowDetailMoreIndex+1
      this.wordsDetailList.push(this.wordsDetailListMore[this.nowDetailMoreIndex])
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
    .words-intro {
      margin: 0 auto;
      width: 1200px;
      height: 320px;
      border: 1px solid #eeeeee;
      background-color: $introBgColor;
      background: url("../assets/image/intro_box_bg/word-analy-bg.jpg") 100% 100% no-repeat;
      @include flexJA(flex-end, center);
      .word-title {
        font-size: 36px;
        font-weight: 800;
        color:#fff;
        text-align: left;
      }
      .words-txt {
        width: 494px;
        font-size: 16px;
        font-weight: 300;
        color:#fff;
        line-height: 30px;
        text-align: left;
        margin-top: 21px;
        margin-right: 58px;
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
      .origin-pic-box {
        position: relative;
        width: 1200px;
        margin: 10px auto;
        background-color: #ffffff;
        height: 280px;
        border: 1px solid #eeeeee;
        .input-box {
          width: 1160px;
          height: 200px;
          background:#fff;
          border: 1px solid #eee;
          margin: 56px auto 24px;
          .com-txt{
            box-sizing: border-box;
            display: block;
            width: 100%;
            height: 100%;
            padding: 30px 34px 30px 30px;
            resize: none;
            background-color: transparent;
            font-size: 14px;
            color: #666;
            border: none;
            outline:none;
          }
        }
        .origin-tip {
          position: absolute;
          top: 12px;
          left: 121px;
          font-size: 14px;
          color: #999999;
          font-weight: 400;
          .random-btn {
            @include selectNo();
            cursor: pointer;
            color: $primary;
          }
        }
        .words-num {
          position: absolute;
          bottom: 35px;
          right: 31px;
          color:#999;
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
        width: 1200px;
        margin: 10px auto;
        background: #fff;
        border: 1px solid #eee;
        @include flexJA(center, flex-start);
        padding: 49px;
        .result-title{
          text-align: left;
          font-size: 12px;
          font-weight: 300;
          color:#b5b5b5;
        }
        .participle-box {
          width: 938px;
          min-height: 270px;
          border-right: 1px solid #eee;
          padding-right: 45px;
          margin-right: 45px;
          .words-box{
            width: 830px;
            @include flexJA(flex-start, flex-start);
            flex-wrap: wrap;
          }
          .words-content{
            display: inline-block;
            margin: 5px;
            padding: 8px 20px;
            border: 1px solid #eee;
            cursor: pointer;
            .words-title {
              display: block;
              font-size: 14px;
              color: #666;
            }
            .words-txt{
              display: block;
              font-size: 12px;
              color: #b5b5b5;
            }
          }
          .words-active{
            background-color: $primary;
            .words-title,.words-txt {
              color:#fff;
            }
          }
          // 时间选中
          .words-time{
            background-color: #409EFF;
            .words-title,.words-txt {
              color:#fff;
            }
          }
          // 人名选中
          .words-per{
            background-color: #67C23A;
            .words-title,.words-txt {
              color:#fff;
            }
          }
          // 机构名选中
          .words-org{
            background-color: #E6A23C;
            .words-title,.words-txt {
              color:#fff;
            }
          }
          // 地名选中
          .words-loc{
            background-color: #F56C6C;
            .words-title,.words-txt {
              color:#fff;
            }
          }
        }
        .about-words{
          .words-detail {
            position: relative;
            border:1px solid #eee;
            background-color: $introBgColor;
            width: 180px;
            height: 100px;
            padding: 15px 20px;
            text-align: left;
            margin: 10px 0;
            p{
              color:#666;
              font-size: 14px;
            }
            span{
              color:#B5B5B5;
            }
            .left-btn{
              position: absolute;
              top:50%;
              left:-25px;
              transform: translateY(-50%);
            }
            .right-btn{
              position: absolute;
              top:50%;
              right:-25px;
              transform: translateY(-50%);
            }
            .left-btn,.right-btn{
              cursor: pointer;
            }
          }
          .proper-noun{
            margin: 10px 0;
            text-align: left;
            span {
              display: inline-block;
              border: 1px solid #eee;
              width: 80px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              font-size: 14px;
              color: #666;
              margin: 0 10px 10px 0;
              cursor: pointer;
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
}
</style>
