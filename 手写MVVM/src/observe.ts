import { InstanceType, ObserveClassType } from 'Observe'
import Dep from './Dep'
class Observe implements ObserveClassType{
    $data:InstanceType
    constructor(vm:InstanceType) {
        this.$data = vm
        this.observe(this.$data)
    }
    observe(data: InstanceType): void {
        if(typeof data !== 'object' || data === undefined) return
    //将原有的属性改成set,get的形式
        Object.keys(data!).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.observe(data[key])//深度劫持
        })
    }
    //定义响应式数据
    defineReactive(obj: Record<string, any>, key: string, value: any): void {
        let that = this
        let dep = new Dep()//每个变化的数据都会对应应该数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if (newValue !== value) {
                    that.observe(newValue)//如果是对象继续劫持
                    value = newValue
                    dep.notify()//值变化就更新视图调用当前watcher的callback进行更新
                }
            }
        })
    }
}
export default Observe