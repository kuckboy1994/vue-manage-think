// 菜单类所有接口
import requestCore from '@/api/request-core'

class menuApi extends requestCore {
    // 获取所有菜单接口
    getMenuList (arg, ...other) {
        this.get('api/menu/getMenuList', arg)
    }

    // 编辑所有菜单接口
    editMenuList (arg, ...other) {
        this.get('api/menu/editMenuList', arg)
    }

    // 添加单个菜单接口
    addMenu (arg, ...other) {
        this.get('api/menu/addMenu', arg)
    }

    // 编辑单个菜单接口
    editMenu (arg, ...other) {
        this.get('api/menu/editMenu', arg)
    }

    // 删除单个菜单接口
    delMenu (arg, ...other) {
        this.get('api/menu/delMenu', arg)
    }

}

export default new menuApi()