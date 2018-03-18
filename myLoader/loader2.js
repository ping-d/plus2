const { getOptions } =  require('loader-utils');
module.exports = function(source) {

    // 对资源应用一些转换……
    source += " haha";

    let exportStr = '';
    if((this.loaderIndex === 0) && (!(/^(module.exports|export)/.test(source))) ) {
        exportStr = 'module.exports = ';
        source = JSON.stringify(source);
    }
    return `${exportStr}${source}`;

};