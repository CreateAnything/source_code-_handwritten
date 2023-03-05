enum Status{
    PENDIG = "pending",
    FULFILLD = "fulfilled",
    REJECTED = "rejected"
}
class MyPromise<T = unknown>{
    private status:Status = Status.PENDIG;//Promise状态
    private reslut:any//Promise成功的结果
    private reason: any//Promise失败的结果
    private resloveQueuesCallback: Function[] = []//存储异步成功的回调函数队列
    private rejectQueuesCallback:Function[] = []//存储异步失败的回调队列
    constructor(executor: ExecutorType<T>) {
        try {
            executor(this.reslove.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    public then: Then = (onfulfilled, onrejected) => {
        switch (this.status) {
            case Status.FULFILLD:
                onfulfilled(this.reslut)
                break
            case Status.REJECTED:
                onrejected && onrejected(this.status)
                break
            case Status.PENDIG:
                onfulfilled && this.resloveQueuesCallback.push(() =>onfulfilled(this.reslut))//将成功的回调存到数组中
                onrejected && this.rejectQueuesCallback.push(() => onrejected(this.reason))//将失败的回调存到数组中
                break
        }
    }

    private reject: Reject = (reason) => {
        this.status = Status.REJECTED  
        this.reason = reason
        this.rejectQueuesCallback.forEach(cb =>cb())//发布存放在成功数组中的回调
    }

    private reslove: Reslove<T> = (value) => {
        this.status =  Status.FULFILLD
        this.reslut = value
        this.resloveQueuesCallback.forEach(cb =>cb())//发布存放在失败数组中的回调
    }
}


export default MyPromise