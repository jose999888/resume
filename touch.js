// 阻止双指放大
document.addEventListener('gesturestart', (event) => {
  event.preventDefault()
}, false)

// 阻止双击放大
document.addEventListener('touchstart', (event) => {
  event.preventDefault()
})
let lastTouchEnd = 0
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime()
  if (now - lastTouchEnd <= 300) {
    event.preventDefault()
  }
  lastTouchEnd = now
}, false)
