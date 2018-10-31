$(document).ready(function() {

       // $('.modal').modal('hide');
       // $('.success-modal').addClass('d-flex');
        // var successModal = null;
                       
       // successModal = setTimeout(function() {
        //      $('.success-modal').removeClass('d-flex');
        //      clearTimeout(successModal);
        // }, 3000);

                        
        // $('#close-success-modal').click(function() {
        //     $('.success-modal').removeClass('d-flex');
        //      //  clearTimeout(successModal);
        // });

/*************FANCYBOX*****************/ 
  $('[data-fancybox]').fancybox({
       loop: true
  });
/*************FANCYBOX*****************/                         


 /*******MENU BURGER******/
   var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
      forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
          this.classList.toggle("is-active");
        }, false);
      });
    } 
 /*******MENU BURGER******/

 /******CLICK OUTSIDE MENU*******/ 
 $(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("button.navbar-toggle").click();
        console.log('ok');
        $('.navbar-toggler').addClass('collapsed');
        $('.navbar-collapse').removeClass('show');
        $('.navbar-toggler').removeClass('is-active');
    }
});
 /******CLICK OUTSIDE MENU*******/ 

 /*CLOSE MENU ON SCROLL*/
 $(window).scroll(function() {
 	$('.navbar-toggler').addClass('collapsed');
    $('.navbar-collapse').removeClass('show');
    $('.navbar-toggler').removeClass('is-active');
 }); 
 /*CLOSE MENU ON SCROLL*/ 


$('.partners-section__carousel').owlCarousel({
	loop: true,
	dots: true,
	slideBy: 1,
	items: 1,
	nav: false,
	autoplay: false,
});

$('.video-section__carousel').owlCarousel({
	loop: true,
	dots: true,
	// slideBy: 3,
	items: 1,
	nav: false,
	autoplay: false,
	touchDrag: true,
	mouseDrag: true,
	responsive:{
        0:{
            items: 1,
            nav:false,
            slideBy: 1
        },
        767: {
            items: 2,
            nav: false,
            slideBy: 2
        },
        991:{
            items:3,
            nav: false,
            // slideBy: 'page'
        },
        1200:{
            items: 3,
            // slideBy: 'page'
        }
    }
});

$(".point-map").mouseover(function(){
    $(this).addClass("none");

 }).mouseout(function(){

 	$(this).removeClass("none");

});

 $('[data-toggle="tooltip"]').tooltip();



});

/***********MAP**************/
ymaps.ready(function () {


    if($('#YMapsID').length > 0) {
      
          var myMap = new ymaps.Map('YMapsID', {
                center: [51.599496, 45.918051],
                zoom: 16,
                controls: ['zoomControl','geolocationControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            // Создаём макет содержимого.
         var myPlacemark = new ymaps.Placemark([51.599496, 45.918051], {
                balloonContent: 'г. Саратов, 3-й Московский проезд, 16е',
            }, 
            {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/gps.png',
                // iconImageHref: '/basic/img/gps.png',
                // Размеры метки.
                // iconImageSize: [35, 38]
                iconImageSize: [35, 48]
             
            });

       
        myMap.behaviors.disable('scrollZoom');
        // myMap.behaviors.disable('multiTouch'); 
        ($(window).width() < 991) ?  myMap.behaviors.disable('drag') : myMap.behaviors.Drag;
       
        myMap.geoObjects.add(myPlacemark);
        // myPlacemark.balloon.open();
    }
      
        
});
/***********MAP**************/ 