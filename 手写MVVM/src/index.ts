import MVVM from './mvvm'
type User = {
    age:string
}
interface DataType{
    user: User
    message:string
}
window.addEventListener('load', () => {
    let vm = new MVVM<DataType>({
        el: '#app',
        data: {
            user: {
              age:12  
            },
            message: 'Hello',
        }
    })
    setInterval(() => {
        vm.$data.user.age+=5
    },1000)
})