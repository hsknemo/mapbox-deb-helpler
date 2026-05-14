
import { onMessage } from "webext-bridge/background"
console.log('background run')
chrome.runtime.onInstalled.addListener(async (opt) => {
  // Check if reason is install or update. Eg: opt.reason === 'install' // If extension is installed.
  // opt.reason === 'update' // If extension is updated.
  console.log('run')
})

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}

console.info("hello world from background")

onMessage("get-page-window-info", async (message) => {
  console.log("监听进入2")
  // 获取当前页面 window 对象的信息
  const pageInfo = {
    url: window.location.href,
    origin: window.location.origin,
    host: window.location.host,
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    title: document.title,
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    platform: navigator.platform,
    userAgentData: (navigator as any).userAgentData,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    // 获取页面上定义的全局变量
    globalVariables: Object.keys(window)
      .filter((key) => {
        try {
          // 尝试访问属性，过滤掉可能抛出错误的属性
          return typeof (window as any)[key] !== "undefined"
        } catch (e) {
          return false
        }
      })
      .slice(0, 50), // 限制数量避免返回过多数据
  }

  // 发送页面信息回请求方
  return pageInfo
})


export {}
