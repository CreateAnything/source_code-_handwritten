import { WatcherType } from 'Watcher'
class Dep{
    static target:WatcherType | null
    subs:WatcherType[]
    constructor() {
        this.subs = []
    }
    addSub(watcher:WatcherType) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(watcher =>watcher.update())
    }
}
export default Dep