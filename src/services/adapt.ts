export default function () {
  var doc: any = window.document
  var docEle: any = doc.documentElement
  var viewport: any = doc.querySelector('meta[name=viewport]')
  var scale: number = 0
  var dpr: number = 0
  var m: any

  if (viewport) {
    // 根据视口配置设置缩放比例，而不是自适应。
    m = viewport.getAttribute('content').match(/initial-scale=([\d.]+)/)
    if (m) {
      scale = +m[1]
      dpr = ~~(1 / scale)
    }
  } else {
    m = window.navigator.userAgent.match(/iPhone|iPod|iPad/)
    if (m) {
      dpr = ~~window.devicePixelRatio
      dpr = dpr >= 3 ? 3 : dpr
      dpr = dpr <= 1 ? 1 : dpr
    } else {
      dpr = 1
    }
    scale = 1 / dpr

    viewport = doc.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', ['initial-scale', 'maximum-scale', 'minimum-scale', 'user-scalable=no'].join('=' + scale + ', '))

    if (docEle.firstElementChild) {
      docEle.firstElementChild.appendChild(viewport)
      viewport = null
    }
  }

  var tid: any = null
  var rem: number = 12
  var forceRefresh = function () {
    // 刷新 dpr 对应的 rem 字号大小
    var w = docEle.getBoundingClientRect().width
    if (w / dpr > 540) {
      w = 540 * dpr
    }
    rem = w / 375 * 100
    docEle.style.fontSize = rem + 'px';
    (window as any).viewportHeight = Math.round(docEle.clientHeight / rem * 1000) / 1000
  }
  var refresh = function () {
    clearTimeout(tid)
    tid = setTimeout(forceRefresh, 300)
  }

  window.addEventListener('resize', refresh, false)
  window.addEventListener('pageshow', refresh, false)

  forceRefresh()
  docEle.setAttribute('data-dpr', dpr)
}
