
type onFulfilledFnType = (value:unknown) => any
type onRejectFnType = (reason: any) => any
type Reslove<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason: any) => void
type ExecutorType<T> = (resolve: Resolve<T>, reject: Reject) => void
type Then = (onFulfilled: onFulfilledFnType, onRejected?: onRejectFnType) => void


interface PromiseType<T>{
    new(executor:ExecutorType):PromiseType<T>
    then:Then
}