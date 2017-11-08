<template>
	<div class="mk">
		<Input v-model="paperInfo.title" placeholder="请输入文章标题..." size="large"></Input>
		<!-- <button @click="uploadimg">upload</button> -->
		<mavon-editor 
			v-model="paperInfo.content" 
			:subfield="true"
			placeholder="图片上传可以使用截图黏贴的方式上传，或者是拖动图片到到当前输入框中..."
			:toolbars="toolbarsOptions"
			@change="changeContent"
			@fullscreen="toggleFullscreen"
			@imgAdd="$imgAdd"
			:style="markdownStyle"
			ref="mavonEditor"
			></mavon-editor>
		<br>
		<Row>
			<Col span="4" offset="2"><h4 class="add-article-title">文章简介：</h4></Col>
		</Row>
		<br>
		<Row>
			<Col span="20" offset="2">
				<Input v-model="paperInfo.abstracts" type="textarea" :rows="4" placeholder="请输入文章简介...（80字左右为最佳）"></Input>
			</Col>
		</Row>
		<br>
		<br>
		<Row>
			<Col span="14" offset="2">
				<Row>
					<Col span="8"><h4 class="add-article-title">文章标签：</h4></Col>
					<Col span="16">
						<Select 
			                remote
			                :remote-method="remoteLabels"
			                :loading="labelLoading"
							v-model="paperInfo.label" 
							:filterable="true"
							:multiple="true"
							not-found-text="回车增加新标签"
							placeholder="输入关键字获取标签列表"
							@keyup.native.13="addLabel">
								<Option v-for="(item, index) in labels" :value="item" :key="'writing_label_list_'+index">{{ item }}</Option>
						</Select>
					</Col>
				</Row>
				<br>
				<br>
				<Row>
					<Col span="8"><h4 class="add-article-title">文章类型：</h4></Col>
					<Col span="16">
						<Select v-model="paperInfo.type" value="0">
							<Option value="0">原创</Option>
							<Option value="1">转载</Option>
							<Option value="2">翻译</Option>
						</Select>
					</Col>
				</Row>
				<br>
				<br>
				<Row>
					<Col span="8"><h4 class="add-article-title">发布到：</h4></Col>
					<Col span="16">
						<Select 
							v-model="paperInfo.plateids" 
							:filterable="true"
							:multiple="true"
							not-found-text="没有查询到相关板块"
							placeholder="选择要发布到哪个版块"
							>
								<Option v-for="(item, index) in plates" :value="item['id']" :key="'writing_plate_list_'+index">{{ item['plate_name'] }}</Option>
						</Select>
					</Col>
				</Row>
				<br>
			</Col>
			<Col span="4" offset="1">
				<Upload
					name="file"
					ref="paperupload"
					:on-success="upLoadSuccess"
					:format="['jpg','jpeg','png']"
					:max-size="2048"
					multiple
					type="drag"
					action="http://10.10.12.110:3001/api/upload"
					style="display: inline-block;width:150px;height:150px;">
					<div class="upload-div">
						<img v-if="picHolder" :src="picHolder" width="150" height="150">
						<Icon v-if="!picHolder" type="camera" size="40"></Icon>
					</div>
				</Upload>
			</Col>
		</Row>
		<br>
		<Row>
			<Col span="8" offset="16">
				<Select v-model="paperInfo['article_status']" style="width:150px" value="0" placement="top">
					<Option value="0">发布到版块</Option>
					<Option value="1">保存到草稿箱</Option>
					<Option value="2">尽自己可见</Option>
				</Select>
				<Button type="primary" @click="addArticle">确定</Button>
			</Col>
		</Row>
		<br>
	</div>

</template>

<script>

