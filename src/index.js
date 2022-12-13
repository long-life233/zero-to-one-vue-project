import _ from 'lodash';
import {sayHi} from './print'
import './assets/css/style.css'
import './assets/css/iconfont.css'

import love from './assets/img/love1.png'

function component() {
  const box = document.createElement('h1')

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = sayHi;
  box.appendChild(btn);

  const el = document.createElement('h1')
  el.innerHTML = _.join(['Hello', 'World'])
  el.classList.add('title')
  box.appendChild(el)

  const img = new Image();
  img.src = love
  box.appendChild(img)

  const el2 = document.createElement('div')
  el2.innerHTML = _.join(['头大'])
  el2.classList.add('square')
  box.appendChild(el2)

  const el3 = document.createElement('div')
  el3.className = 'my-icon iconfont icon-dianhuatianchong'
  box.appendChild(el3)

  const el4 = document.createElement('div')
  el4.className = 'my-icon iconfont icon-a-youjianchakanyoujianfasongyoujianshouyoujian-06'
  box.appendChild(el4)

  return box
}

document.body.appendChild(component())