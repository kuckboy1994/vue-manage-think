# vue-manage-think


## 本项目使用`BEM` CSS命名规范
了解可以[查看](http://blog.csdn.net/chenmoquan/article/details/17095465)
```css
.site-search{} /* 块 */  
.site-search__field{} /* 元素 */  
.site-search--full{} /* 修饰符 */ 
```

## api 模块
### 调用api参数说明（对象）
```js
// 传参
arg.data

// success 
arg.success

// error 和 success中error_code 不为0
arg.error
```
### 所有的api都继承 `request-core`
- `request-core` 中主要封装了 axios的 `get` 方法和 `post` 方法
- api中的方法直接调用 `get` 或 `post` 传入 接口的path 和 arguments中的数据部分


## 关于router
vue中实现页面切换有两种方式
- 声明式
`<router-link :to="...">`
- 编程式
`router.push(...)`
本质上来说 都是通过编程式来实现的。声明式的好处在于存在一个实体的a标签。但是编程式的方式更加可控。注意取舍！

## `:key`
属性使用 `模块 + '_' + 内容 + '_' + index`

## 使用ES6语法
- 一行末尾不加 `;`
- 正确使用 `let`、`const`
- 合理使用箭头函数 `() => {}`
	- 不应该使用箭头函数来定义watcher函数，this 不会按期望执行vue实例，应该使用function
	- 应该在数据请求的回调中使用箭头函数，this的期望指向就是vue的实例
- 合理的使用解构赋值
- 正确的使用类和继承

## `ref` 
所有methods，都是通过 `ref` 访问到组件实例来调用的，比如：
```
<Select ref="select">

this.$refs.select.setQuery('');
```

## watch 某个对象的时候，如果值没有初始化，不会被watch监听
```js
data () {
	return {
		filterConfig: {
			'plate_id': this.$route.params.blockid,
			'key_word': '',
			'page_cur': 1,
			'page_num': 10,
		}
	}
},
methods: {
	changeDate (dates) {
		// 设置filterConfig对象属性的值，是不会触发watch方法的，在filterConfig中加入相应的属性即可
		this.filterConfig['start_time'] = dates[0]
		this.filterConfig['end_time'] = dates[1]
	}
},
watch: {
	filterConfig: {
		handler: function (val, oldVal) {
			console.log('filterConfig')
		},
 		deep: true
	}
}
```

## 名词解释





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
