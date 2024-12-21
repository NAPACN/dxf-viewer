/**
 * webpack.config
 *
 * Created by Igor.N on 11.03.2024 23:36
 *
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = ({ development }) => ({
    entry: development ?'./src/indexDev.ts':'./src/index.ts',
    devtool: development ? 'inline-source-map' : false,
    optimization: {
       // minimize: development ? false :true ,
       minimize: true,
       minimizer: [
           false && new TerserPlugin({
               terserOptions: {
                   compress: {
                       drop_console: true, // 移除 console.log 语句
                       drop_debugger: true, // 移除 debugger 语句
                       // 其他压缩选项...
                   },
                   mangle: {
                       properties: {
                           // 混淆对象属性名（注意：这可能会导致代码难以调试）
                           // regex: /^_/  // 例如，只混淆以 _ 开头的属性名
                       },
                   },
                   output: {
                       comments: false, // 移除注释
                       // 其他输出选项...
                   },
                   // 其他 Terser 选项...
               },
               extractComments: false, // 不将注释提取到单独的文件中
               // 其他 TerserPlugin 选项...
           }),
       ]
    },
    mode: development ? 'development' : 'production',
    output: {
        // filename: 'dxf-viewer.js',
        // filename: development ? 'dxf-viewer.js' : 'dxf-viewer.min.js',
        filename:  'dxf-viewer.min.js',
        path: path.resolve(__dirname, development ? 'devDist' : 'dist'),
        library: 'dxfViewer',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'typeof self === \'undefined\' ? this : self',
        clean: true,
    },
    resolve: {
        extensions: ['.ts','.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                // test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
                // use: ['babel-loader'],
            },
            ...development?[{
                test: /Roboto-LightItalic.ttf$/i,
                type: 'asset/inline',
            }]:[]
        ],
    },
    ... development ? {
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),

           new CompressionWebpackPlugin({
                filename: '[path][base].gz[query]', // 输出文件的名称（使用gzip压缩）
                algorithm: 'gzip', // 使用gzip压缩算法
                test: /\.(js|css|html|svg)(\?.*)?$/i, // 需要被压缩的文件类型
                threshold: 10240, // 只有大小大于这个值的资源会被处理（以字节为单位）
                minRatio: 0.8, // 只有压缩比小于这个值的资源会被处理
                deleteOriginalAssets: false, // 是否删除原始文件（通常设置为false，以便保留原始文件和压缩文件）
            }),
        ],
        stats: 'errors-only',
        devServer: {
            static: {
                directory: path.join(__dirname,  development ? 'devDist' : 'dist'), // Каталог для статики
            },
            open: true, // Автоматически открывать браузер
        }
    }:{}
});