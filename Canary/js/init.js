// JavaScript Document
// Camilo Medina Matú
// dev.cmedina@gmail.com

$.fn.hasAttr = function (_attrName){
	var attr = $(this).attr(_attrName);
	if (typeof attr != typeof undefined) 
	    return true;
	else
		return false;
}

var _footerText = $('<p><a href="#menu-toggle" class="btn btn-info" id="menu-toggle">Menu</a></p>');
var _nextButton = $('<a>Siguiente</a>');
var _prevButton = $('<a>Anterior</a>');

var _json = eval('({"menu":[{"items":[{"ref":"nombre.html","title":"Texto 1"},{"ref":"nombre.html","title":"Texto 2"},{"ref":"nombre.html","title":"Texto 3"},{"ref":"nombre.html","title":"Texto 4"}],"bloque":"Texto Apelativo"},{"items":[{"ref":"nombre.html","title":"Texto 1"},{"ref":"nombre.html","title":"Texto 2"},{"ref":"nombre.html","title":"Texto 3"},{"ref":"nombre.html","title":"Texto 4"}],"bloque":"Texto Descriptivo"},{"items":[{"ref":"nombre.html","title":"Texto 1"},{"ref":"nombre.html","title":"Texto 2"},{"ref":"nombre.html","title":"Texto 3"},{"ref":"nombre.html","title":"Texto 4"}],"bloque":"Texto Shalala"}]})');

function goNext( event ){
	  var next = $('.ebook').attr('data-next');
	  if(next != undefined){
	  	document.location.href= next;
	  }
}
  
function goPrev( event ){
	  var next = $('.ebook').attr('data-prev');
	  if(next != undefined){
	  	document.location.href= next;
	  }
}

/*BINDING*/
_prevButton.click(goPrev);
_nextButton.click(goNext);

$(document).ready(function(e){
//TODO INIT HERE

//LOAD MENU ITEMS
var _menu = $('.sidebar-nav');

$.each(_json.menu,function(index, value){
	_menu.append($('<li><a href="#">'+value.bloque+'</a></li>'));
});

//CREATE FOOTER OBJECTS AND LINKS
var ebook = $('.ebook');
var footer = $('.main-footer');

footer.empty();
footer.append(_footerText);

if(ebook.attr('data-next') != undefined){
	footer.append(_nextButton);
}

if(ebook.attr('data-prev') != undefined){
	footer.append(_prevButton);
}


});