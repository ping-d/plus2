const { getOptions } =  require('loader-utils');
const validateOptions = require('schema-utils');
const replaceHtml = require('./replace-html');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
}
module.exports = function(source) {
    const options = getOptions(this);

    //validateOptions(schema, options, 'Example Loader');

    // 对资源应用一些转换……
    source = replaceHtml(source,this.context);

    let exportStr = '';
    if((this.loaderIndex === 0) && (!(/^(module.exports|export)/.test(source))) ) {
        exportStr = 'module.exports = ';
        source = JSON.stringify(source);
    }
    return `${exportStr}${source}`;



};
