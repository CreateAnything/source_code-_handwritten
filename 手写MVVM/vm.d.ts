
declare type PickKeys<T, K extends keyof T> = Exclude<keyof T, K>
declare type DataType<T = any> = T 
declare type DocumentElement = HTMLElement | string
declare type VmOptions<T = any> = {
    el: DocumentElement,
    data:DataType<T>
}

declare module 'Complie' {
    export type UpdaterType = {
        textUpdater: (node:HTMLElement,value:any) => void,
        modelUpdater:(node:HTMLInputElement,value:any) =>void
    }
    export type UpdaterFunType<T> = (node: T, vm: VmOptions, value: any) => void
    export type Cb = (payload:any) =>void
    export interface ComplieUtilsType{
        setVal:(vm:VmOptions,expr:string,value:string) =>any
        getVal: (vm: VmOptions, key: string) => any
        getTextVal:(vm:VmOptions,expr:string,cb?:Cb) =>any
        text:UpdaterFunType<HTMLElement>
        model: UpdaterFunType<HTMLInputElement>
        updater:UpdaterType
    }
}

declare module 'Observe' {
    export type InstanceType = any
    export class ObserveClassType{
        $data: InstanceType
        observe(data: InstanceType): void
        defineReactive(obj:Record<string,any>,key:string,value:any):void
    }
}

declare module 'Watcher' {
    export type CbFunction = (newValue:any,oldValue:any) => void
    export type GetValueType = (vm:VmOptions,expr:string) =>any
    export class WatcherType{
        vm: VmOptions
        expr: string
        cb: CbFunction
        oldValue:any
        getValue:GetValueType
        getOldVlue(): any
        update():void
    }
}