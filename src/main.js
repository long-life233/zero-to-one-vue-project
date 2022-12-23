import './assets/css/style.css'
import './assets/css/iconfont.css'

import loveImg from './assets/img/love.png'
import(/* webpackPreload: true *//* webpackChunkName:"preload" */'./utils/testPreload')

if (module.hot) {
  module.hot.accept('./utils/say')
}

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
  // img.onclick = sayHi
  img.onclick = () => {
    import(/* webpackChunkName:"sayHi" */'./utils/say').then(({ sayHi }) => {
      sayHi()
    })
  }
  box.appendChild(img)

  return box
}

document.body.appendChild(component())
