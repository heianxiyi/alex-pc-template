import demo from './json/demo';
const Mock = require('mockjs')
// 配置延时
Mock.setup({
    timeout: '100-500'
})

const demoData = function () {
    return {
        "head": {
            "resTime": "2019-06-04 15:01:27",
            "ticket": null,
            "respCode": 0,
            "respMsg": "操作成功",
            "sessionId": null
        },
        "body": demo
    }
}

const login = function (params) {
    let where = JSON.parse(params.body);
    let result;
    if (where.userName == 'admin' && where.password == 'admin') {
        result = {
            "head": {
                "resTime": "2019-06-04 15:01:27",
                "ticket": null,
                "respCode": 0,
                "respMsg": "操作成功",
                "sessionId": null
            }
        }
    } else {
        result = {
            "head": {
                "resTime": "2019-06-04 15:01:27",
                "ticket": null,
                "respCode": 1,
                "respMsg": "用户名或者密码错误",
                "sessionId": null
            }
        }
    }
    return result
}



Mock.mock('/get/demo', 'get', demoData)
Mock.mock('/login', 'post', login)
