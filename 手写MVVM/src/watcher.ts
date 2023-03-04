import { CbFunction, WatcherType } from 'Watcher';
import Dep from './Dep';
//观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化以后就执行相应的方法
class Watcher implements WatcherType{
    expr: string;
    cb: CbFunction;
    vm: VmOptions;
    oldValue:any
    constructor(vm: VmOptions, expr: string, cb: CbFunction) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.oldValue = this.getOldVlue()
    }
    getValue(vm: VmOptions, expr: string): any {
        let newKey: string[] = expr.split('.')
         return newKey.reduce((prev, next) => {
            return prev[next]
        },vm.data)
    }

    getOldVlue() {
        //将当前具的watcher绑定在Dep中，为了当值更新时可以找到当前需要更新的wather
        Dep.target = this
        let value =  this.getValue(this.vm, this.expr)
        Dep.target = null
        return value
    }

    update(): void {
        let newValue = this.getValue(this.vm, this.expr)
        if (newValue !== this.oldValue) {
            //调用watch的callback
            this.cb(newValue,this.oldValue)
        }
    }
}

export default Watcher