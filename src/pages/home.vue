<template>
    <div class="home">
        <div class="home__header">
            <div class="logo">
                <img src="../assets/img/logo.png" class="logo__img"  alt="think">
                <span class="logo__span">TH</span>ink
                <Tag>beta</Tag>
            </div>
            <div class="option-box">
                <Button type="text" class="option-box__expand" @click="togglePageSize()">
                    <Icon type="arrow-expand" v-if="expand.isShowSlider"></Icon>
                    <Icon type="arrow-shrink" v-if="!expand.isShowSlider"></Icon>
                </Button>
            </div>
            <Dropdown class="login-info">
                <Button type="ghost">
                    <img src="../assets/img/avatar.jpg" class="user--avatar">
                    <span class="user--name">Kuckboy</span>
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>
                        <div @click="routerPush({path:'/u/1'},'用户信息1')">
                            <span class="fs-normal"><Icon type="person"></Icon> | 我的主页</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem>
                        <span class="fs-normal"><Icon type="settings"></Icon> | 设置</span>
                    </DropdownItem>
                    <DropdownItem>
                        <div @click="routerPush({path:'/mkwriting'},'写文章')">
                            <span class="fs-normal"><Icon type="compose"></Icon> | 写文章</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem divided>
                        <span class="fs-normal"><Icon type="log-in"></Icon> | 退出</span>
                    </DropdownItem>
                    <DropdownItem>
                        <span class="fs-normal"><Icon type="log-out"></Icon> | 登录</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
 
        <transition name="side" mode="in-out">
            <div class="home__slider" v-show="expand.isShowSlider">
                <Menu ref="leftMenu" theme="dark" width="auto" :open-names="openName" :active-name="activeName" @on-select="changeBreadcrumb">
                    <Submenu :key="'menu_'+value.id" v-for="(value, key) in menuList" :name="value['menu_name']">
                        <template slot="title">
                            <Icon :type="value['icon']"></Icon>
                            {{value.menu_name}}
                        </template>
                        <router-link v-for="(v, k) in value['children']" :to="{path: v.url}" :key="'menu_' + v.id">
                            <MenuItem :name="v['menu_name']">{{v['menu_name']}}</MenuItem>
                        </router-link>
                    </Submenu>
                </Menu>
            </div>
        </transition>
  
        <div class="home__content" :style="'marginLeft:'+expand.homeContentML+'px;min-width:' + expand.homeContentMW +'px'">
            <div class="home__content--breadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem>THink前端平台</BreadcrumbItem>
                    <BreadcrumbItem :key="'breadcrumbData_'+key" v-for="(item, key) in breadcrumbData">{{item}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="home__content--content">
                <router-view></router-view>
            </div>
            <div class="home__content--copy">
                2017-2017 &copy; THink
            </div>
        </div>

        <BackTop></BackTop>
    </div>
</template>

<script>
import menuApi from '@/api/menu'

export default {
    name: 'home',
    data() {
        return {
            expand: {
				isShowSlider: true,
				homeContentML: 220,
                homeContentMW: 765,
				icon: '\<Icon type=\"arrow-expand\"\>\<\/Icon\>'
			},
            breadcrumbData: [],
			activeName: '',
			openName: [],
			menuList: []
        }
    },
    created () {
        menuApi.getMenuList({
            success: data => {
                this.menuList = data.result
            }
        })
    },
    methods: {
        togglePageSize () {
            this.expand.isShowSlider  = !this.expand.isShowSlider;
		    this.expand.homeContentML = !this.expand.isShowSlider ? 15 : 220;
            this.expand.homeContentMW = !this.expand.isShowSlider ? 970 : 765;
        },
        changeBreadcrumb (data) {
            console.log(data)
			var indexX = ''
			var indexY = ''
			for (let x in this.menuList) {
				// this.openName = this.menuList[x]['menu_name']
				for (let y in this.menuList[x]['children']) {
					if (data === this.menuList[x]['children'][y]['menu_name']) {
						indexX = x
						indexY = y
					}
				}
			}

			if (indexX && indexY) {
				this.breadcrumbData = new Array(this.menuList[indexX]['menu_name'], this.menuList[indexX]['children'][indexY]['menu_name'])
			} else {
				let dataArr = data.split('-')
				this.breadcrumbData = [dataArr[dataArr.length-1]]
			}
		},
    },
    mounted () {

    }
}
</script>

<style scoped>
    @import 'home.css';
</style>
