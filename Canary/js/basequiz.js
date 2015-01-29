// JavaScript Document
// Camilo Medina Matu - dev.cmedina@gmail.com
// Synergy Project



  function swipeleftHandler( event ){
	  var next = $('.ebook').attr('data-next');
	  if(next != undefined){
	  	document.location.href= next;
	  }
  }
  
  function swiperightHandler( event ){
	  var next = $('.ebook').attr('data-prev');
	  if(next != undefined){
	  	document.location.href= next;
	  }
  }



$( document ).ready( function(){
	
$('.multiplechoice.usable').each(function(index) {

	var flag = false;
	var _item = $(this).children('ul').children('li');
	var _after = $('<div></div>');
	var _message = $('<span></span>');
	var _reset = $('<a class="retry">Intentar de nuevo</a>');

	_after.append(_message);
	_after.append(_reset);

	_reset.click(function(e) {
        flag = false;
		_item.removeClass('error');
		_after.fadeOut();
    });
	
	_after.insertAfter($(this));
	
	_item.css('cursor','pointer');
	_item.click(function(e) {
	
		if(flag){
			return;
		}
		_message.text("");
		
		if($(this).attr('data-comments') != undefined){
				_message.text($(this).attr('data-comments'));
		} 
		
		if( $(this).attr('role-success') != undefined ){
			 $(this).addClass('success');
			 _after.attr( "class", "success-log" );			
		} else {
			$(this).addClass('error');
			_after.attr( "class", "error-log" );
			if(_message.text().trim() == ""){
				_message.text("Respuesta incorrecta");
			}
		}
		
		if(_message.text().trim() != ""){
			_after.fadeIn();
		}
		
		flag= true;

    });
});


//if(jQuery.browser.mobile){
  //$( document).on( "swipeleft", swipeleftHandler );
  //$( document).on( "swiperight", swiperightHandler );

//}

});







