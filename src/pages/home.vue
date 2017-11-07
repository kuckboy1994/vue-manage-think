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
  
        <div class="home__content" :style="'marginLeft:'+expand.homeContentML+'px'">
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
				icon: '\<Icon type=\"arrow-expand\"\>\<\/Icon\>'
			},
            breadcrumbData: [],
			activeName: '',
			openName: [],
			menuList: []
        }
    },
    created () {
        menuApi.getMenuList(data => {
            this.menuList = data.result
        })

    },
    methods: {
        togglePageSize () {
            this.expand.isShowSlider  = !this.expand.isShowSlider;
		    this.expand.homeContentML = this.expand.homeContentML === 220 ? 15 : 220;
        },
        changeBreadcrumb (data) {
			const self = this

			var indexX = ''
			var indexY = ''
			var x, y
			for (x in self.menuList) {
				// self.openName = self.menuList[x]['menu_name']
				for (y in self.menuList[x]['children']) {
					if (data === self.menuList[x]['children'][y]['menu_name']) {
						indexX = x
						indexY = y
					}
				}
			}

			if (indexX && indexY) {
				self.breadcrumbData = new Array(self.menuList[indexX]['menu_name'], self.menuList[indexX]['children'][indexY]['menu_name'])
			} else {
				let dataArr = data.split('-')
				self.breadcrumbData = [dataArr[dataArr.length-1]]
			}
		},
    },
    mounted () {

    }
}
</script>

<style scoped>
.home__header {
    position: relative;
    min-width: 1000px;
    height: 55px;
    box-shadow: 0 0 6px #aaa;
}
.logo {
    color: #35495e;
    font-size: 20px;
    font-weight: bold;
    width: 200px;
    line-height: 55px;
    margin-left: 10px;
}
.logo__img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    
}
.logo__span {
    color: #41b883;
}
.option-box {
    position: absolute;
    left: 210px;
    top: 0;
    width: 100px;
    height: 55px;
}
.option-box__expand {
    font-size: 30px;
    padding: 0;
}
.login-info {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 999;
    font-size: 14px;
}

.user--avatar {
    vertical-align: top;
    width: 20px;
    transform: translateX(-7px) scale(1.5);
    border-radius: 3px;
}
.user--name {
    font-size: 14px;
}

.home__slider {
    width: 200px;
    position: absolute;
    top: 55px;
    left: 0;
    background: #464c5b;
    box-shadow: 0 0 6px #aaa;
}

.home__content {
    margin-left: 220px;
    margin-right: 15px;
    transition: margin .1s linear;
}
.home__content--breadcrumb {
    padding: 10px 15px 0 0;
}
.home__content--content {
    min-height: 500px;
    margin: 10px 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px #aaa;
}
.home__content--copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4; 
}

/* 通用样式 */
.fs-normal {
    font-size: 14px;
}

/* 动画 */
.side-enter {
    opacity: 0;
    transform: translateX(-220px);
}

.side-enter-active {
    transition: all .1s linear;
}

.side-leave {}

.side-leave-active {
    transition: all .1s linear;
    transform: translateX(-220px);
    opacity: 0;
}

</style>
