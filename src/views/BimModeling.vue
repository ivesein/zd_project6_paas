<template>
  <div class="bim-modeling">
    <CommonHeader :headerInfo="headerInfo"></CommonHeader>
    <!-- 建模服务帮助 -->
    <div class="help-info-box">
      <div class="help-info-content">
        <img
          src="../assets/image/pro_demo/help-info-img.png"
          alt=""
          class="content-img"
        />
        <div class="help-info">
          <span class="help-info-title">公路BIM建模服务帮助</span>
          <div class="process-box">
            <div class="process-steps-box">
              <div class="process-steps">
                <span class="steps-text">
                  前期调研
                </span>
              </div>
            </div>
            <div class="arrow-box">
              <div class="arrow-left"></div>
              <div class="arrow-right"></div>
            </div>
            <div class="process-steps-box">
              <div class="process-steps">
                <span class="steps-text">
                  BIM标准建立
                </span>
              </div>
              <div class="steps-bottom-box">
                <div class="vertical-line"></div>
                <div class="text-info-box">
                  <div class="info-item">
                    <div class="line"></div>
                    <span class="text">建模标准</span>
                  </div>
                  <div class="info-item">
                    <div class="line"></div>
                    <span class="text">应用标准</span>
                  </div>
                  <div class="info-item">
                    <div class="line"></div>
                    <span class="text">协同标准</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="arrow-box">
              <div class="arrow-left"></div>
              <div class="arrow-right"></div>
            </div>
            <div class="process-steps-box">
              <div class="process-steps">
                <span class="steps-text">
                  BIM模型创建
                </span>
              </div>
            </div>
            <div class="arrow-box">
              <div class="arrow-left"></div>
              <div class="arrow-right"></div>
            </div>
            <div class="process-steps-box">
              <div class="process-steps">
                <span class="steps-text">
                  Bim模型维护
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 技术服务咨询 -->
    <div class="tec-consultatio-box">
      <div class="tec-info-content">
        <div class="content-left">
          <span class="content-title">BIM技术咨询服务</span>
          <div class="tec-info-details">
            <p class="tec-info-subtitle">
              BIM服务从设计阶段开始，到施工建造的各个阶段有上百个应用点，委托方根据需要选择需要实
              现的应用点即可。中达BIM技术咨询服务主要工作包括：
            </p>
            <div class="tec-info-items">
              <p
                class="tec-info-item"
                v-for="(item, index) in tecInfos"
                :key="index"
              >
                {{ index > 8 ? item : "&nbsp;" + item }}
              </p>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="img-box">
            <img
              src="../assets/image/pro_demo/consultation-img.png"
              alt=""
              class="content-right-img"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from "../components/home/Footer";
import CommonHeader from "components/common/CommonHeader";
import { BimModelingHeaderInfo } from "utils/headerData.js";
export default {
  data() {
    return {
      headerInfo: BimModelingHeaderInfo,
      tecInfos: [
        " 1) BIM技术项目实施方案策划；",
        " 2) BIM标准建设及应用培训；",
        " 3) 创建BIM建模；",
        " 4) 工程量计算；",
        " 5) 图纸设计问题梳理；",
        " 6) 碰撞检查及建筑物内部漫游；",
        " 7) BIM模型上传及维护；",
        " 8) 基于BIM的深化设计、管线综合；",
        " 9) 虚拟施工指导；",
        "10) 资源计划、多算对比；",
        "11) 基于BIM的质量、安全协同管理；",
        "12) 建立基于BIM的工程档案资料库。"

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
.bim-modeling {
  width: 100%;
  // overflow-y: scroll;

  .help-info-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 368px;
    background: $white;

    .help-info-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 1200px;
      height: 100%;
      padding: 40px 0;

      .content-img {
        width: 454px;
        height: 296px;
        border: 1px dashed #999;
      }

      .help-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex: 1;
        height: 100%;
        padding-left: 42px;
        padding-top: 27px;

        .help-info-title {
          font-size: 24px;
          color: $primaryTitle;
        }

        .process-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          flex: 1;
          padding-top: 34px;

          .process-steps-box {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 143px;
            height: 100%;

            .process-steps {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 43px;
              background: $primary;

              .steps-text {
                font-size: 17px;
                color: $white;
              }
            }

            .steps-bottom-box {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              width: 100%;
              flex: 1;

              .vertical-line {
                width: 29px;
                height: 111px;
                border-right: 1px solid $primary;
              }

              .text-info-box {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                flex: 1;

                .info-item {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex: 1;
                  height: 16px;
                  margin-top: 16px;

                  .line {
                    width: 20px;
                    height: 0;
                    border-bottom: 1px solid $primary;
                  }

                  .text {
                    font-size: 17px;
                    color: #000;
                    margin-left: 5px;
                  }
                }
              }
            }
          }

          .arrow-box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            align-self: flex-start;
            margin: 15px 6px 15px 9px;
            width: 20px;
            height: 14px;

            .arrow-left {
              width: 14px;
              height: 8px;
              background: #76a2ff;
            }

            .arrow-right {
              width: 0;
              height: 0;
              border-top: 6px solid transparent;
              border-right: 6px solid transparent;
              border-left: 6px solid #76a2ff;
              border-bottom: 6px solid transparent;
            }
          }
        }
      }
    }
  }
  // 技术服务咨询
  .tec-consultatio-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 418px;
    background: #e8faff;

    .tec-info-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 1200px;
      height: 100%;

      .content-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 686px;
        height: 100%;

        .content-title {
          font-size: 24px;
          color: $primaryTitle;
          font-weight: 800;
          line-height: 102px;
          letter-spacing: 1px;
        }

        .tec-info-details {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          height: 228px;

          .tec-info-subtitle {
            width: 100%;
            font-size: 16px;
            color: #666;
            text-align: left;
            line-height: 26px;
          }

          .tec-info-items {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            width: 100%;

            .tec-info-item {
              width: 50%;
              font-size: 16px;
              color: #666;
              text-align: left;
              line-height: 26px;
            }
          }
        }
      }

      .content-right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;
        padding-left: 48px;

        .img-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 429px;
          height: 337px;
          border: 1px dashed #999;
        }
      }
    }
  }
}
</style>
