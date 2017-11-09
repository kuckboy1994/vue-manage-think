<template>
	<div class="article">
		<img src="../../assets/img/banner-2.jpg" class="title-img">
		<div class="title-placeholder">
			<h2>{{articleData.title}}</h2>
			<router-link :to="{path: '/u/'+articleData.userid}">
				<img :src="articleData.create_user.pic" :title="articleData.create_user.username">
			</router-link>
			<span :title="articleData.create_user.username">{{articleData.create_user.username}}</span>
			<span :title="articleData.update_time.substr(0,10)">{{articleData.update_time.substr(0,10)}}</span>
			<span :title="'访问量：'+articleData.visit">访问量：{{articleData.visit}}</span>
		</div>
		<div v-html="articleData.markedcontent" class="article-content"></div>
	</div>
</template>

<script>
import articleApi from '@/api/article'

// import config from '@/public/config.js'
// import {getCookie, getSession} from '../../public/methods.js'
export default {
	name: 'article',
	data () {
		// console.log(marked('# hello > shanchao '));

		return {
			articleid: this.$route.params.articleid,
			markdown: marked('*hello*'),
			filterConfig: {
				article_id: this.$route.params.articleid
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
		this.requestArticleList()
		// this.cookie = getCookie()
		// console.log(getCookie())
	},
	methods: {
		requestArticleList () {
			articleApi.getArticleList({
				data: this.filterConfig,
				success: data => {
					console.d(data)
					this.articleData = data.result.result[0]
					this.articleData.markedcontent = marked(this.articleData.content)
				},
				error: error => {
					console.log(error)
				}
			})
		}
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
	left: 70px;
	top: 50px;
	/*background-color: #fff;*/
	/*width: 100px;*/
	height: 100px;
	color: black;
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