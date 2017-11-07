// 文章类接口
import axios from 'axios'
import config from '@/common/config'

const userApi = {
    // 获取用户个人信息
    getUserInfo (callback) {
        axios.get(config.url + 'api/user/getUserInfo')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 用户信息联想接口
    getLenovoUserList (callback) {
        axios.get(config.url + 'api/user/getLenovoUserList')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },

}

export default userApi;