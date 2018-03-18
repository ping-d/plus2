import './index.scss'
import temp from './index.html'

class Demo{
    constructor(props){
        console.log("2233")
        this.el = document.createElement("div");
        this.el.innerHTML = temp;
    }
    show() {
        document.body.appendChild(this.el);
    }
}
module.exports = Demo