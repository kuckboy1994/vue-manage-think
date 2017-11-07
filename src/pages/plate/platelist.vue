<template>
    <div class="platelist">
        <div class="option-bar">
            <Select class="option-bar__select--order-type" @on-change="updateSort" value="0">
                <Option value="0">默认</Option>
                <Option value="1">最新</Option>
                <Option value="2">最热门</Option>
                <Option value="3">最具潜力</Option>
            </Select>
            <Button type="primary" class="option-bar__button--add" @click="addmodal = true">新增</Button>
            <Modal title="新建板块" class="addplate-modal" v-model="addmodal" @on-ok="addBlock" @on-cancel="cancelBlock">
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块LOGO:</div>
                    </Col>
                    <Col span="18">
                        <Upload name="file" ref="upload" :on-success="upLoadSuccess" :format="['jpg','jpeg','png']" :max-size="2048" multiple type="drag" :action="upload" class="addplate-modal__upload">
                            <div class="addplate-modal__upload--preview">
                                <img v-if="picHolder" :src="picHolder" width="180" height="180">
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
                        <Input v-model="addModalData.info" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="100" placeholder="请输入板块说明..."></Input>
                    </Col>
                </Row>
                <br>
                <Row :gutter="16">
                    <Col span="6">
                        <div class="addplate-modal--line-title">板块标签:</div>
                    </Col>
                    <Col span="18">
                        <Select remote :remote-method="remoteLabels" :loading="labelLoading" v-model="addModalData.label" :filterable="true" :multiple="true" not-found-text="回车增加新标签" ref="labelSelect" placeholder="输入关键字获取标签列表" @keyup.native.13="addLabel">
                            <Option v-for="(item, index) in labels" :value="item" :key="'blocklist_label_list_'+index">{{ item }}</Option>
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
            <li v-for="(item, i) in blocklist" v-if="item.status === 0">
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
                <div class="block-info">
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
import {upload} from '@/common/config'

export default {
    name: 'platelist',
    data () {
        return {
            upload: upload,
            blocklist: [],
            sortOption: {
                type: 0
            },
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
        const self = this
        // this.$Loading.start()
        plateApi.getPlateList(data => {
            console.log(data)
            // this.$Loading.finish()
        }, e => {
            console.log(e)
            // this.$Loading.error()
        })
        // self.axios.get(self.url + 'api/plate/getPlateList')
        //     .then(function (response) {
        //         self.$Loading.finish();
        //         // console.log(response.data)
        //         var data = response.data;
        //         if (data['error_code'] !== 0) {
        //             return
        //         }
        //         self.blocklist = data.result.result
        //     }).catch(function (error) {
        //         console.log(error);
        //         self.$Loading.error();
        //     })
    },
    methods: {
        updateSort () {

        },
        addBlock () {

        },
        cancelBlock () {

        },
        upLoadSuccess () {

        },
        remoteLabels () {

        },
        remoteUser () {

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
</style>
