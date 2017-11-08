# vue-manage-think


## 本项目使用`BEM` CSS命名规范
了解可以[查看](CSS命名规范——BEM思想（非常赞的规范）)
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
