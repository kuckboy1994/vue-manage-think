<template>
    <div class="platelist">
        <div class="option-bar">
            <Select class="option-bar__select--order-type" v-model="sortModel">
                <Option :value="0">默认</Option>
                <Option :value="1">最新</Option>
                <Option :value="2">最热门</Option>
                <Option :value="3">最具潜力</Option>
            </Select>
            <Button type="primary" class="option-bar__button--add" @click="addmodal = true">新增</Button>
            <Modal title="新建板块" 
                class="addplate-modal" 
                v-model="addmodal"
                :styles="{top: '20px'}" 
                @on-ok="addBlock" 
                @on-cancel="cancelBlock">
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块LOGO:</div>
                    </Col>
                    <Col span="18">
                        <Upload name="file" 
                                ref="upload" 
                                :on-success="upLoadSuccess" 
                                :format="['jpg','jpeg','png']" 
                                :max-size="2048" 
                                type="drag" 
                                :action="upload" 
                                class="addplate-modal__upload">
                            <div class="addplate-modal__upload--preview">
                                <img v-if="picHolder" :src="picHolder" width="200" height="200">
                                <Icon v-if="!picHolder" type="camera" size="50"></Icon>
                            </div>
                        </Upload>
                    </Col>
                </Row>
                <br>
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块名称:</div>
                    </Col>
                    <Col span="18">
                        <Input v-model="addModalData.plate_name" placeholder="请输入板块名称..." :maxlength="20"></Input>
                    </Col>
                </Row>
                <br>
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块说明:</div>
                    </Col>
                    <Col span="18">
                        <Input v-model="addModalData.info" 
                            type="textarea" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            :maxlength="100" 
                            placeholder="请输入板块说明..."></Input>
                    </Col>
                </Row>
                <br>
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块标签:</div>
                    </Col>
                    <Col span="18">
                        <Select :remote="true" 
                                :remote-method="remoteLabels" 
                                :loading="labelLoading" 
                                v-model="addModalData.label" 
                                :filterable="true" 
                                :multiple="true" 
                                not-found-text="回车增加新标签" 
                                ref="labelSelect" 
                                placeholder="输入关键字获取标签列表" 
                                @keyup.native.13="addLabel">
                            <Option v-for="(item, index) in labels" :value="item" :key="'platelist_modal_label_'+index">{{ item }}</Option>
                        </Select>
                    </Col>
                </Row>
                <br>
                <Row :gutter="16">
                    <Col span="6">
                    <div class="addplate-modal--line-title">板块维护人:</div>
                    </Col>
                    <Col span="18">
                    <Select remote :remote-method="remoteUser" :loading="userLoading" v-model="addModalData.maintain_ids" :filterable="true" not-found-text="没有查询到相关用户" :multiple="true" placeholder="输入关键字获取用户列表">
                        <Option v-for="(item, index) in maintainIds" :value="item.id" :key="'blocklist_maintain_ids_'+index">
                            <img :src="item.pic" width="30" height="30" style="float:left;">
                            <div class="addplate-modal__select-item-info">
                                <p>{{ item.name }}</p>
                                <p>{{item.email}}</p>
                            </div>
                        </Option>
                    </Select>
                    </Col>
                </Row>
            </Modal>
        </div>
        <ul class="platelist-container">
            <li v-for="(item, i) in platelist" v-if="item.status === 0">
                <img :src="item.pic" width="198" height="198">
                <div class="plateitem-detail">
                    <router-link :to="{path: 'blockdetail/'+item['id']}">
                        <div class="plateitem-detail--hide">
                            <p>维护人：
                                <span v-if="item['maintain_user'].length === 0">暂无</span>
                            </p>
                            <Tag v-for="(user, index1) in item['maintain_user']" color="blue" :key="'blocklist_maintain_user_'+index1" v-if="user">{{user['username']}} <img :src="user['pic']" style="width:15px;height:15px;border-radius: 50%;vertical-align: sub;"></Tag>
                            <p>标签：</p>
                            <Tag v-for="(label, index2) in item['label']" color="blue" :key="'blocklist_label_'+index2">{{label}}</Tag>
                            <p>简介：</p>
                            <p>{{item.info}}</p>
                        </div>
                    </router-link>
                </div>
                <div class="plateitem-detail-info">
                    <p>{{item['plate_name']}}</p>
                    <p>创建人:{{item['create_user']['username']}}</p>
                    <img :src="item['create_user']['pic']" height="40" width="40">
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
import plateApi from '@/api/plate'
import labelApi from '@/api/label'
import {upload} from '@/common/config'

