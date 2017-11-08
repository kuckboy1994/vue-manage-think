// 文章类接口
import requestCore from '@/api/request-core'

class userApi extends requestCore {
    // 获取用户个人信息
    getUserInfo (arg, ...other) {
        this.get('api/user/getUserInfo', arg)
    }

    // 用户信息联想接口
    getLenovoUserList (arg, ...other) {
        this.get('api/user/getLenovoUserList', arg)
    }
}

export default new userApi()