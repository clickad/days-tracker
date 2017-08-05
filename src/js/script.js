$(document).ready(function () {
  $('#button').click(function () {

    var arrivedDate = $('#arrived').val();
    var leavingDate = $('#leaving').val();


    var ad = new Date(arrivedDate);
    var ld = new Date(leavingDate);
    
      
    var actualDate = new Date();
    var aDay = ad.getDay();
    

    var lDay = ld.getDay();
    var actDay = actualDate.getDay(); 


    if (ad > ld) {
      alert('Arrived date cannot be later than leaving date!');
    } else if(arrivedDate ==  '' || leavingDate == '' ) {
      alert('You need to enter both dates!');
    } else if (ad > actualDate) {
      alert('Arrived date cannot be later than todays date!');
    } else if(ld < actualDate){
      alert('Leaving date cannot be before todays date!');  
    } else { 
    function daydiff(first, second) {
      return Math.round((second-first)/(1000*60*60*24));
    }
   
    var totalDyas = daydiff(ad, ld);
    var dayLeft = daydiff(actualDate, ld);
    var daysHere = daydiff(ad, actualDate);
    
    
    $('.days-total').text(totalDyas);
    $('.days-here').text(daysHere);
    $('.days-left').text(dayLeft);


    var percent = Math.round(dayLeft/totalDyas * 100);
    var percent100 = 100 - percent;
 

    function count() {
      var y = parseInt($('.overlay').text().slice(0, -1));
      $('.overlay').text(parseInt((y+1)) + '%');
      var x = parseInt($('.overlay').text().slice(0, -1));

      if (x == percent100) {
         clearInterval(timerId);
      }

    }

    var timerId = setInterval(function(){ count(); },25);

    var percent180 = 180/percent
    var totalPercent = Math.round(100/percent180);
    
    var opositePercent  = 180 - (percent*1.8);
    var percentNeedle = opositePercent -90;

    $("#filler-wrapper").removeClass('filler-wrapper'); 
    $("#needle-wrapper").removeClass('needle-wrapper');

    var rotateCSS = '.rotate {position: absolute;width: 400px;height: 400px\;z-index: 2;left: 50%;-webkit-transition: 3s;-moz-transition: 3s;-ms-transition: 3s;-o-transition: 3s;transition: 3s;transform: translate(-50%) rotate('+ opositePercent +'deg)}'

    var rotateNeedle = '.rotate-needle{ position: absolute; width: 400px; height: 400px; left: 50%; -webkit-transition: 3s;-moz-transition: 3s;-ms-transition: 3s;-o-transition: 3s;transition: 3s; transform: translate(-50%) rotate('+ percentNeedle +'deg); z-index: 11;}'

    $('head').append('<style></style>');
    $('head style').append(rotateCSS);
    $('head style').append(rotateNeedle);

    $('#button').css('visibility','hidden');
    $('.data-wrapper').show();

    setTimeout( function() {
      $('.button2').css('visibility','visible');
    }, 4500);
    
    setTimeout( function() {
      $('.total').css('visibility','visible');
    }, 500);

    setTimeout( function() {
      $('.here').css('visibility','visible');
    }, 2000);

    setTimeout( function() {
       $('.left').css('visibility','visible');
    }, 3500);

    }
    
  });
  
  $( function(){
    $( "#arrived, #leaving" ).datepicker();
  });

  $('#button2').click(function(){
     location.reload();
  });
  
})
