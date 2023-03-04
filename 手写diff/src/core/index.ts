import { CreateElementFn, ElementParams, RenderDomFn, SetAttrFn, VNode, childrenType } from 'runtimecore'
const createElement: CreateElementFn = (params) => {
    return new Element(params)
}
//创建元素
class Element implements VNode{
    type: string
    props: Record<string, any> | undefined
    children: childrenType
    constructor(options: ElementParams) {
        this.type = options.type
        this.props = options.props
        this.children = options.children
    }
}
//将虚拟dom渲染成真实dom
const render = (vdom:VNode) => {
    let el = document.createElement(vdom.type)
    for (let key in vdom.props) {
        //设置属性
        setAttr(el, key, vdom.props[key])
    }
    vdom && vdom.children?.forEach(child => {
        let Node = (child instanceof Element) ? render(child) : document.createTextNode(child as string)
        el.appendChild(Node)
    })
    return el
}

//设置元素节点属性
const setAttr:SetAttrFn = (node,key,value) => {
    switch (key) {
        case 'value':
            (node as HTMLInputElement).value = value
            break
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(key,value)
    }
}

//将真实dom插入到页面
const renderDom: RenderDomFn = (el, target) => {
    if (typeof target === 'string') {
        document.querySelector(target)?.appendChild(el)
    } else {
        target.appendChild(el)   
    }
}

export {
    createElement,
    render,
    Element,
    renderDom
}

