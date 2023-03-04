import Complie from "./compile"
import Observe from './observe'
class MVVM<T = any>{
    $el:VmOptions['el']
    $data:DataType<T>
    constructor(options: VmOptions) {
        this.$el = options.el
        this.$data = options.data
        //如果有要编译的模板然后我就开始编译
        if (this.$el) {
        //数据劫持对象把他的属性改成get,set方法
            new Observe(this.$data)
        //用数据和元素进行编译
            new Complie({el:this.$el,data:this.$data})
        }
    }
}
export default MVVM