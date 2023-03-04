import { ComplieUtilsType } from 'Complie'
import Watcher from './watcher'
const reg:RegExp = /\{\{([^}]+)\}\}/g
class ComplieTemplate{
    private el:DocumentElement
    private vm:VmOptions
    constructor(options:VmOptions) {
        this.el = this.getElementNode(options.el)
        this.vm = options
        if (this.el) {
            //1.如果可以获取到在开始编译
            let fragment = this.nodeToFragment(this.el)
            this.complie(fragment)
            //2.把编译好的Fragment放回页面去
            this.el.appendChild(fragment)
        }
    }
    //辅助方法
    getElementNode(node:DocumentElement):HTMLElement {
        if (typeof node === 'string') {
            return document.querySelector(node)!
        } else {
            return node
        }
    }
    //判断节点是元素节点吗
    isElementNode(node: Node): boolean {
        return node.nodeType === 1
    }
    //判断节是不是指令
    isDirective(name:string):boolean {
        return name.includes('v-')
    }
    //核心方法
    //将el中的全部内容全部放到内存中
    nodeToFragment(el:HTMLElement):DocumentFragment {
        let fragment = document.createDocumentFragment()
        let firstChild:ChildNode | null
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    //编译文档碎片
    complie(fragment: DocumentFragment | HTMLElement): void {
        let childNodes = fragment.childNodes as unknown as HTMLElement[]
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.complieElement(node)
                this.complie(node)
            } else {
                this.complieText(node)
            }
        })
    }
    //编译元素
    complieElement(node:HTMLElement | HTMLInputElement) {
        let attrs: NamedNodeMap = node.attributes //取出节点的属性
        Array.from(attrs).forEach(attr => {
            //判断属性名字是不是包含v-
            let attrName:string = attr.name
            if (this.isDirective(attrName)) {
                //取到对应的值放到节点中的值上
                let expr: string = attr.value
                let type = attrName.split('-')[1] as keyof ComplieUtilsType
                switch (type) {
                    case 'model':
                        ComplieUtil['model'](node as HTMLInputElement, this.vm, expr)
                        break
                    case 'text':
                        ComplieUtil['text'](node, this.vm, expr)
                        break
                    default:
                        throw new Error(`can not find${type} in compile type`)
                }
            }
        })
    }
    //编译文本
    complieText(node: HTMLElement) {
        let expr = node.textContent
        if (expr && reg.test(expr)) {
            ComplieUtil.text(node,this.vm,expr)
        }
    }
}

const ComplieUtil: ComplieUtilsType = {
    //获取对象的值
    getVal(vm, key) {
        let newKey: string[] = key.split('.')
        return newKey.reduce((prev, next) => {
            return prev[next]
        }, vm.data)
    },
    //获取{{}}中变量的名称
    getTextVal(vm, expr, cb) {
        let res: any
        let value = expr.replace(reg, (...args: any[]) => {
            res = ComplieUtil.getVal(vm, args[1])
            cb && cb(args[1])
            return res
        })
        return value
    },
    //文本处理
    text(node, vm, expr) {
        let updateFn = ComplieUtil.updater['textUpdater']
        let value = ComplieUtil.getTextVal(vm, expr, payload => {
        //数据变化应该调用watch的callback更新新值
            new Watcher(vm, payload, (_newValue) => {
                updateFn && updateFn(node, ComplieUtil.getTextVal(vm, expr))
            })
        })
        updateFn && updateFn(node, value)
    },

    model(node, vm, expr) {
        let updateFn = ComplieUtil.updater['modelUpdater']
        let value: any
        //数据变化应该调用watch的callback更新新值
        new Watcher(vm, expr, (_newValue, _oldValue) => {
            value = ComplieUtil.getVal(vm, expr)
            updateFn && updateFn(node, value)
        })
        value = ComplieUtil.getVal(vm, expr)
        updateFn && updateFn(node, value)
        node.addEventListener('input', (e) => {
            let value = (e.target as HTMLInputElement).value
            ComplieUtil.setVal(vm,expr,value)
        })
    },
    updater: {
        textUpdater(node, expr) {
            node.textContent = expr
        },
        modelUpdater(node, value) {
            node.value = value
        },
    },
    
    setVal: function (vm: VmOptions, expr: string,value:string): any {
        let exprKey = expr.split('.')
        return exprKey.reduce((prev, next, currentIndex) => {
            if (currentIndex === exprKey.length - 1) {
                return prev[next] = value
             }
             return prev[next]
        },vm.data)
    }
}
export default ComplieTemplate