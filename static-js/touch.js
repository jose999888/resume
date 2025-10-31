document.addEventListener('gesturestart', (e) => {
  e.preventDefault() // iOS Safari
}, { passive: false })

let lastTouchEnd = 0

document.addEventListener('touchstart', (e) => {
  // 只有多指触控才阻止
  if (e.touches.length > 1) {
    e.preventDefault()
  }
}, { passive: false })

document.addEventListener('touchend', (e) => {
  const now = Date.now()

  // 双击缩放
  if (e.touches.length === 0 && (now - lastTouchEnd <= 300)) {
    e.preventDefault()
  }

  lastTouchEnd = now
}, { passive: false })
