// 文章类接口
import requestCore from '@/api/request-core'

class articleApi extends requestCore {
    // 新增文章接口
    addArticle (arg, ...other) {
        this.post('api/article/addArticle', arg)
    }

    // 编辑文章接口
    editArticle (arg, ...other) {
        this.post('api/article/editArticle', arg)
    }

    // 获取文章列表接口
    getArticleList (arg, ...other) {
        this.get('api/article/getArticleList', arg)
    }

    // 删除文章接口
    delArticle (arg, ...other) {
        this.get('api/article/delArticle', arg)
    }
}

export default new articleApi()