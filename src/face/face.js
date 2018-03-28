import './face.css'
import {api, postForm} from '../ajax'

const fileInputEl = document.getElementById("file");
const imgEl = document.getElementById("img");
const formEl = document.forms['fileForm'];
const messageEl = document.getElementById("message");
const resultEl = document.getElementById("result");
let dataUrl;
function bindEvents() {
    fileInputEl.addEventListener("change",handleInputChange)
    formEl.addEventListener("submit",handleSubmit);
}

/**
 * 选择文件
 * */
function handleInputChange(e){
    const files = e.currentTarget.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (!file.type.startsWith('image/')){ continue }

        imgEl.classList.add("obj");
        imgEl.file = file;
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                const s = e.target.result;
                aImg.src = s;
                dataUrl = s.substring(s.indexOf('base64,')+7);
            };
        })(imgEl);
        reader.readAsDataURL(file);
    }
}
/**
 * 提交
 * */
function handleSubmit(e) {
    e.preventDefault();
    postForm(api.face,formEl).done(function (res) {
        showResult(res);

    }).always(function () {
        console.log('finished');
    })
}
function showResult(r) {
    resultEl.innerHTML = "";
    resultEl.appendChild(getEl("face_num",r.face_num));
    resultEl.appendChild(getEl("face_prob",r.face_prob));
    resultEl.appendChild(getEl("pose",r.pose));
    resultEl.appendChild(getEl("gender",r.gender));
    resultEl.appendChild(getEl("age",r.age));
    resultEl.appendChild(getEl("expression",r.expression));
    resultEl.appendChild(getEl("glass",r.glass));
}
function getEl(key,values) {
    const p = document.createElement("p");
    p.innerText = `${key}：${values.toString()}`
    return p;
}

bindEvents();