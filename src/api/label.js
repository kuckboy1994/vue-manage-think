// 标签类接口
import axios from 'axios'
import config from '@/common/config'

const labelApi = {
    // 标签联想接口
    getLenovoLabelList (callback) {
        axios.get(config.url + 'api/menu/getLenovoLabelList')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 新增标签接口
    addLabel (callback) {
        axios.get(config.url + 'api/menu/addLabel')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
}

export default labelApi;