export default {
    name: 'platelist',
    data () {
        return {
            upload: upload,
            platelist: [],
            sortModel: 0,

            picHolder: '',
            addmodal: false,
            addModalData: {
                plate_name: '',
                label: [],
                info: '',
                pic: 'https://avatars0.githubusercontent.com/u/19633245?v=4&s=460',
                userid: 1,
                maintain_ids: []
            },
            labels: [],

            maintainIds: [],
            labelLoading: false,
            userLoading: false
            // tempLabel: null,
        }
    },
    created () {
        plateApi.getPlateList({
            success: data => {
                this.platelist = data.result.result
            }, 
            error: error => {
                console.log(errrore)
            }
        })
    },
    methods: {
        sortData () {
			this.platelist = this.platelist.sort((a, b) => {
				switch (this.sortModel) {
					case '0':
						if (a['create_time'] <= b['create_time']) {
							return 1;
						} else {
							return -1;
						}
						break;
					case '1':
						if (a['update_time'] <= b['update_time']) {
							return 1;
						} else {
							return -1;
						}
						break;
					case '2':
						if (a['visit'] <= b['visit']) {
							return 1;
						} else {
							return -1;
						}
						break;
					case '3':
						if (a['article_count'] <= b['article_count']) {
							return 1;
						} else {
							return -1;
						}
						break;
				}
			})
		},
        addBlock () {

        },
        cancelBlock () {

        },
        upLoadSuccess (res, file) {
			this.picHolder = res.filename
			this.addModalData.pic = res.filename
			setTimeout(() => {
				this.$refs.upload.clearFiles()
			}, 1500)
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
        remoteUser () {

        }
    },
    watch: {
        sortModel (val) {
            console.d(val)
            this.sortData()
        }
    }
}
</script>

<style scoped>
.platelist {
    padding: 40px 30px;
}
.option-bar {

}
.option-bar__select--order-type {
    width:140px;
    margin-left: 30px;
}
.option-bar__button--add {
    margin-left: 15px
}

.addplate-modal {
    /*top: 20px;*/
}
.addplate-modal--line-title {
    font-size: 14px;
	text-align: right;
}
.addplate-modal__upload {
    display: inline-block;
    width:200px;
}
.addplate-modal__upload--preview {
    width: 200px;
	height: 200px;
	line-height:  220px;
}
.addplate-modal__select-item-info {
    width: 150px;
	display: inline-block;
	margin-left: 10px;
}

.platelist-container {
    margin-top: 20px;
	overflow: hidden;
}
.platelist-container li {
	float: left;
	margin: 15px 29px 29px;
	width: 200px;
	border: 1px solid #ccc;
	position: relative;
}
.platelist-container li>img {
	cursor: pointer;
}
.plateitem-detail {
    position: absolute;
	width: 198px;
	height: 198px;
	top: 0;
	left: 0;
	overflow: hidden;
}
.plateitem-detail--hide {
    box-sizing: border-box;
	padding: 10px;
	width: 100%;
	height: 100%;
	background-color: rgba(200,200,200, 0.7);
	transform: translateY(-200px);
	transition: all .5s ease;
	color: #000;
}
.plateitem-detail:hover .plateitem-detail--hide {
	transform: translateY(0);
}
.plateitem-detail-info {
    width: 200px;
	height: 60px;
	position: relative;
	padding: 10px 15px;
}
.plateitem-detail-info p:nth-child(1) {
	font-weight: bold;
}
.plateitem-detail-info p:nth-child(2) {
	color: #aaa;
}
.plateitem-detail-info img {
	border-radius: 50%;
	border: 1px solid #ccc;
	position: absolute;
	top: 10px;
	right: 15px;
	cursor: pointer;
	transition: all .5s ease;
}
.plateitem-detail-info img:hover {
	transform: rotate(360deg);
}

</style>
