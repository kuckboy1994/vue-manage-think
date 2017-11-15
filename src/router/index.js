import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

// 首页
import homePage from '@/pages/home'

// 板块
import platelistPage from '@/pages/plate/platelist'
import platedetailPage from '@/pages/plate/platedetail'
import aPage from '@/pages/plate/a'

// 文章编写
import mkwritingPage from '@/pages/mkwriting'

// 用户信息页面
import uPage from '@/pages/user/u'

// 菜单管理页面
import menuPage from '@/pages/menu/manage'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/platelist',
      component: homePage,
      children: [
        {
          path: '/platelist',
          name: '板块列表',
          component: platelistPage
        },
        {
          path: '/platedetail/:plateid',
          name: '板块详情',
          component: platedetailPage
        },
        {
          path: '/mkwriting',
          name: '写文章',
          component: mkwritingPage
        },
        {
          path: '/mkwriting/:articleid',
          name: '写文章',
          component: mkwritingPage
        },
        {
          path: '/a/:articleid',
          name: '文章',
          component: aPage
        },
        {
          path: '/u/:userid',
          name: '用户信息',
          component: uPage
        },
        {
          path: '/menu/manage',
          name: '菜单管理',
          component: menuPage
        },
      ]
    }
  ]
})

// 路由设置页面的title和增加了请求进度动画
router.beforeEach((to, from, next)=>{
    iView.LoadingBar.start()
    document.title = to.name
    next()
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish()
})

export default router