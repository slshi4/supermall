export function sum(num1 , num2) {
  return num1 + num2;
}

//防抖函数,ES6语法可以给默认值
export function debounce(func,delay=50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}

/**
 * Date格式化工具类
 */
//正则表达式是干什么的？字符串匹配 利器(难，规则太多)
export function formatDate(date,fmt){
  //1.获取年份
  //y+ => 1个或者多个y
  //y* => 0个或者多个y
  //y? => 0个或者1个y
  //2019
  //yy - 19
  //yyyy - 2019
  //y - 9
  //yyy - 019
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  // M+ -> 正则表达是
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  //4:4:4   4点4分4秒
  //'00'+04   => '0004'
  return ('00' + str).substr(str.length);
};


