let progress = document.querySelector('.progress')
progress.style.width = '0px'
let progressBarWidth = 0

let timerId = setInterval(() => {
    progress.style.display = 'block'
    progress.style.width = `${progressBarWidth}px`
    progressBarWidth = progressBarWidth + 5
    if (progressBarWidth === 430) {
        progress.style.display = 'none'
        clearInterval(timerId)     
    }
}, -3000)





