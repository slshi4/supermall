//一个网络请求这样写
// export default instance1 ({})
import axios from "axios";
//多个网络请求的
// export function instance2(){}

// *****************************************
//封装的方式四
export function request(config){
    //1.创建axios的实例
    const instance =axios.create({
      // baseURL:'http://123.207.32.32:8000',
      baseURL: 'http://154.136.185.211:7808/api/66',
      timeout: 5000
    })

  //2.axios的拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config =>{
      console.log(config);
      return config
    },err => {
      console.log(err);
    }
   )

  //2.2响应拦截
  instance.interceptors.response.use(res =>{
    // console.log(res);
    return res.data;
  },err => {
    console.log(err);
  })

    //3发送真正的网络请求   instance(config)返回的本身就是promise
  return  instance(config)
}


