export default {
	name: 'mkdemo',
	components: {
		// mavonEditor
	},
	data () {
		return {
			content: '',
			paperInfo: {
				title: '',
				label: [],
				abstracts: '',
				pic: '',
				content: '',
				userid: 1,
				plateids: [],
				'article_status': '0',
				type: '0'
			},
			labels: [],
			plates: [],
			labelLoading: false,
			PlateLoading: false,
			toolbarsOptions: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				// imagelink: true, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				save: true, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true, // 预览
			},
			markdownStyle: 'height:600px;z-index: 998;',
			picHolder: '',
		}
	},
	created () {
		// 获取板块列表
		// this.axios.get(this.url + 'api/plate/getPlateList')
		// .then((response) => {
		// 	let data = response.data
		// 	console.log(data)
		// 	if (data['error_code'] === 0) {
		// 		this.plates = data.result.result;
		// 	}
		// }).catch((error) => {
		// 	console.log(error);
		// })
	},
	mounted: function () {
	},
	methods: {
		$imgAdd(pos, $file){
			var formdata = new FormData();
			formdata.append("file", $file, '*.png');
            this.axios({
                url: 'http://10.10.12.110:3001/api/upload',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                this.paperInfo.content = this.paperInfo.content.replace(pos, res.data.filename)
                this.$refs.mavonEditor.$imgUpdateByUrl(pos, res.data.filename)
            })

        },
		upLoadSuccess (res, file) {
			this.picHolder = res.filename
			this.paperInfo.pic = res.filename
			setTimeout(() => {
				this.$refs.paperupload.clearFiles()
			}, 2000)
			
		},
		addLabel (e) {
			const self = this
			if (e.target.value) {
				self.axios.get(self.url + 'api/label/addLabel', {
					params: {
						name: e.target.value
					}
				}).then(function (response) {
					let data = response.data
					if (data['error_code'] === 0) {
						self.$Notice.success({
						    title: '新增标签“'+e.target.value+'”成功',
						    desc: '重新搜索该标签添加为当前板块的标签吧！'
						});
					}
				}).catch(function (error) {
					console.log(error);
				})
			}
		},
		remoteLabels (query) {
			const self = this
			if (query !== '') {
				// console.log(query)
				self.labelLoading = true
				self.axios.get(self.url + 'api/label/getLenovoLabelList', {
					params: {
						name: query,
						limit: 5
					}
				}).then(function (response) {
					self.labelLoading = false
					let data = response.data
					self.labels = []
					for (let i in data.result) {
						self.labels.push(data.result[i]['name'])
					}
				}).catch(function (error) {
					self.labelLoading = false
					console.log(error);
				})
				
			} else {
				self.labels = []
			}
		},
		changeContent (data, htmlData) {
			this.content = htmlData
			this.paperInfo.content = htmlData;
		},
		// 优化展示效果，全屏的是把markdown编辑器的层级设置为顶级
		toggleFullscreen (isFull, value) {
			if (isFull) {
				this.markdownStyle = 'height: 600px;z-index: 99999;'
			} else {
				this.markdownStyle = 'height: 600px;z-index: 998;'
			}
		},
		requestArticle () {
			// self.axios.get(self.url + 'api/plate/getPlateList', {
			// 	params: {
			// 		'plate_id': self.blockid
			// 	}
			// }).then(function (response) {
			// 	if (response.data['error_code'] !== 0) {
			// 		return
			// 	}
			// 	self.blockInfo = response.data.result[0]
			// }).catch(function (error) {
			// 	console.log(error);
			// })
		},
		editArticle () {

		},
		addArticle () {
			console.log(this.paperInfo)
			this.axios.post(this.url + 'api/article/addArticle', this.paperInfo).then((response) => {
				console.log(response)
				if (response.data['error_code'] !== 0) {
					return
				}
				console.log(response)
			}).catch((error) => {
				console.log(error);
			})
		}

	},
	computed : {
	},
	watch : {

	}
}
</script>

<style scoped>
.add-article-title {
	color: 16px;
}
.upload-div {
	width: 150px;
	height: 150px;
	line-height:  170px;
}
</style>