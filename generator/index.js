module.exports = (api, options, rootOptions) => {
    // 复制并用 ejs 渲染 `./template` 内所有的文件
    api.render('../template')
    // 修改 `package.json` 里的字段
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            'js-cookie': '^2.2.0',
            'normalize.css': '^8.0.1',
            "ant-design-vue": "^1.4.1",
            "vue-particles": "^1.0.9"
        },
        devDependencies:{
            "mockjs": "^1.1.0"
        },
        scripts: {
            'dev': 'vue-cli-service serve',
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        }
    })
}