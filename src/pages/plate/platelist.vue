<template>
    <div class="platelist">
        <div class="option-bar">
            <Select class="option-bar__select--order-type" v-model="sortModel">
                <Option :value="0">默认</Option>
                <Option :value="1">最新</Option>
                <Option :value="2">最热门</Option>
                <!--<Option :value="3">最具潜力</Option>-->
            </Select>
            <Button type="primary" class="option-bar__button--add" @click="addmodal = true">新增</Button>
            <Modal title="新建板块" 
                class="addplate-modal" 
                v-model="addmodal"
                :styles="{top: '20px'}" 
                @on-ok="addPlate" 
                @on-cancel="cancelPlate">
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
                    <Select :remote="true" 
                            :remote-method="remoteUser" 
                            :loading="userLoading" 
                            v-model="addModalData.maintain_ids" 
                            :filterable="true" 
                            not-found-text="没有查询到相关用户" 
                            :multiple="true" 
                            placeholder="输入关键字获取用户列表">
                        <Option v-for="(item, index) in maintainIds" :value="item.id" :key="'platelist_maintain_ids_'+index">
                            <img :src="item.pic" width="30" height="30" style="float:left;">
                            <div class="addplate-modal__select-item-info">
                                <p>{{ item.name }}</p>
                                <p>{{item.email}}</p>
                            </div>
                        </Option>
                    </Select>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button type="warning" size="large" @click="resetPlate">重置</Button>
                    <Button type="dashed" size="large" @click="cancelPlate">取消</Button>
                    <Button type="error" size="large" :loading="modal_add_loading" @click="addPlate">确定</Button>
                </div>
            </Modal>
        </div>
        <ul class="platelist-container">
            <li v-for="(item, i) in platelist" v-if="item.status === 0" :key="'platelist_list_' + i">
                <img :src="item.pic" width="198" height="198">
                <div class="plateitem-detail">
                    <router-link :to="{path: 'platedetail/' + item['id']}">
                        <div class="plateitem-detail--hide">
                            <p>维护人：
                                <span v-if="item['maintain_user'].length === 0">暂无</span>
                            </p>
                            <Tag v-for="(user, index1) in item['maintain_user']" color="blue" :key="'platelist_maintain_user_'+index1" v-if="user">{{user['username']}} <img :src="user['pic']" style="width:15px;height:15px;border-radius: 50%;vertical-align: sub;"></Tag>
                            <p>标签：</p>
                            <Tag v-for="(label, index2) in item['label']" color="blue" :key="'platelist_label_'+index2">{{label}}</Tag>
                            <p>简介：</p>
                            <p>{{item.info}}</p>
                        </div>
                    </router-link>
                </div>
                <div class="plateitem-detail-info">
                    <p>{{item['plate_name']}}</p>
                    <p>创建人:{{item['create_user']['username']}}</p>
                    <router-link :to="{path: 'u/' + item['create_userid']}">
                        <img :src="item['create_user']['pic']" height="40" width="40">
                    </router-link>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
import plateApi from '@/api/plate'
import labelApi from '@/api/label'
import userApi  from '@/api/user'
import {upload} from '@/common/config'

export default {
    name: 'platelist',
    data () {
        return {
            upload: upload, // 上传地址
            platelist: [],  // 列表页面的渲染数据
            sortModel: 0,   // 排序
            picHolder: '',  // 模态框默认图片
            addmodal: false,    // 是否显示模态框
            addModalData: {
                plate_name: '',
                label: [],
                info: '',
                pic: 'https://avatars0.githubusercontent.com/u/19633245?v=4&s=460',
                userid: 1,
                maintain_ids: []
            },
            labels: [],     // 查询返回列表
            maintainIds: [],    // 查询返回列表
            labelLoading: false,    // 标签是否在loading
            userLoading: false,     // 用户是否在loading
            modal_add_loading: false,   // 添加等待
        }
    },
    created () {
        this.getPlateList()
    },
    methods: {
        getPlateList () {
            plateApi.getPlateList({
                success: data => {
                    this.platelist = data.result.result
                    this.sortData()
                }, 
                error: error => {
                    console.log(errrore)
                }
            })
        },
        sortData () {
			this.platelist = this.platelist.sort((a, b) => {
				switch (this.sortModel) {
					case 0:
						if (a['create_time'] < b['create_time']) {
							return 1;
						} else {
							return -1;
						}
						break;
					case 1:
						if (a['update_time'] > b['update_time']) {
							return 1;
						} else {
							return -1;
						}
						break;
					case 2:
						if (a['visit'] < b['visit']) {
							return 1;
						} else {
							return -1;
						}
						break;
				}
			})
		},
        addPlate () {
            this.modal_add_loading = true
            plateApi.addPlate({
                data: this.addModalData,
                success: data => {
                    this.modal_add_loading = false
                    setTimeout(() => {
                        this.addmodal = false
                        this.$Notice.success({
                            title: '新增板块成功',
                            desc: '您成功成为了一个板块的板块leader啦！快去发布文章吧'
                        })
                    }, 500)
                },
                error: error => {
					this.$Notice.error({
					    title: '新增板块失败',
					    desc: error
					})
                    this.modal_add_loading = false
                    console.log(error)
                }
            })
        },
        cancelPlate () {
            this.$Notice.info({
                title: '取消了新增板块',
                desc: '您取消了新增板块，真的很遗憾啊<br> Ｏ(≧口≦)Ｏ'
            })
            this.addmodal = false
        },
        resetPlate () {
            this.picHolder = ''
            this.addModalData = {
                plate_name: '',
                label: [],
                info: '',
                pic: 'https://avatars0.githubusercontent.com/u/19633245?v=4&s=460',
                userid: 1,
                maintain_ids: []
            }
            this.labels = []
            this.maintainIds = []
            this.$Notice.success({
                title: '重置成功'
            })
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
        remoteUser (query) {
			if (query !== '') {
				this.userLoading = true
                userApi.getLenovoUserList({
                    data: {
                        name: query
                    },
                    success: data => {
                        this.userLoading = false
                        this.maintainIds = []
                        for (let i in data.result) {
                            this.maintainIds.push(data.result[i])
                        }
                    },
                    error: error => {
                        userLoading = false
                        console.log(error)
                    }
                })
			} else {
				self.labels = []
			}
        }
    },
    watch: {
        sortModel (val) {
            this.sortModel = val
            this.sortData()
        }
    }
}
</script>

<style scoped>
    @import 'platelist.css';
</style>
