/**
 * 将一个标签字符串解析出src 然后将相应的模块以字符串的形式返回
 * <import-html src="xxx.a" />
 * */
const path = require('path');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
function getSrc(tagStr) {
    let tempArr = [];
    let success = false;
    for(let i = 0; i < tagStr.length ; i++) {
        const len = tempArr.length;
        const c = tagStr[i];
        if((len === 0) && (c === " ")) {
            tempArr.push(c);
        }else if (len === 1) {
            if(c === " "){ // 连续的空格
                continue;
            }else if(c === "s"){
                tempArr.push(c);
            }else {
                tempArr = [];
            }
        }else if(len === 2){
            if(c === "r"){
                tempArr.push(c);
            }else {
                tempArr = [];
            }
        }else if(len === 3){
            if(c === "c"){
                tempArr.push(c);
            }else {
                tempArr = [];
            }
        }else if(len === 4){
            if(c === "="){
                tempArr.push(c);
            }else {
                tempArr = [];
            }
        }else if(len === 5){
            if(c === '"'){
                tempArr.push(c);
            }else {
                tempArr = [];
            }
        }else if(len > 5){
            tempArr.push(c);
            if(c === '"'){
                success = true;
                break;
            }
        }
    }
    if(success) {
        let result = "";
        for (let i = 6;i<tempArr.length -1;i++){
            result += tempArr[i];
        }
        return result;
    }
    return null;
}
function tagToString(tagStr, context) {
    const src = getSrc(tagStr);
    const filePath = context+ '/'+ src;
    const data = fs.readFileSync(filePath);
    const fileStr = amendSrc(getChildContext(src),decoder.write(data));
    const resultStr = replaceHtml(fileStr, context); // recursion
    return resultStr;
}
/**
 * 处理子文件中的src
 * */
function amendSrc(baseSrc, source) {
    let tempArr = [];
    let result = "";
    for(let i=0,length=source.length;i<length;i++){
        const len = tempArr.length;
        const c = source[i];
        if(len === 0) {
            if(c === '<') {
                tempArr.push(c);
            }else {
                result += c;
            }
        }else {
            tempArr.push(c);
            if(c === '>') { // 标签结束
                let tempStr = tempArr.join('');
                tempStr = tempStr.replace(/\s+/g,' ');
                let index = tempStr.search(/\ssrc\s*=\s*"/);
                if(-1 !== index) {
                    tempStr = tempStr.substring(0,index+6) + baseSrc+'/' + tempStr.substring(index + 6);
                }
                result += tempStr;
                tempArr = [];
            }

        }
    }
    if(tempArr.length > 0) {
        result += tempArr.join("");
    }
    return result;

}
/**
 * 从一个文件路径中获取相对路径
 * /xx/a/b.html ==>> /xx/a/
 * */
function getChildContext(src) {
    let index = src.lastIndexOf('/');
    if(-1 === index){
        return '';
    }else {
        return src.substring(0,index);
    }
}
function replaceHtml(source, context) {
    let result = '';
    let tempArr = [];
    for (let i = 0, length = source.length; i<length; i++){
        let c = source[i];
        let len = tempArr.length;
        if(len === 0) {
            if(c==='<'){
                tempArr.push(c);
            }else {
                result += c;
            }
        }else if (len === 1) {
            if(c === " "){ // 连续的空格
                continue;
            }else if(c === "i"){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 2){
            if(c === "m"){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 3){
            if(c === "p"){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 4){
            if(c === "o"){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 5){
            if(c === 'r'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 6){
            if(c === 't'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 7){
            if(c === '-'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 8){
            if(c === 'h'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 9){
            if(c === 't'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 10){
            if(c === 'm'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 11){
            if(c === 'l'){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else if(len === 12){
            if(c === ' '){
                tempArr.push(c);
            }else {
                tempArr.push(c);
                result += tempArr.join('');
                tempArr = [];
            }
        }else{
            if((c === '>') && (tempArr[tempArr.length - 1] === '/')) {
                tempArr.push(c);
                let tagString = tempArr.join('');
                result += tagToString(tagString, context);
                tempArr = [];
            }else {
                tempArr.push(c);
            }
        }
    }
    if(tempArr.length > 0){
        result += tempArr.join('');
    }
    return result;


}
module.exports = replaceHtml;