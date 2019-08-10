/* eslint-disable */
const createWebsocket = {
	websocket: null,
	create: () => {
		if ("WebSocket" in window) {
			if (createWebsocket.websocket == null) {
				createWebsocket.websocket = new WebSocket(
					"ws://192.168.1.239:5220"
				)
			}
		} else {
			alert("Not support websocket")
		}
		// 连接发生错误的回调方法
		createWebsocket.websocket.onerror = function() {
			alert("webSocket 服务暂时不可用")
		}

		// // 连接成功建立的回调方法
		// createWebsocket.websocket.onopen = function (event) {
		//    console.log('成功建立连接！')
		//  }

		// 接收到消息的回调方法
		// createWebsocket.websocket.onmessage = function (event) {
		//   console.log(event)
		// //   let record = $.parseJSON(event.data);
		// //   console.log(record);
		// }

		// 连接关闭的回调方法
		createWebsocket.websocket.onclose = function() {
			console.log("已断开连接！")
		}

		// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		createWebsocket.websocket.onbeforeunload = function() {
			createWebsocket.websocket.close()
		}
	},
	closeWebSocket: () => {
		createWebsocket.websocket.close()
	},
	send: message => {
		createWebsocket.websocket.send(message)
	}
}
export default createWebsocket
