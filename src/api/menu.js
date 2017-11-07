// 菜单类所有接口
import axios from 'axios'
import config from '@/common/config'

const menuApi = {
    // 获取所有菜单接口
    getMenuList (callback) {
        axios.get(config.url + 'api/menu/getMenuList')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 编辑所有菜单接口
    editMenuList (callback) {
        axios.get(config.url + 'api/menu/editMenuList')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 添加单个菜单接口
    addMenu (callback) {
        axios.get(config.url + 'api/menu/addMenu')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 编辑单个菜单接口
    editMenu (callback) {
        axios.get(config.url + 'api/menu/editMenu')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 删除单个菜单接口
    delMenu (callback) {
        axios.get(config.url + 'api/menu/delMenu')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
}

export default menuApi;