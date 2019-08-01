import _ from 'lodash';
import './css/style.css';
import App from './js/app.js';
import Calculation from './js/calculation.js';
import Needle from './js/needle.js';

window.addEventListener("load", ()=>{
  let app = new App();
  let calc = new Calculation();
  let needle = new Needle();

  app.transitionDefault();
  calc.submitBtn.addEventListener('click', ()=> calc.calculateDays());
  calc.resetBtn.addEventListener('click', () => app.resetPage());
  
  window.addEventListener('resize', ()=> needle.changeSize());
})