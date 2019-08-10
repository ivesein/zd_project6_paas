//上传图片文件生成预览url
export const getObjectURL = file => {
  var url = null;
  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};

//上传文件判断是否为图片类型
export const imgTypeCheck = file => {
  return file.type.indexOf("image") != -1 ? true : false;
};

//上传文件判断是否为视频类型
export const videoTypeCheck = file => {
  return file.type.indexOf("video") != -1 ? true : false;
};

//截取上传的视频文件的第一帧
export const videoShot = (url, cb) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement("VIDEO");
    video.src = url;
    video.width = 713;
    video.heigth = 460;
    video.addEventListener("loadeddata", () => {
      let scale = 0.8;
      let canvas = document.createElement("canvas"); // 创建一个画布
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画
      let resUrl = canvas.toDataURL("image/png");
      resolve(resUrl);
      if (cb) {
        cb(resUrl);
      }
    });
  });
};

//安全帽检测接口上传文件类型检测
export const helmetUploadFileType = file => {
  let name = file.name;
  let regPng = /.png$/gi;
  let regJpg = /.jpg$/gi;
  let regMp4 = /.mp4$/gi;
  if (regPng.test(name)) {
    return "png";
  }
  if (regJpg.test(name)) {
    return "jpg";
  }
  if (regMp4.test(name)) {
    return "mp4";
  }
  return "文件类型不正确";
};

//图纸检测 上传文件类型判断
export const fileTypeCheck = file => {
  let name = file.name;
  let regPng = /.png$/gi;
  let regPdf = /.pdf$/gi;
  let regDoc = /.doc$/gi;
  let regDocx = /.docx$/gi;

  if (regPng.test(name)) {
    return "png";
  }
  if (regPdf.test(name)) {
    return "pdf";
  }
  if (regDoc.test(name)) {
    return "doc";
  }
  if (regDocx.test(name)) {
    return "docx";
  }
  return "文件类型不正确";
};

//图像文本识别 上传文件类型判断
export const imgTextCheckFileType = file => {
  let name = file.name;
  let regPng = /.png$/gi;
  let regPdf = /.jpg$/gi;

  if (regPng.test(name)) {
    return "png";
  }
  if (regPdf.test(name)) {
    return "jpg";
  }
  return "文件类型不正确";
};
