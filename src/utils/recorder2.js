/* eslint-disable */
(function (window) {
    //兼容
    window.URL = window.URL || window.webkitURL;
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {

            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }
    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var HZRecorder = function (stream, config) {
        config = config || {};
        config.sampleBits = config.sampleBits || 8; //采样数位 8, 16
        config.sampleRate = config.sampleRate || (44100 / 6); //采样率(1/6 44100)
        //console.log(config);
        //创建一个音频环境对象
        var audioContext = new (window.AudioContext || window.webkitAudioContext)()
        // audioContext = window.AudioContext || window.webkitAudioContext;
        var context = audioContext;

        //将声音输入这个对像
        var audioInput = context.createMediaStreamSource(stream);

        //设置音量节点
        var volume = context.createGain();
        audioInput.connect(volume);

        //创建缓存，用来缓存声音
        var bufferSize = 4096;

        // 创建声音的缓存节点，createScriptProcessor方法的
        // 第二个和第三个参数指的是输入和输出都是双声道。
        var recorder = context.createScriptProcessor(bufferSize, 2, 2);

        var transSpeed = 0;
        var dataSize = 0;

        var audioData = {
            size: 0 //录音文件长度
                ,
            buffer: [] //录音缓存
                ,
            inputSampleRate: context.sampleRate //输入采样率
                ,
            inputSampleBits: 16 //输入采样数位 8, 16
                ,
            outputSampleRate: config.sampleRate //输出采样率
                ,
            oututSampleBits: config.sampleBits //输出采样数位 8, 16
                ,
            input: function (data) {
                this.buffer.push(new Float32Array(data));
                this.size += data.length;
            },
            compress: function () { //合并压缩
                //合并
                var data = new Float32Array(this.size);
                var offset = 0;
                for (var i = 0; i < this.buffer.length; i++) {
                    data.set(this.buffer[i], offset);
                    offset += this.buffer[i].length;
                }
                //压缩
                var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                var length = data.length / compression;
                var result = new Float32Array(length);
                var index = 0,
                    j = 0;
                while (index < length) {
                    result[index] = data[j];
                    j += compression;
                    index++;
                }
                return result;
            },
            encodeWAV: function () {
                var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                var bytes = this.compress();
                var dataLength = bytes.length * (sampleBits / 8);
                var buffer = new ArrayBuffer(44 + dataLength);
                var data = new DataView(buffer);

                var channelCount = 1; //单声道
                var offset = 0;

                var writeString = function (str) {
                    for (var i = 0; i < str.length; i++) {
                        data.setUint8(offset + i, str.charCodeAt(i));
                    }
                };

                // 资源交换文件标识符 
                writeString('RIFF');
                offset += 4;
                // 下个地址开始到文件尾总字节数,即文件大小-8 
                data.setUint32(offset, 36 + dataLength, true);
                offset += 4;
                // WAV文件标志
                writeString('WAVE');
                offset += 4;
                // 波形格式标志 
                writeString('fmt ');
                offset += 4;
                // 过滤字节,一般为 0x10 = 16 
                data.setUint32(offset, 16, true);
                offset += 4;
                // 格式类别 (PCM形式采样数据) 
                data.setUint16(offset, 1, true);
                offset += 2;
                // 通道数 
                data.setUint16(offset, channelCount, true);
                offset += 2;
                // 采样率,每秒样本数,表示每个通道的播放速度 
                data.setUint32(offset, sampleRate, true);
                offset += 4;
                // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
                data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
                transSpeed = channelCount * sampleRate * (sampleBits / 8)
                offset += 4;
                // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
                data.setUint16(offset, channelCount * (sampleBits / 8), true);
                offset += 2;
                // 每样本数据位数 
                data.setUint16(offset, sampleBits, true);
                offset += 2;
                // 数据标识符 
                writeString('data');
                offset += 4;
                // 采样数据总数,即数据总大小-44 
                data.setUint32(offset, dataLength, true);
                offset += 4;
                dataSize = dataLength
                // 写入采样数据 
                if (sampleBits === 8) {
                    for (var i = 0; i < bytes.length; i++, offset++) {
                        var s = Math.max(-1, Math.min(1, bytes[i]));
                        var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                        val = parseInt(255 / (65535 / (val + 32768)));
                        data.setInt8(offset, val, true);
                    }
                } else {
                    for (var i = 0; i < bytes.length; i++, offset += 2) {
                        var s = Math.max(-1, Math.min(1, bytes[i]));
                        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
                }
                //audioData.buffer = [];
                return new Blob([data], {
                    type: 'audio/wav'
                });
            }
        };

        //开始录音
        this.start = function () {
            audioInput.connect(recorder);
            recorder.connect(context.destination);
        };

        //停止
        this.stop = function () {
            if (context.state != 'closed') { //闵亚楠添加
                context.close().then(function () {});
            }
            recorder.disconnect();
            // console.log(context);
        };

        this.audioDuration = function(){ //李苗苗添加，获取音频时长
            return (dataSize/transSpeed).toFixed(1)
        };

        //获取音频文件
        this.getBlob = function () {
            this.stop();
            this.audioDuration();
            return audioData.encodeWAV();

        };

        //回放
        this.play = function (audio) {
            audio.src = window.URL.createObjectURL(this.getBlob());
        };

        //上传
        this.upload = function (url, callback) {
            var fd = new FormData();
            fd.append('audioData', this.getBlob());
            var xhr = new XMLHttpRequest();
            if (callback) {
                xhr.upload.addEventListener('progress', function (e) {
                    callback('uploading', e);
                }, false);
                xhr.addEventListener('load', function (e) {
                    callback('ok', e);
                }, false);
                xhr.addEventListener('error', function (e) {
                    callback('error', e);
                }, false);
                xhr.addEventListener('abort', function (e) {
                    callback('cancel', e);
                }, false);
            }
            xhr.open('POST', url);
            xhr.send(fd);
        };

        //音频采集
        recorder.onaudioprocess = function (e) {
            audioData.input(e.inputBuffer.getChannelData(0));
            //record(e.inputBuffer.getChannelData(0));
        };
    };
    //抛出异常
    HZRecorder.throwError = function (message) {
        throw new function () {
            this.toString = function () {
                return message;
            };
        };
    };
    //是否支持录音
    HZRecorder.canRecording = (navigator.mediaDevices.getUserMedia != null);
    //获取录音机
    HZRecorder.get = function (callback, config) {
        if (callback) {
            var promise = navigator.mediaDevices.getUserMedia({
                audio: true
            }) //只启用音频
            promise.then(function (stream) {
                var rec = new HZRecorder(stream, config);
                callback(rec);
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
                alert(err.name + ": " + err.message);
                });
        }
    };
    window.HZRecorder = HZRecorder;

})(window);