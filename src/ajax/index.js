import api from './api'
function formatParams(params) {
    let result = '';
    let notFirst = false;
    for(let k in params) {
        if(! notFirst) {
            notFirst = true;
        }else {
            result += '&';
        }
        result += `${k}=${params[k]}`
    }
    return result;
}
class AjaxObj {
    constructor(url,params,method) {
        const me = this;
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;
        xhr.open(((method === "GET") ? "GET": "POST"),url,true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                let result;
                try {
                    result = JSON.parse(xhr.responseText);
                }catch (e){
                    result = xhr.responseText;
                }
                if(xhr.status === 200){
                    me.doneCbk && me.doneCbk(result);
                }else {
                    me.failCbk && me.failCbk(result);
                }
                me.alwaysCbk && me.alwaysCbk();
            }
        }
        if('POST' === method) {
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            let body = formatParams(params);
            xhr.send(body);
        }else if('GET' === method) {
            xhr.send();
        }else if('POST_FORM' === method){
            //xhr.setRequestHeader("Content-type","multipart/form-data");
            xhr.send(new FormData(params));
        }

    }

    done(cbk) {
        this.doneCbk = cbk;
        return this;
    }
    fail(cbk) {
        this.failCbk = cbk;
        return this;
    }
    always(cbk){
        this.alwaysCbk = cbk;
        return this;
    }
}

module.exports = {
    api,
    post: function (url,params) {
        return new AjaxObj(url,params,'POST');
    },
    get: function (url,params) {
        return new AjaxObj(url,params,'GET');
    },
    postForm: function (url,formEl) {
        return new AjaxObj(url,formEl,'POST_FORM')
    }
}