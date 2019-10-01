/**
 * 处理事件
 * 负责绑定、移除
 */
export default class EventHandler {
    /**
     *
     * @param {Object} target
     * @param {string} eventType
     * @param {function} cb
     */
    constructor(target, eventType, cb) {
        this.handlerCatch = target.addEventListener(eventType, cb, false)
    }
    destroy() {
        removeEventListener(this.handlerCatch)
    }
}
