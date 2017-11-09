import axios from 'axios'
import {url, urlc, upload} from '@/common/config'

class requestCore {

    get (api, arg) {
        const params = arg.data ? {
            params: arg.data
        } : {}
        axios.get(url + api, 
            params
        ).then(response => {
            if (response['data']['error_code'] === 0) {
                arg.success ? arg.success(response['data']) : ''
            } else {
                arg.error ? arg.error(response['data'][error_msg]) : ''
            }
        }).catch(e => {
            arg.error ? arg.error(e) : ''
        })
    }

    post (api, arg) {
        const params = arg.data ?arg.data : {}
        axios.post(url + api, 
            params
        ).then(response => {
            if (response['data']['error_code'] === 0) {
                arg.success ? arg.success(response['data']) : ''
            } else {
                arg.error ? arg.error(response['data'][error_msg]) : ''
            }
        }).catch(e => {
            arg.error ? arg.error(e) : ''
        })
    }

    // 图片上传使用
    postH (api, arg) {
        axios({
            url: urlc + api,
            method: 'post',
            data: arg.data,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            arg.success(response['data'])
            // if (response['data']['error_code'] === 0) {
            //     arg.success ? arg.success(response['data']) : ''
            // } else {
            //     arg.error ? arg.error(response['data'][error_msg]) : ''
            // }
        }).catch(e => {
            arg.error ? arg.error(e) : ''
        })
    }
}

export default requestCore