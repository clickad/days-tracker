import App from './app.js';

export default class Calculation extends App{

  constructor(){
    super();
    this.actualDate = new Date();
    this.timer;
  }
  
  calculateDays() {

    let arrivedDate = this.arrivedDate.value || "";
    let leavingDate = this.leavingDate.value || "";
    let ad = new Date(arrivedDate);
    let ld = new Date(leavingDate);

    if (ad > ld) {
      alert('Arrived date cannot be later than leaving date!');
    } else if(arrivedDate ===  '' || leavingDate === '' ) {
      alert('You need to enter both dates!');
    } else if (ad > this.actualDate) {
      alert('Arrived date cannot be later than todays date!');
    } else if(ld < this.actualDate){
      alert('Leaving date cannot be before todays date!');  
    } else { 

      let totalDyas = this.daydiff(ad, ld);
      let dayLeft = this.daydiff(this.actualDate, ld);
      let daysHere = this.daydiff(ad, this.actualDate);

      this.daysTotal.innerHTML = totalDyas;
      this.daysPast.innerHTML = daysHere;
      this.daysLeft.innerHTML = dayLeft;

      let percent = Math.round(dayLeft/totalDyas * 100);
      let percent100 = 100 - percent;
      this.timer = setInterval(()=>{ this.count(percent100); },25);

      let opositePercent  = 180 - (percent*1.8);
      let percentNeedle = opositePercent -90;

      this.rotate.style = `transform: translate(-50%) rotate(${opositePercent}deg)`;
      this.rotateNeedle.style = `transform: translate(-50%) rotate(${percentNeedle}deg)`;

      this.addRemoveClass(document.querySelector("#filler-wrapper"), "filler-wrapper", false);
      this.addRemoveClass(document.querySelector("#needle-wrapper"), "needle-wrapper", false);

      this.visibility(this.buttonWrapper, false);
      document.querySelector('.data-wrapper').style = "display: block";

      setTimeout( ()=> {
        this.visibility(document.querySelector('.total'), true);
      }, 500);

      setTimeout( ()=> {
        this.visibility(document.querySelector('.here'), true);
      }, 2000);

      setTimeout( ()=> {
        this.visibility(document.querySelector('.left'), true);
      }, 3500);

      setTimeout( ()=> {
        this.showResetBtn();
      }, 4500);
    };
  }

  count(percent100) {
    let y = parseInt(this.overlay.innerHTML.slice(0, -1));
    this.overlay.innerHTML = (parseInt((y+1)) + '%');
    let x = parseInt(this.overlay.innerHTML.slice(0, -1));

    if (x == percent100) {
      clearInterval(this.timer);
    }
  };

  daydiff(first, second) { 
    return Math.round((second-first)/(1000*60*60*24));
  };
  
  showResetBtn(){
    this.visibility(this.buttonWrapper, true);
    this.submitBtn.style = "display: none";
    this.resetBtn.style = "display: block";
  }

  visibility(el, hv){
    el.style = hv ? "visibility:visible" : "visibility:hidden";
  }
}


