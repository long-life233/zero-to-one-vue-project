import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { sayHi } from './utils/say'
import './assets/css/style.css'
import './assets/css/iconfont.css'

import loveImg from './assets/img/love.png'

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

sayHi()

function component () {
  const box = document.createElement('div')

  const elment = document.createElement('h1')
  elment.innerHTML = 'h1'
  elment.classList.add('hello')
  box.appendChild(elment)

  const div = document.createElement('div')
  div.classList.add('iconfont')
  div.classList.add('icon-dianhuatianchong')
  box.appendChild(div)

  // 将图像添加到我们已经存在的 div 中。
  const img = new Image()
  img.src = loveImg
  box.appendChild(img)

  return box
}

document.body.appendChild(component())
