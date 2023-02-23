module.exports = (api, options, rootOptions) => {
    api.render('../template')
    // 修改 `package.json` 里的字段
    // api.extendPackage：用来会扩展项目中的package.json中的参数，包括依赖、scripts以及其他在package.json中用到的配置
    api.extendPackage({
        dependencies: {
            "axios": "^1.3.3",
            "core-js": "^3.8.3",
            "qs": "^6.11.0",
        },
        devDependencies: {
            'vconsole-webpack-plugin': '^1.5.2',
            "file-loader": "^6.2.0",
            "less": "^4.1.3",
            "url-loader": "^4.1.1"
        },
        scripts: {
            "serve": "vue-cli-service serve",
            "serveqa": "vue-cli-service serve --mode qa",
            "buildqa": "vue-cli-service build --mode qa",
            "build": "vue-cli-service build --mode online",
            "lint": "vue-cli-service lint"
        }
    })
}