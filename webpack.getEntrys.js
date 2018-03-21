/**
 *
 * @author ping.dong
 * @create time 08/03/2018 10:01 AM
 * @desc
 *
 * */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

var fs = require('fs');
const cwd = path.resolve(process.cwd(),"src");
function nameFilter(name,regx){
    var subString = name.substring(cwd.length+1,name.length);
    if(regx.test(name) && subString.indexOf(path.sep) === subString.lastIndexOf(path.sep)){
        return true;
    }else {
        return false;
    }
}
function readFiles(dirName,htmlRegx,jsRegx){

    var callee = arguments.callee;
    var result = {
        htmlFiles:[],
        jsFiles:[],
    }
    var files = fs.readdirSync(dirName);
    for(var i=0;i<files.length;i++){
        var name = path.resolve(dirName,files[i]);
        if(/common/.test(name)){
            continue;
        }
        if(fs.statSync(name).isDirectory()) {//文件夹
            var innerFiles =  callee(name,htmlRegx,jsRegx);
            result.htmlFiles = result.htmlFiles.concat(innerFiles.htmlFiles);
            result.jsFiles = result.jsFiles.concat(innerFiles.jsFiles);
        }else{//文件
            if(nameFilter(name,htmlRegx)){
                result.htmlFiles.push(name);
            }else if(nameFilter(name,jsRegx)){
                result.jsFiles.push(name);
            }
        }
    }
    return result;
}

var html_js_entrys = readFiles(cwd,/\.html$/,/\.js$/);
var htmlEntrys = html_js_entrys.htmlFiles;
var jsEntrys = html_js_entrys.jsFiles;


/**
 * entry
 * */
var entry = {};
var vendorEntrys = ['./page3/page3.js'];//提取公用的文件
entry.vendor = vendorEntrys;
for(var i=0;i<jsEntrys.length;i++){
    entry[path.basename(jsEntrys[i],".js")] = jsEntrys[i];
}


/**
 * 配置html入口文件，
 * */
function getHtmlWebpackPluginList(isProduction){
    var htmlWebpackPluginList = [];
    for(var j=0;j<htmlEntrys.length;j++){
        htmlWebpackPluginList.push(
            new HtmlWebpackPlugin({
                template: htmlEntrys[j],
                filename:path.basename(htmlEntrys[j],'.html')+".html",
                inject:true,
                minify: { //压缩HTML文件
                    removeComments: isProduction, //移除HTML中的注释
                    collapseWhitespace: isProduction //删除空白符与换行符
                },
                favicon:"../asset/favicon.png",
                hash:false,
                chunks:['vendor',path.basename(htmlEntrys[j],".html")],
            })
        )
    }
    return htmlWebpackPluginList;
}
module.exports = {
    entry:entry,
    getHtmlWebpackPluginList:getHtmlWebpackPluginList
}