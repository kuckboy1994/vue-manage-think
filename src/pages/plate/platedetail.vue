<template>
	<div class="platedetail">
		<div class="platedetail__info" v-if="plateInfo">
			<img :src="plateInfo['pic']">
			<div class="platedetail__info--right">
				<h1>{{plateInfo['plate_name']}}</h1>
				<p class="create">创建人：{{plateInfo['create_user']['username']}} &nbsp; 创建时间：{{plateInfo['create_time'].substr(0,10)}}</p>
				<p class="charge">
					负责人：
					<router-link  v-for="(v, i) in plateInfo['maintain_user']" :key="'platedetail_info_maintain_user_'+i" :to="{path: '/u/'+v['userid']}">
						<Tag>{{v['username']}}</Tag>
					</router-link>
				<p class="introduce">{{plateInfo['info']}}</p>
			</div>
		</div>
		<div class="plate-container">
			<Row :gutter="16">
		        <Col span="6">
		            <DatePicker type="daterange" :options="options2" placement="bottom-start" placeholder="选择日期" @on-change="changeDate"></DatePicker>
		        </Col>
		        <Col span="6">
		        	<Input v-model="key_word" placeholder="请输入..." @on-enter="setKeyWordToConfig"></Input>
		    	</Col>
		    	<Col span="10">
		    		<Button type="primary" icon="ios-search" @click="setKeyWordToConfig">搜索</Button>
		    		<Button type="primary" icon="compose" @click="routerPush({path:'/mkwriting'}, '写文章')">写文章</Button>
		    	</Col>
		    </Row>
		    <hr style="margin: 10px 0;">
		    <div class="plate-content">
		    	<ul class="plate-content__list">
		    		<li v-for="(value, index) in plateList" :key="'platedetail_list_' + index">
		    			<img :src="value.pic" class="plate-content__item--right">
		    			<div class="plate-content__item--left">
		    				<h3>
								<router-link :to="{path: '/a/'+value.id}">{{value.title}}</router-link>
								<Tag color="yellow">{{value.typename}}</Tag>
							</h3>
							<p>
								<span class="article-info">
									<router-link :to="{path: '/u/'+value['create_user']['userid']}">
										<Avatar class="article-info__avatar" 
												size="small" 
												:src="value['create_user']['pic']" 
												:title="value['create_user']['username']"/>
									</router-link>
									<Icon type="thumbsup"></Icon>
									({{value.support}})
									<Icon type="chatbox-working"></Icon>
									({{value.suggest}})&nbsp;&nbsp;
								</span>
								( <Tag v-for="(label, i) in value.label" :key="'platedetail_article_tag_'+i">{{label}}</Tag>)
							</p>
			    			<p>{{value.abstracts}}</p>
		    			</div>
		    		</li>
		    	</ul>

		    	<Page 
					v-if="pageConfig.total"
		    		:total="pageConfig.total"
		    		show-sizer 
		    		:page-size-opts="[1,5,10,20,50]" 
		    		style="margin: 30px;" 
		    		@on-change="pageChange"
		    		@on-page-size-change="pageSizeChange"
		    		placement="top"></Page>

				<h2 v-if="pageConfig.total === 0">还没有相关内容的文章...</h2>
		    </div>
		</div>
	</div>
</template>

<script>
import plateApi from '@/api/plate'
import articleApi from '@/api/article'

export default {
	name: 'platedetail',
	data () {
		return {
			modal1: false,
			// url: config.url,
			plateInfo: '',
			plateid: this.$route.params.plateid,
			key_word: '',
			filterConfig: {
				'plate_id': this.$route.params.plateid,
				'sort':'desc',
				'sort_name':'update_time',	// 现在还没有其他的排序字段， 先按照时间倒序获取
				'key_word': '',
				'page_cur': 1,
				'page_num': 10,
				'start_time': '',
				'end_time': ''
			},
			a: 1,
			pageConfig: {
				total: 0
			},
			options2: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一年',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            return [start, end];
                        }
                    }
                ]
            },
			plateList: [],
			pageConfig: {
				total: 100
			}
		}
	},
	created () {
        this.getPlateInfo()
		this.requestArticleList()
	},
	methods: {
		getPlateInfo () {
			plateApi.getPlateList({
				data: {
					'plate_id': this.plateid
				},
				success: data => {
					this.plateInfo = data.result.result[0]
				},
				error: error => {
					console.log(error)
				}
			})
		},
		requestArticleList () {
			console.d(this.filterConfig)
            articleApi.getArticleList({
                data: this.filterConfig,
                success: data => {
					console.d(data)
                    this.pageConfig.total = data.result.total_num
                    this.plateList = data.result.result
                    for (let i in this.plateList) {
                        let type = this.plateList[i].type
                        if (type === 0) {
                            this.plateList[i]['typename'] = '原创'
                        } else if (type === 1) {
                            this.plateList[i]['typename'] = '转载'
                        } else if (type === 2) {
                            this.plateList[i]['typename'] = '翻译'
                        }
                    }
                },
                error: error => {
                    console.log(error)
                }
            })
		},
		routerPush (pathObj, text) {
			this.$router.push(pathObj)
		},
		setKeyWordToConfig () {
			console.log(this['key_word'])
			this.filterConfig['key_word'] = this['key_word']
		},
		pageChange (page) {
			this.filterConfig['page_cur'] = page
		},
		pageSizeChange (pageSize) {
			this.filterConfig['page_cur'] = 1
			this.filterConfig['page_num'] = pageSize
		},
		changeDate (dates) {
			this.filterConfig['start_time'] = dates[0]
			this.filterConfig['end_time'] = dates[1]
		},
		
	},
	watch: {
		filterConfig: {
			handler: function (val, oldVal) {
				this.requestArticleList();
			},
     		deep: true
		}
	}
}
</script>

<style scoped>
	@import 'platedetail.css';
</style>