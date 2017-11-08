import axios from 'axios'
import {url} from '@/common/config'

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
        const params = arg.data ? {
            params: arg.data
        } : {}
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
}

export default requestCore