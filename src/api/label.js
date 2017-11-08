// 标签类接口
import requestCore from '@/api/request-core'

class labelApi extends requestCore {
    // 标签联想接口
    getLenovoLabelList (arg, ...other) {
        this.get('api/label/getLenovoLabelList', arg)
    }

    // 新增标签接口
    addLabel (arg, ...other) {
        this.get('api/label/addLabel', arg)
    }
}

export default new labelApi()