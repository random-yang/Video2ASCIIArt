export default class EventHandler {
    constructor(target, eventType, cb) {
        this.handlerCatch = target.addEventListener(eventType, cb, false)
    }
    destroy() {
        removeEventListener(this.handlerCatch)
    }
}
