require('es6-promise').polyfill();
import './page2.scss'
import load from '../common-component/load-immediately/load';
document.getElementById("btn").addEventListener("click",function (e) {
    console.log(1);
    import('../common-component/demo').then(({default:Demo})=>{
        console.log(2);
        new Demo().show();
    }).catch((e)=>{console.error('xx',e)});
})

document.body.appendChild(load);

