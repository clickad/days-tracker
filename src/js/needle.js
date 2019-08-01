import App from './app.js';

export default class Needle extends App {

  constructor() {
    super();
  }

  changeSize() {
    
    this.transitionDefault();

    if(window.innerWidth  >= 768){ 
      this.addRemoveClass(this.rotate, "rotate-small", false);
      this.addRemoveClass(this.rotateNeedle, "rotate-small", false);
      this.addRemoveClass(this.rotate, "rotate-large", true);
      this.addRemoveClass(this.rotateNeedle, "rotate-large", true);
    } else{
      this.addRemoveClass(this.rotate, "rotate-large", false);
      this.addRemoveClass(this.rotateNeedle, "rotate-large", false);
      this.addRemoveClass(this.rotate, "rotate-small", true);
      this.addRemoveClass(this.rotateNeedle, "rotate-small", true);
    }
    
    setTimeout(()=>{
      this.transitionDefault();
    },2000);
  }
}


