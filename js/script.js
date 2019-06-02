let video = document.querySelector('.player .media')
let playButtom = document.querySelector('.player .controlBar .play')
let cursor = document.querySelector('.player .controlBar .process .cursor')
let line = document.querySelector('.player .controlBar .process .line')
let process = document.querySelector('.player .controlBar .process')
let fullScreen = document.querySelector('.player .controlBar .full')
let bar = document.querySelector('.player .controlBar')
let back = document.querySelector('.back')
let tmp = 0
let tmp2 = 0


playButtom.onclick = function () {
	switch (tmp) {
		case 0:
			tmp = 1
			video.play()
			playButtom.style.backgroundImage = 'url("img/pauseOn.png")'
			break
		case 1:
			tmp = 0
			video.pause()
			playButtom.style.backgroundImage = 'url("img/playOn.png")'
			break
	}
}

fullScreen.onclick = function() {
	video.webkitRequestFullScreen()
}

setInterval(function () {
	cursor.style.left = (video.currentTime / video.duration) * process.clientWidth + 'px'
	line.style.width = cursor.style.left
},100)

cursor.onmousedown = function () {
	video.pause()
	playButtom.style.backgroundImage = 'url("img/playOn.png")'
	tmp = 0
	tmp2 = 1
	back.onmousemove = function (event) {
		if(event.pageX <= process.offsetLeft){
			video.currentTime = 0
		}else if(event.pageX >= (process.offsetLeft + process.clientWidth)){
			video.currentTime = video.duration
		}else{
			video.currentTime = video.duration * ((event.pageX - process.offsetLeft) / process.clientWidth)
		}
	}
	cursor.style.boxShadow = '0 0 7px red'
	line.style.boxShadow = '0 0 7px red'
}
back.onmouseup = function () {
	if(tmp2 == 1){
		video.play()
		tmp = 1
		playButtom.style.backgroundImage = 'url("img/pauseOn.png")'
		tmp2 == 0
		back.onmousemove = null
	}
	cursor.style.boxShadow = null
	line.style.boxShadow = null
}

process.onclick = function (event) {
	video.currentTime = video.duration * ((event.pageX - process.offsetLeft) / process.clientWidth)
	console.log(event)
}


