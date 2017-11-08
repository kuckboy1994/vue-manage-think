<template>
	<div class="platedetail">
		<div class="platedetail__info" v-if="blockInfo">
			<img :src="blockInfo['pic']">
			<div class="platedetail__info--right">
				<h1>{{blockInfo['plate_name']}}</h1>
				<p class="create">创建人：{{blockInfo['create_user']['username']}} &nbsp; 创建时间：{{blockInfo['create_time'].substr(0,10)}}</p>
				<p class="charge">负责人：<Tag v-for="(v, i) in blockInfo['maintain_user']" :key="i">{{v['username']}}</Tag>
				<p class="introduce">{{blockInfo['info']}}</p>
			</div>
		</div>
		<div class="plate-container">
			<Row :gutter="16">
		        <Col span="6">
		            <DatePicker type="daterange" :options="options2" placement="bottom-start" placeholder="选择日期" @on-change="changeDate"></DatePicker>
		        </Col>
		        <Col span="6">
		        	<Input v-model="key_word" placeholder="请输入..."></Input>
		    	</Col>
		    	<Col span="10">
		    		<Button type="primary" icon="ios-search" @click="setKeyWordToConfig">搜索</Button>
		    		<Button type="primary" icon="compose" @click="routerPush({path:'/writing'},'写文章')">写文章</Button>
		    	</Col>
		    </Row>
		    <hr style="margin: 10px 0;">
		    <div class="plate-content">
		    	<ul class="plate-content__list">
		    		<li v-for="(value, index) in blockList">
		    			<img :src="value.pic" class="plate-content__item--right">
		    			<div class="plate-content__item--left">
		    				<h3><router-link :to="{path: '/a/'+value.id}">{{value.title}}</router-link> <Tag color="yellow">{{value.typename}}</Tag>( <Tag v-for="(label, i) in value.label" :key="'blockdetail_article_tag_'+i">{{label}}</Tag>)</h3>
			    			<div class="article-bar"><Icon type="thumbsup"></Icon> ({{value.support}}) <Icon type="chatbox-working"></Icon> ({{value.suggest}})&nbsp;&nbsp;<Avatar style="background-color: #87d068; vertical-align: middle;" size="small" :src="value['create_user']['pic']" :title="value['create_user']['username']"/></div>
			    			<p>{{value.abstracts}}</p>
		    			</div>
		    		</li>
		    	</ul>

		    	<Page 
		    		:total="pageConfig.total"
		    		show-sizer 
		    		:page-size-opts="[1,5,10,20,50]" 
		    		style="margin: 30px;" 
		    		@on-change="pageChange"
		    		@on-page-size-change="pageSizeChange"
		    		placement="top"></Page>
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
		const self = this
		return {
			modal1: false,
			// url: config.url,
			blockInfo: '',
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
				total: 100

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
                    }
                ]
            },
			blockList: [],
			pageConfig: {
				total: 100
			}
		}
	},
	created () {
        plateApi.getPlateList({
            data: {
                'plate_id': this.plateid
            },
            success: data => {
                
                this.blockInfo = data.result[0]
                // console.d(this.blockInfo)
            },
            error: error => {
                console.log(error)
            }
        })
		this.requestArticleList()
	},
	methods: {
		routerPush (pathObj, data) {
			const self = this
			this.$router.push(pathObj)
/*			this.changeBreadcrumb(data)
			this.activeName = ''
			let temp = this.menuList
			this.menuList = []
			setTimeout(function () {
				self.menuList = temp
			})*/
		},
		setKeyWordToConfig () {
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
			console.log(dates[0], dates[1])
			this.filterConfig['start_time'] = dates[0]
			this.filterConfig['end_time'] = dates[1]
		},
		requestArticleList () {
            articleApi.getArticleList({
                data: this.filterConfig,
                success: data => {
                    console.d(data)
                    this.pageConfig.total = data.result.length
                    // console.log(response.data.result)
                    this.blockList = data.result
                    for (let i in this.blockList) {
                        let type = this.blockList[i].type
                        if (type === 0) {
                            this.blockList[i]['typename'] = '原创'
                        } else if (type === 1) {
                            this.blockList[i]['typename'] = '转载'
                        } else if (type === 2) {
                            this.blockList[i]['typename'] = '翻译'
                        }
                    }
                },
                error: error => {
                    console.log(error)
                }
            })
		}
	},
	watch: {
		filterConfig: {
			handler: function (val, oldVal) {
				console.log('filterConfig')
				this.requestArticleList();
			},
     		deep: true
		}
	}
}
</script>

<style scoped>
.platedetail {
	padding: 40px 60px;
	min-height: 600px;
}
.platedetail__info {
	max-width: 1000px;
	height: 190px;
	margin: 0 auto;
	position: relative;
}
.platedetail__info>img{
	position: absolute;
	width: 150px;
	height: 150px;
	margin-top: 10px;
	left: 0;
	top: 0;
}
.platedetail__info--right {
	margin-left: 180px;
    overflow: hidden;
}
.platedetail__info--right h1 {
    margin-top: 10px;
}
.platedetail__info--right p {
	font-size: 14px;
}
.platedetail__info--right .create, .platedetail__info--right .charge {
	margin-bottom: 5px;
}
.platedetail__info--right .introduce {
	display: inline-block;
	overflow: hidden;
    /* text-overflow: ellipsis;
	white-space: nowrap; */
	height: 60px;
	width: 100%;
}
.plate-container {
	max-width: 1000px;
	margin: 0 auto;
	position: relative;
}
.plate-content__list {

}
.plate-content__list li {
	overflow: hidden;
	margin-bottom: 10px;
	border-bottom: 1px dashed #ccc;
	padding-bottom: 10px;
}
.plate-content__item--left {
	position: relative;
	margin-right: 150px;
}
.plate-content__item--right {
	width: 100px;
	height: 100px;
	float: right;
}
.article-bar {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 14px;
	background-color: #fff;
}
</style>