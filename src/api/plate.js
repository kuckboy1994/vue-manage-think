// 板块类接口
import {LoadingBar} from 'iview'
import axios from 'axios'
import config from '@/common/config'
console.log(LoadingBar)

const plateApi = {
    // 板块查询接口
    getPlateList (callback, errorCallback) {
        LoadingBar.start()
        axios.get(config.url + 'api/plate/getPlateList')
            .then(response => {
                LoadingBar.finish()
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
            .catch(e => {
                LoadingBar.error()
                errorCallback()
                console.log(e)
            })
    },
    // 获得一个板块的id和名称
    getSimplePlateList (callback, errorCallback) {
        LoadingBar.start()
        axios.get(config.url + 'api/plate/getSimplePlateList')
            .then(response => {
                LoadingBar.finish()
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
            .catch(e => {
                LoadingBar.error()
                errorCallback()
                console.log(e)
            })
    },
    // 新增板块接口
    addPlate (callback, errorCallback) {
        LoadingBar.start()
        axios.get(config.url + 'api/plate/addPlate')
            .then(response => {
                LoadingBar.finish()
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
            .catch(e => {
                LoadingBar.error()
                errorCallback()
                console.log(e)
            })
    },
    // 修改板块接口
    editPlate (callback, errorCallback) {
        LoadingBar.start()
        axios.get(config.url + 'api/plate/editPlate')
            .then(response => {
                LoadingBar.finish()
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
            .catch(e => {
                LoadingBar.error()
                errorCallback()
                console.log(e)
            })
    },
    // 删除板块接口
    delPlate (callback, errorCallback) {
        LoadingBar.start()
        axios.get(config.url + 'api/plate/delPlate')
            .then(response => {
                LoadingBar.finish()
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
            .catch(e => {
                LoadingBar.error()
                errorCallback()
                console.log(e)
            })
    },
}

export default plateApi;