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
    devtool:  false,
    // devtool: development ? 'inline-source-map' : false,
    optimization: {
       // minimize: development ? false :true ,
       minimize: true,
       minimizer: [
           new TerserPlugin({
               terserOptions: {
                   compress: {
                       arguments: true,
                       dead_code: true,
                   },
                   toplevel: true,
                   keep_classnames: true,
                   keep_fnames: true,
               },
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