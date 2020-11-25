module.exports = {
  plugins:{
    'postcss-import': {}, //解决@import引入路径问题
    'postcss-url': {}, //处理图片文件，字体文件等的引用路径处理
    'postcss-aspect-ratio-mini': {}, //处理元素容器宽高比
    'postcss-write-svg': { //移动端1px处理
      utf8: false
    },
    'postcss-cssnext': {}, //下个版本的css语法，也包括添加浏览器前缀
    'postcss-px-to-viewport': { //px变为vw
      unitToConvert: 'px', //要转换的单位 默认 可不设置
      viewportWidth: 750, //750
      viewportHeight: 1334,  //1334
      propList: ['*'], //所有的都转换
      unitPrecision: 3, //小数位数
      viewportUnit: 'vw', //要转成的视窗单位
      fontViewportUnit:'vmin', //字体要转换成的单位,始终选择vmin,避免因旋转的影响
      selectorBlackList: ['.ignore'], //仍然视为px的class
      minPixelValue: 1, //小于或等于1px不转换
      mediaQuery: false, //是否在媒体查询中转换px @media
      landscape:true, // 允许横屏模式,如果设置为flase,手机横屏的时候，布局会很难看
      landscapeUnit:'vw', //允许横屏时的单位
      landscapeWidth: 1334  //设置横屏模式的width
    },
    'postcss-viewport-units': {}, //为viewport-units-buggyfill自动追加content
    'cssnano': {  //css代码压缩
      preset: 'advanced', //预设高级需要再装cssnano-preset-advanced
      autoprefixer: false, //关闭自动添加浏览器前缀
      'postcss-zindex': false //会把z-index重置为1
    },
    'postcss-flexbugs-fixes':{} //处理flex的bug
  }
}