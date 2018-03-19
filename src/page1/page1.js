require('./page1.css')

var Promise = require('es6-promise').Promise;
window.Promise  = Promise;
import text from './demo.p';
const str = 'this is page1';
console.log(str);

function getXX() {
    return import('../another-module.js');
}
getXX().then(({default: exports})=>{
    let a = exports + "xx";
    console.log(a);
})
document.getElementById("result").innerHTML=text;