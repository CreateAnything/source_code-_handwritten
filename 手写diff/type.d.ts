declare module 'runtimecore' {
    //属性接口
    type childrenType = VNode[] | string[] | undefined
    type VnodeProps = Record<string,any>
    type pachesType = 'Attr' | 'Text' | 'Remove' | 'Replace'
    type PachesItem = {
        type: pachesType,
        value:Record<string,any> | number | string
    }
    type Paches = Record<number,PachesItem[]>
    type ElementParams = {
        readonly type: string,
        readonly props?: Record<string, any> | undefined,
        readonly children?:childrenType
    }
    type PatchElementFn = (node:HTMLElement,patch:PachesItem) =>void
    type Patchstrategy = Record<pachesType,PatchElementFn>
    //类接口

    class VNode{
        type: string
        props?: VnodeProps
        children?:childrenType
        constructor(params: ElementParams)
        mount?(node:HTMLElement | string):void
    }
    //函数接口

    type CreateElementFn = (params: ElementParams) => VNode
    type SetAttrFn = (node: HTMLElement, key: string, value: string) => void
    type RenderDomFn = (el: HTMLElement, target: HTMLElement | string) => void
    type DiffVnodeFnType = (oldNode: VNode, newNode: VNode) => Paches
    type DiffAttrFnType = (oldProps: VnodeProps, newProps: VnodeProps) => any
    type WalkFn = (oldNode: VNode, newNode: VNode, index: number, paches: Paches) => void
    type DiffChildrenFn = (oladChild: VNode[], newChild: VNode[], paches: Paches) => void
    type PatchFn = (el:HTMLElement,patch:Paches) =>void
}