// 各服务详细页面头部信息  以 export const yourPageHeaderInfo={}形式定义 导出
/* eslint-disable */
export const IotServerHeaderInfo = {
	title: "IoT SERVER",
	subTitle:
		"支持接入MQTT、CoAP以及JT808等标准协议，同时支持用户自定义协议。平台提供消息订阅功能，并提供API接口，以供用户获取数据",
	headerBgImg: require("assets/image/header/iot-server-header.jpg")
}
export const invoiceCheckHeaderInfo = {
	title: "发票识别",
	subTitle:
		"支持对增值税普票或专票所有30个字段进行结构化识别，包括发票基本信息、销售方及购买方信息、商品信息、价税信息等，其中四要素识别准确率超过99.9%",
	// headerBgImg: require("assets/image/invoice_check_bg.jpg")
	headerBgImg: require("assets/image/header/invoice-header.jpg")
}
export const vehiclePlateHeaderInfo = {
	title: "车牌识别",
	subTitle: "支持对中国大陆机动车车牌的识别，包括地域编号和车牌号",
	headerBgImg: require("assets/image/header/vehicle-plate-header.jpg")
}
export const faceDetectHeaderInfo = {
	title: "人脸检测",
	subTitle:
		"快速检测人脸并返回人脸框位置、定位五官与轮廓关键点准确识别多种人脸属性",
	headerBgImg: require("assets/image/header/face-detect-header.jpg")
}
export const faceSearchHeaderInfo = {
	title: "人脸搜索",
	subTitle:
		"给定一张照片，与指定人脸库中的N个人脸进行比对，找出最相似的一张脸或多张人脸。 根据待识别人脸与现有人脸库中的人脸匹配程度，返回用户信息和匹配度，即1：N人脸检索。可用于用户身份识别、身份验证相关场景。",
	headerBgImg: require("assets/image/header/face-search-header.jpg")
}
export const videoFaceCheckHeaderInfo = {
	title: "视频人脸检索",
	subTitle:
		"监测视频中出现的所有人像，是否出现目标人像，以及目标人像在视频中出现的次数，出现的位置",
	headerBgImg: require("assets/image/header/video-face-header.jpg")
}
export const videoCarNumCheckHeaderInfo = {
	title: "视频中的车牌识别",
	subTitle: "支持检测视频中出现的车牌，以及该车牌在视频中出现的次数和位置",
	headerBgImg: require("assets/image/header/vehicle-plate-header.jpg")
}
export const videoStorageHeaderInfo = {
	title: "视频存储",
	subTitle:
		"接入视频并存储，以任意格式存储到指定路径，如存储海康摄像头的视频流，大华摄像头的视频流等",
	headerBgImg: require("assets/image/header/video-storage-header.jpg")
}
export const voiceRecHeaderInfo = {
	title: "语音识别",
	subTitle:
		"为您提供高精度的语音识别服务，领先的自然语言处理技术，支持多场景智能语音交互",
	headerBgImg: require("assets/image/header/voice-rec-header.jpg")
}
export const sipProtocolHeaderInfo = {
	title: "SIP国标协议接入",
	subTitle: "接入支持Sip国标协议的视频",
	headerBgImg: require("assets/image/header/sip-agree-header.jpg")
}
export const drawingMonitorHeaderInfo = {
	title: "图纸监测",
	subTitle: "检查文件是否为图纸，如公路设计行业的图表",
	headerBgImg: require("assets/image/header/paper-monitor-header.jpg")
}
export const safetyHatMoniHeaderInfo = {
	title: "安全帽监测",
	subTitle: "在施工场景下，监测人员是否按照要求佩戴安全帽，并做安全预警",
	headerBgImg: require("assets/image/header/safety-cap-header.jpg")
}
export const BimModelHeaderInfo = {
	title: "BIM模型展示",
	subTitle: "支持在线展示 obj IFC 等BIM模型，360°查看模型",
	headerBgImg: require("assets/image/header/model-show-header.jpg")
}
export const BimModelingHeaderInfo = {
	title: "公路行业BIM模型服务",
	subTitle: "我们提供 针对公路行业的BIM建模 及 咨询服务",
	headerBgImg: require("assets/image/header/bim-model-header.jpg")
}
export const FileConversionHeaderInfo = {
	title: "文件转换服务",
	subTitle: "doc，excel，pdf, jpg , dwg 互转",
	headerBgImg: require("assets/image/header/file-trans-header.jpg")
}
export const ImgTextCheckHeaderInfo = {
	title: "图像中的文本识别",
	subTitle: "用图像识别技术，检测图像中的文本，并识别出文本",
	headerBgImg: require("assets/image/header/text-rec-header.jpg")
}
export const WordAnalysisHeaderInfo = {
	title: "词法分析",
	subTitle:
		"基于大数据和用户行为的分词、词性标注、命名实体识别，定位基本语言元素，消除歧义，支撑自然语言的准确理解",
	headerBgImg: require("assets/image/header/word-rec-header.jpg")
}
export const TextDetectionHeaderInfo = {
	title: "敏感词汇监测",
	subTitle:
		"检测识别文本中夹杂的色情、推广、辱骂、违禁违法等垃圾内容，净化网络环境",
	headerBgImg: require("assets/image/header/text-detection-header.jpg")
}
export const FaceCompareHeaderInfo = {
	title: "人脸比对",
	subTitle: "对比两张人脸的相似度",
	headerBgImg: require("assets/image/header/face-contrast-header.jpg")
}
export const VideoMeetingHeaderInfo = {
	title: "视频会议",
	subTitle:
		"基于浏览器的视频会议系统，低延时（仅有3秒延时），跨平台，5分钟即可接入到自己的平台，支持H264硬件编码",
	headerBgImg: require("assets/image/header/video-meeting-header.jpg")
}
export const DrawToBookHeaderInfo = {
	title: "图纸成册",
	subTitle:
		"自动将公路设计行业的设计图纸的成册出版，自动生成封皮扉页，目录页，篇章页",
	headerBgImg: require("assets/image/header/draw-book-header.jpg")
}
export const WhiteBoardHeaderInfo = {
	title: "电子白板",
	subTitle:
		"支持多人群聊，白板标注，多人实时同步标注，记录标注，达到共享屏幕的效果",
	headerBgImg: require("assets/image/header/white-board-header.jpg")
}
export const CloudDiscHeaderInfo = {
	title: "云盘",
	subTitle:
		"为您提供文件的网络备份、同步和分享服务。空间大、速度快、安全稳固",
	headerBgImg: require("assets/image/header/cloud-disc-header.jpg")
}
export const ScreenShowHeaderInfo = {
	title: "大屏展示",
	subTitle:
		"数据可视化，可以增强数据的呈现效果，方便用户以更加直观的方式观察数据",
	headerBgImg: require("assets/image/header/screen-show-header.jpg")
}
export const ImageEnhanceHeaderInfo = {
	title: "图像增强",
	subTitle:
		"数据可视化，可以增强数据的呈现效果，方便用户以更加直观的方式观察数据",
	headerBgImg: require("assets/image/header/image-enh-header.jpg")
}
