import { createElement, render, renderDom } from './core'
import { diff } from './core/diff'
import { Patch } from './core/patch'
//将虚拟dom转化成真实dom渲染到页面
const vdom1 = createElement({
    type: 'ul', props: { class: 'u-box' }, children: [
        createElement({ type: 'li', props: { class: 'item' }, children: ['jack'] }),
        createElement({ type: 'li', props: { class: 'item' }, children: ['mary'] }),
        createElement({type:'li',props:{class:'item'},children:['seick']})
    ]
})
const vdom2 = createElement({
    type: 'ul', props: { class: 's-box' }, children: [
        createElement({ type: 'li', props: { class: 'item' }, children: ['jasck'] }),
        createElement({ type: 'li', props: { class: 'item' }, children: ['wasq'] }),
        createElement({type:'li',props:{class:'item'},children:['sick']})
    ]
})
//将虚拟dom转化为真实dom
let el = render(vdom1)

//将真实dom插入指定节点
renderDom(el, '#app')

//获取对比后节点的补丁
const patch = diff(vdom1, vdom2)

//给元素打补丁，更新视图
Patch(el,patch)