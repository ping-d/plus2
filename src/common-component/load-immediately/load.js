import htl from './load.html'
import './load.scss'
const el = document.createElement("div");
el.innerHTML = htl;

module.exports = el;