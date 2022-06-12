import {request} from "./request";

export function getHomeMultidata() {
return request({
  url: '/home/multidata'
})
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page: page
    }
  })
}


let totalNums=[[20,11,222],]
const nums1=[20,11,222]
const nums2=[23,13,333]

//把一个数组赋值给另一个数组
// for(let n of nums1){
//   totalNums.push(n);
// }

totalNums.push([20,11,222]); //不正确，会把它当成一个整体如：totalNums=[[20,11,222],]
totalNums.push(...nums1);
