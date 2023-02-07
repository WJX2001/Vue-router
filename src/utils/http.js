import axios from "axios";

const MOCK_URL = 'http://127.0.0.1:4523/m1/2110070-0-default'

const PRODUCTION_URL = 'http://jisutqybmf.market.alicloudapi.com'

const TEST_URL = 'http://localhost:3000/api'

const http = axios.create({
    baseURL: TEST_URL,
    timeout: 1000,
    headers: {
        Authorization: 'APPCODE 946883cc4e8145e2bde5b812b61a312c'
    }
}) 

export {
     http
}



