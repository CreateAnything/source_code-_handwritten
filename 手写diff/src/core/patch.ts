import { Paches, PachesItem, PatchElementFn, PatchFn, Patchstrategy } from "runtimecore";
import { Element, render } from "./index";
export const Patch:PatchFn = (node,patch) => {
    //给某个元素打补丁
    const walk = createWalk(patch)
    walk(node,patch)
}

export const createWalk = (patch: Paches):Function => {
    let index = 0
    let AllPatch = patch
    function walk (node: HTMLElement) {
        let currentPatch = AllPatch[index++]
        let childNodes = node.childNodes
        Array.from(childNodes).forEach(child => {
           walk(child as HTMLElement)
        })
        currentPatch && currentPatch.length > 0 && doPatch(node,currentPatch)
    }
    return walk
}


//更新属性
const patchAttr: PatchElementFn = (node, patch) => {
    for (let key in patch.value as Record<string,any>) {
         node.setAttribute(key,(patch.value as any)[key])
    }
}

//删除节点
const patchRemove:PatchElementFn = (node,_patch) => {
    node.parentNode?.removeChild(node)
}

//替换文本
const patchReplace:PatchElementFn = (node,patch) => {
    let newNode = (patch.value instanceof Element) ? render(patch.value) : document.createTextNode(patch.value as string)
    node.parentNode?.replaceChild(newNode,node)
}

//改变元素文本
const patchText:PatchElementFn = (node,patch) => {
    node.textContent = patch.value as string
}

const PatchMap: Patchstrategy = {
    'Attr': patchAttr,
    'Remove': patchRemove,
    'Replace': patchReplace,
    'Text':patchText
}

//给节点打patch
function doPatch(node: HTMLElement, patches: PachesItem[]) {
    patches.forEach(patch => {
        PatchMap[patch.type](node,patch)
    })
}