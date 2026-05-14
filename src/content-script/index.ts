import { onMessage } from "webext-bridge/content-script"
  // 监听来自 popup 或其他上下文的消息
onMessage("get-page-window-info", async (message) => {
  console.log(message, "监听进入")
  // 获取当前页面 window 对象的信息
  const pageInfo = {
    varible:  window[message?.data?.name],
  }
  return pageInfo
})

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}

console.info("content-script running....")
