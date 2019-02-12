// 计算根节点1rem的值
// (function(doc, win) {
//     var docEl = doc.documentElement,
//         // recalF,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             // 按照效果图尺寸及方便计算的规则，确认1rem基本字号大小。此处为1rem=20px
//             docEl.style.fontSize = parseInt(clientWidth / 1920) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

var deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
  window.addEventListener('resize', function () {
      setHtmlFontSize()
  }, false)
}
function setHtmlFontSize () {
  // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
    deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.2 + 'px !important'
}
