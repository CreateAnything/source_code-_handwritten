const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    mode:'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    devServer: {
        open:true,
        port: 3000,
        static: './dist',
        hot:true
    },
    module: {
        rules: [
            {
                test:/\.ts$/, 
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, './ts.config.json')
        　　　　 }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename:'index.html'
       }) 
    ],
    resolve: {
        extensions:['.ts','.js']
    }
}