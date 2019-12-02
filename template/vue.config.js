module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            "/v1": {
                target: "http://120.77.181.32",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/v1": ""
                }
            }
        }
    }
}