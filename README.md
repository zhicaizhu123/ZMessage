# z-message

> 自定义 element-ui Message 消息提示

## 安装

```sh
# 因为时基于element的消息提示二次封装
# 所以使用前确保已经安装了element-ui
npm install --save z-message
```

## 使用

```js
import Vue from 'vue'
import ZMessage from 'z-message'

ZMessage.setConfig({
  max: 1, // 最多显示的消息条数，默认为 0 表示不限制
  isQueue: true, // 是否已队列显示消息，默认为false
  showNewest: false // 是否只消息最新的消息，默认为true
})

Vue.prototype.$message = ZMessage
```
