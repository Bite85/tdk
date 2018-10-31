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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgIC8vICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAvLyAkKCcuc3VjY2Vzcy1tb2RhbCcpLmFkZENsYXNzKCdkLWZsZXgnKTtcclxuICAgICAgICAvLyB2YXIgc3VjY2Vzc01vZGFsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgIC8vIHN1Y2Nlc3NNb2RhbCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAkKCcuc3VjY2Vzcy1tb2RhbCcpLnJlbW92ZUNsYXNzKCdkLWZsZXgnKTtcclxuICAgICAgICAvLyAgICAgIGNsZWFyVGltZW91dChzdWNjZXNzTW9kYWwpO1xyXG4gICAgICAgIC8vIH0sIDMwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gJCgnI2Nsb3NlLXN1Y2Nlc3MtbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgJCgnLnN1Y2Nlc3MtbW9kYWwnKS5yZW1vdmVDbGFzcygnZC1mbGV4Jyk7XHJcbiAgICAgICAgLy8gICAgICAvLyAgY2xlYXJUaW1lb3V0KHN1Y2Nlc3NNb2RhbCk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4vKioqKioqKioqKioqKkZBTkNZQk9YKioqKioqKioqKioqKioqKiovIFxyXG4gICQoJ1tkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuICAgICAgIGxvb3A6IHRydWVcclxuICB9KTtcclxuLyoqKioqKioqKioqKipGQU5DWUJPWCoqKioqKioqKioqKioqKioqLyAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gLyoqKioqKipNRU5VIEJVUkdFUioqKioqKi9cclxuICAgdmFyIGZvckVhY2g9ZnVuY3Rpb24odCxvLHIpe2lmKFwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkpZm9yKHZhciBjIGluIHQpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsYykmJm8uY2FsbChyLHRbY10sYyx0KTtlbHNlIGZvcih2YXIgZT0wLGw9dC5sZW5ndGg7bD5lO2UrKylvLmNhbGwocix0W2VdLGUsdCl9O1xyXG5cclxuICAgIHZhciBoYW1idXJnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oYW1idXJnZXJcIik7XHJcbiAgICBpZiAoaGFtYnVyZ2Vycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZvckVhY2goaGFtYnVyZ2VycywgZnVuY3Rpb24oaGFtYnVyZ2VyKSB7XHJcbiAgICAgICAgaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBcclxuIC8qKioqKioqTUVOVSBCVVJHRVIqKioqKiovXHJcblxyXG4gLyoqKioqKkNMSUNLIE9VVFNJREUgTUVOVSoqKioqKiovIFxyXG4gJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgY2xpY2tvdmVyID0gJChldmVudC50YXJnZXQpO1xyXG4gICAgdmFyIF9vcGVuZWQgPSAkKFwiLm5hdmJhci1jb2xsYXBzZVwiKS5oYXNDbGFzcyhcInNob3dcIik7XHJcbiAgICBpZiAoX29wZW5lZCA9PT0gdHJ1ZSAmJiAhY2xpY2tvdmVyLmhhc0NsYXNzKFwibmF2YmFyLXRvZ2dsZVwiKSkge1xyXG4gICAgICAgICQoXCJidXR0b24ubmF2YmFyLXRvZ2dsZVwiKS5jbGljaygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvaycpO1xyXG4gICAgICAgICQoJy5uYXZiYXItdG9nZ2xlcicpLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgICAkKCcubmF2YmFyLWNvbGxhcHNlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAkKCcubmF2YmFyLXRvZ2dsZXInKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9XHJcbn0pO1xyXG4gLyoqKioqKkNMSUNLIE9VVFNJREUgTUVOVSoqKioqKiovIFxyXG5cclxuIC8qQ0xPU0UgTUVOVSBPTiBTQ1JPTEwqL1xyXG4gJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuIFx0JCgnLm5hdmJhci10b2dnbGVyJykuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgJCgnLm5hdmJhci1jb2xsYXBzZScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAkKCcubmF2YmFyLXRvZ2dsZXInKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiB9KTsgXHJcbiAvKkNMT1NFIE1FTlUgT04gU0NST0xMKi8gXHJcblxyXG5cclxuJCgnLnBhcnRuZXJzLXNlY3Rpb25fX2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xyXG5cdGxvb3A6IHRydWUsXHJcblx0ZG90czogdHJ1ZSxcclxuXHRzbGlkZUJ5OiAxLFxyXG5cdGl0ZW1zOiAxLFxyXG5cdG5hdjogZmFsc2UsXHJcblx0YXV0b3BsYXk6IGZhbHNlLFxyXG59KTtcclxuXHJcbiQoJy52aWRlby1zZWN0aW9uX19jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuXHRsb29wOiB0cnVlLFxyXG5cdGRvdHM6IHRydWUsXHJcblx0Ly8gc2xpZGVCeTogMyxcclxuXHRpdGVtczogMSxcclxuXHRuYXY6IGZhbHNlLFxyXG5cdGF1dG9wbGF5OiBmYWxzZSxcclxuXHR0b3VjaERyYWc6IHRydWUsXHJcblx0bW91c2VEcmFnOiB0cnVlLFxyXG5cdHJlc3BvbnNpdmU6e1xyXG4gICAgICAgIDA6e1xyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgbmF2OmZhbHNlLFxyXG4gICAgICAgICAgICBzbGlkZUJ5OiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgaXRlbXM6IDIsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNsaWRlQnk6IDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIDk5MTp7XHJcbiAgICAgICAgICAgIGl0ZW1zOjMsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIHNsaWRlQnk6ICdwYWdlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTIwMDp7XHJcbiAgICAgICAgICAgIGl0ZW1zOiAzLFxyXG4gICAgICAgICAgICAvLyBzbGlkZUJ5OiAncGFnZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIi5wb2ludC1tYXBcIikubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibm9uZVwiKTtcclxuXHJcbiB9KS5tb3VzZW91dChmdW5jdGlvbigpe1xyXG5cclxuIFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm5vbmVcIik7XHJcblxyXG59KTtcclxuXHJcbiAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG5cclxuXHJcblxyXG59KTtcclxuXHJcbi8qKioqKioqKioqKk1BUCoqKioqKioqKioqKioqL1xyXG55bWFwcy5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgIGlmKCQoJyNZTWFwc0lEJykubGVuZ3RoID4gMCkge1xyXG4gICAgICBcclxuICAgICAgICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ1lNYXBzSUQnLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IFs1MS41OTk0OTYsIDQ1LjkxODA1MV0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxNixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzOiBbJ3pvb21Db250cm9sJywnZ2VvbG9jYXRpb25Db250cm9sJ11cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiAneWFuZGV4I3NlYXJjaCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQodC+0LfQtNCw0ZHQvCDQvNCw0LrQtdGCINGB0L7QtNC10YDQttC40LzQvtCz0L4uXHJcbiAgICAgICAgIHZhciBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzUxLjU5OTQ5NiwgNDUuOTE4MDUxXSwge1xyXG4gICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQsy4g0KHQsNGA0LDRgtC+0LIsIDMt0Lkg0JzQvtGB0LrQvtCy0YHQutC40Lkg0L/RgNC+0LXQt9C0LCAxNtC1JyxcclxuICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vINCe0L/RhtC40LguXHJcbiAgICAgICAgICAgICAgICAvLyDQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQtNCw0L3QvdGL0Lkg0YLQuNC/INC80LDQutC10YLQsC5cclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIC8vINCh0LLQvtGRINC40LfQvtCx0YDQsNC20LXQvdC40LUg0LjQutC+0L3QutC4INC80LXRgtC60LguXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnLi9pbWcvZ3BzLnBuZycsXHJcbiAgICAgICAgICAgICAgICAvLyBpY29uSW1hZ2VIcmVmOiAnL2Jhc2ljL2ltZy9ncHMucG5nJyxcclxuICAgICAgICAgICAgICAgIC8vINCg0LDQt9C80LXRgNGLINC80LXRgtC60LguXHJcbiAgICAgICAgICAgICAgICAvLyBpY29uSW1hZ2VTaXplOiBbMzUsIDM4XVxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzM1LCA0OF1cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpO1xyXG4gICAgICAgIC8vIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdtdWx0aVRvdWNoJyk7IFxyXG4gICAgICAgICgkKHdpbmRvdykud2lkdGgoKSA8IDk5MSkgPyAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ2RyYWcnKSA6IG15TWFwLmJlaGF2aW9ycy5EcmFnO1xyXG4gICAgICAgXHJcbiAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgICAgIC8vIG15UGxhY2VtYXJrLmJhbGxvb24ub3BlbigpO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgICAgICBcclxufSk7XHJcbi8qKioqKioqKioqKk1BUCoqKioqKioqKioqKioqLyAiXSwiZmlsZSI6Im1haW4uanMifQ==
