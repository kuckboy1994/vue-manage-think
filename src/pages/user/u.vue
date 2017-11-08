<template>
	<div class="user">
		<div class="center-content">
			<div class="userinfo">
				<img src="https://avatars0.githubusercontent.com/u/19633245?v=4&s=460" class="userinfo-pic">
				<div class="userinfo-right">
					<h1>kuckboy<Tag>B2C</Tag></h1>
					<p class="introduce">介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
				</div>
			</div>
			<Tabs type="card">
				<TabPane label="我的板块">我的板块</TabPane>
				<TabPane label="收到的评论">收到的评论</TabPane>
				<TabPane label="收到的赞">收到的赞</TabPane>
				<TabPane label="我的评论">我的评论</TabPane>
			</Tabs>
		</div>
	</div>
</template>

<script>

export default {
	name: 'user',
	data () {
		const self = this
		return {
			url: config.url,
			
		}
	},
	created () {
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
.user {
	position: relative;
	padding: 40px 60px;
}
.center-content {
	height: 600px;

}
.userinfo {
	position: relative;
	margin-bottom: 20px;
}
.userinfo-pic {
	width: 150px;
	height: 150px;
	position: absolute;
	left: 20px;
}
.userinfo-right {
	margin-left: 200px;
}
.introduce {
	height: 120px;
	overflow-y: auto;
}
</style>