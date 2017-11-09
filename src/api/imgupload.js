// 文章类接口
import requestCore from '@/api/request-core'

class imgUpload extends requestCore {
    // 新增文章接口
    upload (arg, ...other) {
        this.postH('api/upload', arg)
    }

}

export default new imgUpload()