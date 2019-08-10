export const serviceData = [
  {
    title: "物联网",
    icon: require("assets/image/voice.png"),
    items: [
      {
        subTitle: "IOT server",
        subIcon: require("assets/image/service_item/iot_icon_1.png"),
        subText: "接入自定义和标准物联网协议",
        subUrl: "/iot_server"
      }
    ],
    isFocused: true,
    url: ""
  },
  {
    title: "视频技术",
    icon: require("assets/image/video.png"),
    items: [
      {
        subTitle: "Sip协议接入",
        subIcon: require("assets/image/service_item/video_icon_1.png"),
        subText: "接入支持Sip国标协议的视频",
        subUrl: "/sip_protocol"
      },
      {
        subTitle: "视频会议",
        subIcon: require("assets/image/service_item/video_icon_2.png"),
        subText: "多人视频会议，支持接入摄像头等视频流",
        subUrl: "/video_meeting"
      },
      {
        subTitle: "视频存储",
        subIcon: require("assets/image/service_item/video_icon_3.png"),
        subText: "接入摄像头视频，存储为任意格式",
        subUrl: "/video_storage"
      },
      {
        subTitle: "视频人脸检索",
        subIcon: require("assets/image/service_item/video_icon_4.png"),
        subText: "视频中人像检索",
        subUrl: "/video_face_check"
      },
      {
        subTitle: "视频中车牌搜索",
        subIcon: require("assets/image/service_item/video_icon_5.png"),
        subText: "视频中准确检索车牌",
        subUrl: "/video_carnum_check"
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "图像技术",
    icon: require("assets/image/picture.png"),
    items: [
      {
        subTitle: "图像增强",
        subIcon: require("assets/image/service_item/img_icon_1.png"),
        subText: "图像增强",
        subUrl: "/image_enhance"
      },
      {
        subTitle: "人脸检测",
        subIcon: require("assets/image/service_item/img_icon_1.png"),
        subText: "人脸关键点检测，框定人脸",
        subUrl: "/face_detect"
      },
      {
        subTitle: "人脸搜索",
        subIcon: require("assets/image/service_item/img_icon_2.png"),
        subText: "在指定的人脸库中查找相似的人脸",
        subUrl: "/face_search"
      },
      {
        subTitle: "人脸比对",
        subIcon: require("assets/image/service_item/img_icon_3.png"),
        subText: "对比人脸的相似度",
        subUrl: "/face_compare"
      },
      {
        subTitle: "车牌识别",
        subIcon: require("assets/image/service_item/img_icon_4.png"),
        subText: "检测并识别车牌号",
        subUrl: "/vehicleplaterec"
      },
      {
        subTitle: "发票识别",
        subIcon: require("assets/image/service_item/img_icon_5.png"),
        subText: "对增值税普票或专票所有30个字段进行结构化识别",
        subUrl: "/invoice_check"
      },
      {
        subTitle: "安全帽检测",
        subIcon: require("assets/image/service_item/img_icon_6.png"),
        subText: "识别并检测人员是否佩戴安全帽",
        subUrl: "/safety_hat_moni"
      },
      {
        subTitle: "图像中的文本识别",
        subIcon: require("assets/image/service_item/img_icon_7.png"),
        subText: "检测并识别图像中的文字",
        subUrl: "/img_text_check"
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "语音/文本技术",
    icon: require("assets/image/text.png"),
    items: [
      {
        subTitle: "语音识别",
        subIcon: require("assets/image/service_item/voice_icon_1.png"),
        subText: "语音采集，识别，转文本",
        subUrl: "/voice_rec"
      },
      {
        subTitle: "敏感词检测",
        subIcon: require("assets/image/service_item/text_icon_1.png"),
        subText: "检测敏感词汇，如黄赌毒等，净化网络环境",
        subUrl: "/text_detection"
      },
      {
        subTitle: "词法分析",
        subIcon: require("assets/image/service_item/text_icon_2.png"),
        subText: "对文本进行分词、词性标注、命名实体识别",
        subUrl: "/word_analysis"
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "大屏展示",
    icon: require("assets/image/screen.png"),
    items: [
      {
        subTitle: "可视化运维",
        subIcon: require("assets/image/service_item/screen_icon_1.png"),
        subText: "数据大屏可视化展示",
        subUrl: "/screen_show"
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "图纸",
    icon: require("assets/image/cad.png"),
    items: [
      {
        subTitle: "图纸监测",
        subIcon: require("assets/image/service_item/cad_icon_1.png"),
        subText: "检查文件是否为图纸",
        subUrl: "/drawing_monitor"
      },
      {
        subTitle: "图纸成册",
        subIcon: require("assets/image/service_item/cad_icon_2.png"),
        subText: "自动成册公路设计行业的图纸",
        subUrl: "/draw_to_book"
      },
      {
        subTitle: "文件转化",
        subIcon: require("assets/image/service_item/cad_icon_6.png"),
        subText: "支持doc，excel，pdf, png , dwg 互转",
        subUrl: "/file_conversion"
      },
      {
        subTitle: "云盘",
        subIcon: require("assets/image/service_item/cad_icon_7.png"),
        subText: "文件的网络备份、同步和分享服务",
        subUrl: "/cloud_disc"
      },
      {
        subTitle: "版本管理",
        subIcon: require("assets/image/service_item/cad_icon_10.png"),
        subText: "图纸版本在线管理",
        subUrl: ""
      },
      {
        subTitle: "电子白板",
        subIcon: require("assets/image/service_item/cad_icon_3.png"),
        subText:
          "多人群聊，支持文档转码、轨迹实时同步等多种功能的多人在线互动白板",
        subUrl: "/white_board"
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "建模技术",
    icon: require("assets/image/bim.png"),
    items: [
      {
        subTitle: "BIM大模型展示",
        subIcon: require("assets/image/service_item/cad_icon_4.png"),
        subText: "快速展示BIM模型",
        subUrl: "/bim_model"
      },
      {
        subTitle: "BIM建模",
        subIcon: require("assets/image/service_item/cad_icon_5.png"),
        subText: "针对公路行业的BIM建模及咨询服务",
        subUrl: "/bim_modeling"
      },
      {
        subTitle: "三维建模",
        subIcon: require("assets/image/service_item/bim_icon_3.png"),
        subText: "三维模型，尽在眼前",
        subUrl: "http://192.168.3.244:10000/",
        open: true
      }
    ],
    isFocused: false,
    url: ""
  },
  {
    title: "区块链应用",
    icon: require("assets/image/block_chain.png"),
    items: [
      {
        subTitle: "中达签",
        subIcon: require("assets/image/service_item/bim_icon_4.png"),
        subText: "电子签章，安全便捷",
        subUrl: "http://192.168.9.12:8080",
        open: true
      },
      {
        subTitle: "区块链浏览器",
        subIcon: require("assets/image/service_item/bc_icon_2.png"),
        subText: "",
        subUrl: "http://192.168.11.111:8081",
        open: true
      }
    ],
    isFocused: true,
    url: ""
  }
];
