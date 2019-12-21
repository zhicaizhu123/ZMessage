import { Message } from 'element-ui'

const messageTypes = ['success', 'warning', 'error', 'info']

function HcMessage(options) {
  if (!(this instanceof HcMessage)) {
    return new HcMessage(options)
  }
  this.init(options)
}

HcMessage.queue = [] // 未展示数据的消息队列

HcMessage.instances = [] // 消息体实例列表

// 配置项
HcMessage.config = {
  max: 0, // 最大显示数
  isQueue: false, // 是否以队列形式存储为展示消息
  showNewest: true // 是否后添加的消息覆盖前面的消息
}

// 配置参数
HcMessage.setConfig = function(config = {}) {
  HcMessage.config = { ...HcMessage.config, ...config }
}

HcMessage.close = Message.close

HcMessage.closeAll = Message.closeAll

// 各消息类型静态方法
messageTypes.forEach(type => {
  HcMessage[type] = options => {
    let opts = options
    if (typeof options === 'string') {
      opts = {
        message: options
      }
    }
    return new HcMessage({ ...opts, type })
  }
})

// 初始化
HcMessage.prototype.init = function(options) {
  const { max, isQueue, showNewest } = HcMessage.config
  // 判断如果超出最大消息数时，删除消息
  if (max > 0 && HcMessage.instances.length >= max && !isQueue && showNewest) {
    this.removeMessages()
  }

  if (HcMessage.instances.length >= max && isQueue) {
    // 添加队列元素
    HcMessage.queue.push(this.saveToQueue(options))
  } else if (HcMessage.instances.length < max || !max) {
    this.setMessage(options)
  }
}

// 移除消息
HcMessage.prototype.removeMessages = function() {
  const {
    instances,
    config: { max }
  } = HcMessage
  HcMessage.instances = instances.filter((instance, index) => {
    if (index < instances.length - max + 1) {
      instance && instance.close()
      return false
    }
    return true
  })
}

// 获取消息实例和添加事件监听
HcMessage.prototype.setMessage = function(options) {
  const instance = Message(options)
  // 监听消息消失事件，从实例列表移除当前消息实例
  instance.$watch('visible', val => {
    if (val) return
    HcMessage.instances = HcMessage.instances.filter(item => item !== instance)
    if (HcMessage.config.isQueue && HcMessage.queue.length) {
      HcMessage.queue.shift()()
    }
  })
  HcMessage.instances.push(instance)
}

// 生成队列元素，延迟执行
HcMessage.prototype.saveToQueue = function(options) {
  return () => {
    this.setMessage(options)
  }
}

export default HcMessage
