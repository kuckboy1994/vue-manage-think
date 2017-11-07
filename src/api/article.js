// 文章类接口
import axios from 'axios'
import config from '@/common/config'

const articleApi = {
    // 新增文章接口
    addArticle (callback) {
        axios.get(config.url + 'api/article/addArticle')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 编辑文章接口
    editArticle (callback) {
        axios.get(config.url + 'api/article/editArticle')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 获取文章列表接口
    getArticleList (callback) {
        axios.get(config.url + 'api/article/getArticleList')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
    // 删除文章接口
    delArticle (callback) {
        axios.get(config.url + 'api/article/delArticle')
            .then(response => {
                if (response['data']['error_code'] === 0) {
                    callback(response['data'])
                }
            })
    },
}

export default articleApi;