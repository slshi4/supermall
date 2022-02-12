module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        //'@' : 'src' //默认已经配置了
        'assets' : '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views',
      }
    }
  }
}