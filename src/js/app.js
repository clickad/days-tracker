export default class App {

  constructor() {
    this.overlay = document.querySelector('.overlay');
    this.daysTotal = document.querySelector('.days-total');
    this.daysPast = document.querySelector('.days-here');
    this.daysLeft = document.querySelector('.days-left');
    this.buttonWrapper = document.querySelector('.button');
    this.submitBtn = document.querySelector('#button');
    this.resetBtn = document.querySelector('#button2');
    this.arrivedDate = document.querySelector('#arrived');
    this.leavingDate = document.querySelector('#leaving');
    this.arrivedLeaving = document.querySelector( "#arrived, #leaving" );
    this.rotate = document.querySelector('.rotate');
    this.rotateNeedle = document.querySelector('.rotate-needle');
  }

  resetPage() {
    location.reload();
    location = location;
  }

  transitionDefault(){
    if(this.rotate.classList.contains("transition-default")){
      this.rotate.classList.remove('transition-default');
      this.rotateNeedle.classList.remove('transition-default');
    } else {
      this.rotate.classList.add('transition-default');
      this.rotateNeedle.classList.add('transition-default');
    }
  }

  addRemoveClass(el, cssClass, ra){
    if(ra){
      el.classList.add(cssClass);
      el.classList.add(cssClass);
    } else {
      el.classList.remove(cssClass);
      el.classList.remove(cssClass);
    }
  }

}