(()=>{
  'use strict';
  let app = {
    init: function(){
      this.window = $(window);
      this.head = $('head');
      this.headStyle = $('head style');
      this.headStyle.empty();
      this.buttonWrapper = $('.button');
      this.button = $('#button');
      this.button2 = $('#button2');
      this.button2.hide();
      this.arrivedDate = $('#arrived');
      this.leavingDate = $('#leaving');
      this.overlay = $('.overlay');
      this.rotate = $('.rotate');
      this.rotateNeedle = $('.rotate-needle');
      this.daysTotal = $('.days-total');
      this.daysPast = $('.days-here');
      this.daysLeft = $('.days-left');
      this.actualDate = new Date();
      this.actDay = this.actualDate.getDay();
      this.datePicker();
      this.button.on('click', this.getDays.bind(this));
      this.button2.on('click', this.reset.bind(this));
      this.window.on('resize', this.setSize.bind(this));
      this.transitionDefault();
    },
    getDays: function () { 
      let self = this;
      let arrivedDate = this.arrivedDate.val();
      let leavingDate = this.leavingDate.val();
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
        let daydiff = (first, second)=> { 
          return Math.round((second-first)/(1000*60*60*24));
        };
        let totalDyas = daydiff(ad, ld);
        let dayLeft = daydiff(this.actualDate, ld);
        let daysHere = daydiff(ad, this.actualDate);
        this.daysTotal.text(totalDyas);
        this.daysPast.text(daysHere);
        this.daysLeft.text(dayLeft);
        let percent = Math.round(dayLeft/totalDyas * 100);
        let percent100 = 100 - percent;
        let timerId = setInterval(()=>{ count(); },25);

        let count = ()=> {
          let y = parseInt(self.overlay.text().slice(0, -1));
          self.overlay.text(parseInt((y+1)) + '%');
          let x = parseInt(self.overlay.text().slice(0, -1));

          if (x == percent100) {
            clearInterval(timerId);
          }
        };
        let percent180 = 180/percent;
        let totalPercent = Math.round(100/percent180);
        let opositePercent  = 180 - (percent*1.8);
        let percentNeedle = opositePercent -90;
        let rotateCSS, rotateNeedle;
        if(this.window.width() >= 768){
          rotateCSS = 
            `.rotate {
                position: absolute;
                width: 400px;
                height: 400px;
                z-index: 2;
                left: 50%;
                -webkit-transition: 3s;
                -moz-transition: 3s;
                -ms-transition: 3s;
                -o-transition: 3s;
                transition: 3s;
                transform: translate(-50%) rotate(${opositePercent}deg)
              }`;
          rotateNeedle = 
            `.rotate-needle{ 
                position: absolute; 
                width: 400px; 
                height: 400px; 
                left: 50%; 
              -webkit-transition: 3s;
              -moz-transition: 3s;
              -ms-transition: 3s;
              -o-transition: 3s; 
              transition: 3s; 
              transform: translate(-50%) rotate(${percentNeedle}deg); 
              z-index: 11;
            }`;  
        } else {
          rotateCSS = 
            `.rotate {
                position: absolute;
                width: 320px;
                height: 320px;
                z-index: 2;
                left: 50%; 
                -webkit-transition: 3s;
                -moz-transition: 3s;
                -ms-transition: 3s;
                -o-transition: 3s;
                transition: 3s;
                transform: translate(-50%) rotate(${opositePercent}deg)
              }`;
          rotateNeedle = 
            `.rotate-needle { 
                position: absolute; 
                width: 320px; 
                height: 320px; 
                left: 50%; 
                -webkit-transition: 3s;
                -moz-transition: 3s;
                -ms-transition: 3s;
                -o-transition: 3s;
                transition: 3s;
                transform: translate(-50%) rotate(${percentNeedle}deg); 
                z-index: 11;
              }`;
        }
        $("#filler-wrapper").removeClass('filler-wrapper'); 
        $("#needle-wrapper").removeClass('needle-wrapper');
        this.headStyle.append(rotateCSS);
        this.headStyle.append(rotateNeedle);

        this.buttonWrapper.css('visibility','hidden');
        $('.data-wrapper').show();

        setTimeout( ()=> {
          self.showResetBtn();
        }, 4500);

        setTimeout( ()=> {
          self.showTotal();
        }, 500);

        setTimeout( ()=> {
          self.showDaysPast();
        }, 2000);

        setTimeout( ()=> {
          self.showDaysLeft();
        }, 3500);
      };
    },
    setSize: function(){
      let self = this;
      this.rotate.removeClass('transition-default');
      this.rotateNeedle.removeClass('transition-default');
      if(this.window.width() >= 786){ 
        this.rotate.removeClass('rotate-small');
        this.rotateNeedle.removeClass('rotate-small');
        this.rotate.addClass('rotate-large');
        this.rotateNeedle.addClass('rotate-large');
      } else{
        this.rotate.removeClass('rotate-large');
        this.rotateNeedle.removeClass('rotate-large');
        this.rotate.addClass('rotate-small');
        this.rotateNeedle.addClass('rotate-small');
      }
      setTimeout(self.transitionDefault(),2000);
      
    },
    transitionDefault: function(){
        this.rotate.addClass('transition-default');
        this.rotateNeedle.addClass('transition-default');
    },
    datePicker: function(){
      $( "#arrived, #leaving" ).datepicker();
    },
    reset: function(){
      location.reload();
      location = location;
    },
    showResetBtn: function(){
      this.buttonWrapper.css('visibility','visible');
      this.button.hide();
      this.button2.show();
    },
    showTotal: function(){
      $('.total').css('visibility','visible');
    },
    showDaysPast: function(){
      $('.here').css('visibility','visible'); 
    },
    showDaysLeft: function(){
      $('.left').css('visibility','visible');
    }
  };

  $(window).on('load',()=> {
    app.init();
  });
})();