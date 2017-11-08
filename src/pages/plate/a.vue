<template>
	<div class="article">
		<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507456451692&di=e72027eef5b76a0099c1b11cb642a02e&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fw10%2F51%2Fd%2F26.jpg" class="title-img">
		<div class="title-placeholder">
			<h2>{{articleData.title}}</h2>
			<img :src="articleData.create_user.pic" :title="articleData.create_user.username">
			<span :title="articleData.create_user.username">{{articleData.create_user.username}}</span>
			<span :title="articleData.update_time.substr(0,10)">{{articleData.update_time.substr(0,10)}}</span>
			<span :title="'访问量：'+articleData.visit">访问量：{{articleData.visit}}</span>
		</div>
		<div v-html="articleData.markedcontent" class="article-content"></div>
	</div>
</template>

<script>
// import config from '@/public/config.js'
// import {getCookie, getSession} from '../../public/methods.js'
export default {
	name: 'article',
	data () {
		const self = this
		console.log(marked('# hello > shanchao '));

		return {
			articleid: self.$route.params.articleid,
			markdown: marked('*hello*'),
			// url: config.url,
			filterConfig: {
				article_id: self.$route.params.articleid
			},
			articleData: {
				pic: '',
				title: '',
				create_user: {
					pic: '',
					userid: '',
					username: ''
				},
				content: '',
				update_time: '',
				visit: 0,
				markedcontent: '',
			},
			// cookie: getCookie()
		}
	},
	created () {
		// this.requestArticleList()
		// this.cookie = getCookie()
// console.log(getCookie())
	},
	methods: {
		// requestArticleList () {
		// 	this.$Loading.start();
		// 	this.axios.get(this.url + 'api/article/getArticleList', {
		// 		params: this.filterConfig
		// 	}).then((response) => {
		// 		this.$Loading.finish();
		// 		console.log(response)
		// 		this.articleData = response.data.result.result[0]
		// 		this.articleData.markedcontent = marked(this.articleData.content)
		// 		// console.log(response.result)
		// 		// this.markdown = marked(response.data.result.result[0].content)
		// 	}).catch((error) => {
		// 		console.log(error);
		// 		this.$Loading.error();
		// 	})
		// }
	}
}
</script>

<style scoped>
.article {
	position: relative;
/*	padding: 40px 60px;
	min-height: 600px;*/
}
.title-img {
	width: 100%;
	height: 150px;
}
.title-placeholder {
	position: absolute;
	left: 200px;
	top: 50px;
	/*background-color: #fff;*/
	/*width: 100px;*/
	height: 100px;
}
.title-placeholder h2 {
	text-shadow: 0 0 5px #fff;
	margin-bottom: 10px;
}
.title-placeholder img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	vertical-align: middle;
	transition: all .5s ease;
}
.title-placeholder img:hover {
	transform: rotate(360deg);
}
.title-placeholder span {
	text-shadow: 0 0 1px #fff;
	line-height: 30px;
	margin: 0 10px;
}
.article-content {
	padding: 40px 60px;
	min-height: 600px;	
}
</style>