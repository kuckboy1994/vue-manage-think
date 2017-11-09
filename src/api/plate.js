// 板块类接口
import requestCore from '@/api/request-core'

class plateApi extends requestCore {
    constructor () {
        super()
    }
    // 板块查询接口
    getPlateList (arg, ...other) {
        this.get('api/plate/getPlateList', arg)
    }

    // 获得一个板块的id和名称
    getSimplePlateList (arg, ...other) {
        this.get('api/plate/getSimplePlateList', arg)
    }

    // 新增板块接口
    addPlate (arg, ...other) {
        this.post('api/plate/addPlate', arg)
    }

    // 修改板块接口
    editPlate (arg, ...other) {
        this.get('api/plate/editPlate', arg)
    }

    // 删除板块接口
    delPlate (arg, ...other) {
        this.get('api/plate/delPlate', arg)
    }


}

export default new plateApi()