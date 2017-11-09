<template>
	<div class="mkwriting">
		<Input v-model="paperInfo.title" placeholder="请输入文章标题..." size="large"></Input>
		<!-- <button @click="uploadimg">upload</button> -->
		<mavon-editor 
			v-model="paperInfo.content" 
			:subfield="true"
			placeholder="图片上传可以使用截图黏贴的方式上传，或者是拖动图片到到当前输入框中..."
			:toolbars="toolbarsOptions"
			@change="changeContent"
			@fullscreen="toggleFullscreen"
			@imgAdd="imgAdd"
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
			                :remote="true"
			                :remote-method="remoteLabels"
			                :loading="labelLoading"
							v-model="paperInfo.label" 
							:filterable="true"
							:multiple="true"
							:label="paperInfo.label"
							not-found-text="回车增加新标签"
							placeholder="输入关键字获取标签列表"
							@keyup.native.13="addLabel"
							>
								<Option v-for="(item, index) in labels" :value="item" :key="'mkwriting_label_list_'+index">{{ item }}</Option>
						</Select>
					</Col>
				</Row>
				<br>
				<br>
				<Row>
					<Col span="8"><h4 class="add-article-title">文章类型：</h4></Col>
					<Col span="16">
						<Select v-model="paperInfo.type">
							<Option :value="0">原创</Option>
							<Option :value="1">转载</Option>
							<Option :value="2">翻译</Option>
						</Select>
					</Col>
				</Row>
				<br>
				<br>
				<Row>
					<Col span="8"><h4 class="add-article-title">发布到：</h4></Col>
					<Col span="16">
						<Select 
							:remote="true"
							:remote-method="remotePlates"
							:loading="plateLoading"
							v-model="paperInfo.plateids" 
							:filterable="true"
							:multiple="true"
							:label='paperInfo.plateids'
							not-found-text="没有查询到相关板块"
							placeholder="选择要发布到哪个版块"
							>
								<Option v-for="(item, index) in plates" :value="item['id']" :key="'mkwriting_plate_list_'+index">{{ item['plate_name'] }}</Option>
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
					type="drag"
					:action="upload"
					style="display:inline-block;width:150px;height:150px;">
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
				<Select v-model="paperInfo['article_status']" style="width:150px" placement="top">
					<Option :value="0">发布到版块</Option>
					<Option :value="1">保存到草稿箱</Option>
					<Option :value="2">尽自己可见</Option>
				</Select>
				<Button type="primary" @click="saveArticle">确定</Button>
			</Col>
		</Row>
		<br>
	</div>

</template>

<script>
import articleApi from '@/api/article'
import labelApi from '@/api/label'
import userApi  from '@/api/user'
import imgUploadApi from '@/api/imgupload'
import {upload} from '@/common/config'

export default {
	name: 'mkwriting',
	data () {
		return {
			articleid: this.$route.params.articleid,
			upload: upload,
			picHolder: '',
			paperInfo: {
				title: '',
				label: [],
				abstracts: '',
				pic: '',
				content: '',
				userid: 1,
				plateids: [42],
				'article_status': 0,
				type: 0
			},

			content: '',
			
			labels: [],
			plates: [],
			labelLoading: false,
			plateLoading: false,

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
		}
	},
	created () {
		this.requestArticle()
	},
	methods: {
		imgAdd(pos, $file){
			var formdata = new FormData();
			formdata.append("file", $file, '*.png');

			imgUploadApi.upload({
				data: formdata,
				success: data => {
					console.d(data)
					this.paperInfo.content = this.paperInfo.content.replace(pos, data.filename)
                	this.$refs.mavonEditor.$imgUpdateByUrl(pos, data.filename)
				},
				error: error => {
					console.log(error)
				}
			})
        },
		upLoadSuccess (res, file) {
			this.picHolder = res.filename
			this.paperInfo.pic = res.filename
			setTimeout(() => {
				this.$refs.paperupload.clearFiles()
			}, 1500)
		},
		addLabel (e) {
            if (e.target.value) {
                labelApi.addLabel({
                    data: {
                        name: e.target.value
                    }, 
                    success: data => {
                        this.$Notice.success({
                            title: '新增标签“' + e.target.value + '”成功',
                            desc: '重新搜索该标签添加为当前板块的标签吧！'
                        });
                    }, 
                    error: error => {
                        this.$Notice.error({
                            title: '新增标签“' + e.target.value + '”失败',
                            desc: error
                        });
                        console.log(error)
                    }
                })
			}
        },
		remoteLabels (query) {
			if (query !== '') {
				this.labelLoading = true
				labelApi.getLenovoLabelList({
					data: {
						name: query,
						limit: 5
					},
					success: data => {
						this.labelLoading = false
						this.labels = []
						for (let i in data.result) {
							this.labels.push(data.result[i]['name'])
						}
					},
					error: error => {
						this.labelLoading = false
						console.log(error)
					}
				})
			} else {
				this.labels = []
			}
		},
		remotePlates (query) {
			if (query !== '') {
				this.plateLoading = true
				labelApi.getLenovoLabelList({
					data: {
						name: query,
						limit: 5
					},
					success: data => {
						this.plateLoading = false
						this.labels = []
						for (let i in data.result) {
							this.labels.push(data.result[i]['name'])
						}
					},
					error: error => {
						this.plateLoading = false
						console.log(error)
					}
				})
			} else {
				this.labels = []
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
			if (typeof this.articleid !== "undefined") {
				articleApi.getArticleList({
					data: {
						article_id: this.articleid
					},
					success: data => {
						console.d(data)
						this.paperInfo = data.result.result[0]
						this.picHolder = this.paperInfo.pic
						this.paperInfo.plateids = [42]
					},
					error: error => {
						console.log(error)
					}
				})
			}
		},
		saveArticle () {
			console.d(this.paperInfo)
			if (typeof this.paperInfo.id === "undefined") {
				articleApi.addArticle({
					data: this.paperInfo,
					success: data => {
						this.$Notice.success({
							title: '文章添加成功',
						})
						this.$route.push('/platelist')
					},
					error: error => {
						console.log(error)
						this.$Notice.error({
							title: '文章添加失败',
							desc: error
						})
					}
				})
			} else {
				this.paperInfo["article_id"] = this.paperInfo.id
				articleApi.editArticle({
					data: this.paperInfo,
					success: data => {
						this.$Notice.success({
							title: '文章修改成功',
						})
						this.$router.push('/platelist')
					},
					error: error => {
						console.log(error)
						this.$Notice.error({
							title: '文章修改失败',
							desc: error
						})
					}
				})
			}
			
		}
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