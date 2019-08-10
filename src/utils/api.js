import axios from "axios";
let ifProEnv = false; //true为正式  //false 为平时开发
// filePath 路径前缀修正
export const filePathPreFix = ifProEnv
  ? "H:/ns_light2/"
  : "F:/code_clone/ns_light2/";

// webSocket url
const wsUrl = ifProEnv ? "ws://192.168.3.244:5220" : "ws://192.168.1.239:5220";

// 文本敏感词监测接口
export const textDectection = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://118.190.203.202:5001";
  } else {
    url = "http://118.190.203.202:5001";
  }
  return axios.post(url + "/yuyi/text_review", param);
};

// 词法分析接口
export const wordAnalysis = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://118.190.203.202:5001";
  } else {
    url = "http://118.190.203.202:5001";
  }
  return axios.post(url + "/yuyi/text_segment", param);
};

// 语音识别接口
export const voiceRec = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://www.xnsjy.cn:8086";
  } else {
    url = "http://www.xnsjy.cn:8086";
  }
  return axios.post(url + "/api/files_upload", param);
};

//上传车牌图片接口
export const upLoadImg = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.3.244:5200"; //薛若梅本地  http://192.168.1.239:5200
  } else {
    url = "http://192.168.1.239:5200";
  }
  return axios.post(url + "/api/file/create_plate", param);
};

/**
 * @class
 * @constructor
 * @param {
 *  url:websocket 地址
 *  cb:获取onmessaeg数据
 * }
 * @method
 * @init 初始化websocket
 * @send 发送参数
 * @close 断开websocket连接
 */
export class Ws {
  constructor(obj) {
    this.url = obj.url || wsUrl;
    this.socket = null;
    this.cb = obj.cb;
  }
  init() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
      // 检测浏览器支持
      console.error("错误: 浏览器不支持websocket");
      return;
    }
    this.socket = new WebSocket(this.url);
    console.log("webSocket>>>", this.socket);
    this.socket.onopen = () => {
      console.log("connect success!");
    };
    this.socket.onmessage = e => {
      this.cb(JSON.parse(e.data));
      // resolve(JSON.parse(e.data));
    };
    this.socket.onclose = () => {
      console.log("websocket closed!");
    };
    this.socket.onerror = e => {
      console.log("websocket error!", e);
    };
  }
  send(data) {
    if (this.socket.readyState === this.socket.OPEN) {
      // 若是ws开启状态
      this.socket.send(JSON.stringify(data));
    } else if (this.socket.readyState === this.socket.CONNECTING) {
      // 若是 正在开启状态，则等待1s后重新调用
      setTimeout(() => {
        this.send(data);
      }, 1000);
    } else {
      // 若未开启 ，则等待1s后重新调用
      setTimeout(() => {
        this.send(data);
      }, 1000);
    }
  }
  close() {
    this.socket.close();
  }
}

//上传人脸图片接口
export const upLoadFaceImg = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.3.244:5200"; //薛若梅本地
  } else {
    url = "http://192.168.1.239:5200";
  }
  return axios.post(url + "/api/file/create_face", param);
};

//视频人脸识别接口
export const videoFaceCheck = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.3.244:5200"; //薛若梅本地
  } else {
    url = "http://192.168.1.239:5200";
  }
  return axios.post(url + "/api/ai_create", param);
};

//图纸检测 图纸上传接口
export const drawingUpload = (type, param) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.post(url + "/cad_table/upload/" + type, param, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//图纸检测 开始检测接口
export const drawingCheck = (type, file_name) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.get(url + "/cad_table/check/" + type + "/" + file_name, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//上传图像增强图片接口
export const upLoadEnhaceImg = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.3.244:5200"; //薛若梅本地
  } else {
    url = "http://192.168.1.239:5200";
  }
  return axios.post(url + "/api/file/create_image", param);
};

//上传待检测文件到安全帽检测文件上传接口
export const helmetUpload = (type, param) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.post(url + "/helmet/upload/" + type, param, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//开始安全帽文件检测
export const helmetCheck = (type, file_name) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.get(url + "/helmet/detect/" + type + "/" + file_name, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//安全帽检测图片展示接口
export const helmetShow = () => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.get(url + "/helmet/show", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

// 图像文本识别上传图像接口
export const imgTextCheckUpload = (type, param) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.post(url + "/text/upload/" + type, param, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//开始图像中文本识别接口
export const ImgTextCheck = (type, file_name) => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.get(url + "/text/detect/" + type + "/" + file_name, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

//图像文本检测识别过的图片展示接口
export const imgTextCheckShow = () => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.111.209:5000";
  } else {
    url = "http://192.168.111.209:5070";
  }
  return axios.get(url + "/text/show", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

// 人脸比对接口
export const faceCompare = param => {
  var url = "";
  if (ifProEnv) {
    url = "http://192.168.3.244:5200";
  } else {
    url = "http://192.168.1.239:5200";
  }
  return axios.post(url + "/api/ai/comparison", param);
};
