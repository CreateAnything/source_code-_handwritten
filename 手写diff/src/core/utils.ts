import { VNode } from "runtimecore"

export const isString = (node:VNode):boolean => {
    return Object.prototype.toString.call(node) === '[object String]'
}

export const hasChildren = (node: VNode):boolean => {
    return (node.children && node.children.length >0) ? true : false
}