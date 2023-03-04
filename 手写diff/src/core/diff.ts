import { DiffAttrFnType, DiffChildrenFn, DiffVnodeFnType, Paches, PachesItem, VNode, WalkFn } from "runtimecore";
import { hasChildren, isString } from "./utils";

let Index = 0
//对比两个虚拟dom是否相同
const diff:DiffVnodeFnType = (oldTree,newTree) => {
    let paches:Paches = {}
    let index: number = 0
    //递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, paches)
    return paches

}

const walk:WalkFn = (oldNode,newNode,inedx,paches) => {
    let currentPatch: PachesItem[] = []
    //如果新节点没有时
    if (!newNode) {
        currentPatch.push({type:'Remove',value:inedx})   
    }
    //判断节点是否为文本节点
    else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({type:'Text',value:newNode})   
        }
    }
    //比较属性是否有更改
    else if (oldNode.type === newNode.type) {
    //判断元素属性是否更改
        const attr = diffAttr(oldNode.props!, newNode.props!)
        if (Object.keys(attr).length > 0) {
            currentPatch.push({ type: 'Attr', value: attr })
        }
    //递归children节点
        if (hasChildren(oldNode) && hasChildren(newNode)) {
            diffChildren(oldNode.children as VNode[],newNode.children as VNode[],paches)   
        }
    }
    //节点被替换了
    else {
        currentPatch.push({type:'Replace',value:newNode})
    }
    //当当前补丁包有值则放到大补丁包中
    currentPatch.length > 0 && (paches[inedx] = currentPatch)
}

const diffChildren:DiffChildrenFn = (oldChild,newChild,paches) => {
    oldChild.forEach((child, currentIndex) => {
    //index每次传给walk时,index是递增的,所有的人都基于一个序号来实现
        walk(child,newChild[currentIndex],++Index,paches)
    })
}

const diffAttr:DiffAttrFnType = (oldProps,newProps) => {
    let paches:Record<string,any> = {}
    for (let key in oldProps) {
        if (oldProps[key] !== newProps[key]) {
            paches[key] = newProps[key]//有可能是undfind
        }
    }
    for (let key in newProps) {
        //老节点没有新节点的属性
        if (!oldProps.hasOwnProperty(key)) {
            paches[key] = newProps[key]
        }
    }
    return paches
}

export {
    diff
};

