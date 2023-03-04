const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'man.js'
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
                test: /\.ts$/,
                loader:'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.json')
        　　　　 }
            }
        ]
    },
    resolve: {
        extensions:['.ts','.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename:'index.html'
        })
    ]
    
}