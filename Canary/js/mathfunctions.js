// JavaScript Document - pluggin para rectas numericas
// Carlos Herrera Plata
// carlos.ksa21@gmail.com

	/* Utilizar los pluggins:
	*  jquery
	*  jquery-ui (solo con el componente slider basta)
	*  jquery-ui-slider-pips 
	*/

	$(function() {

		// set up an array to hold the months
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		// lets be fancy for the demo and select the current month.
		var activeMonth = new Date().getMonth();

	  $('.number-line').html('<div class="rect"></div>');

	  $('.rect').each(function(){ //dibujando la recta
	  	if ($(this).parent().hasAttr('data-type')){
	  		switch($(this).parent().attr('data-type')){
	  			case 'sample': //dibujado de una recta numerica simple
	  				var maxVal = $(this).parent().hasAttr('data-max')? parseInt($(this).parent().attr('data-max')) : 10 ;
	  				var minVal = $(this).parent().hasAttr('data-min')? parseInt($(this).parent().attr('data-min')) : (-1*maxVal) ;
	  				var valSel = $(this).parent().hasAttr('data-value')? parseInt($(this).parent().attr('data-value')) : 0 ;
	  				sampleLineNumber(this, maxVal, minVal, valSel);
	  				break;
	  			case 'range': //recta numerica que contiene un rango, es necesario pasar un arreglo de dos valores [min, max]
	  			   	var maxVal = $(this).parent().hasAttr('data-max')? parseInt($(this).parent().attr('data-max')) : 10 ;
	  				var minVal = $(this).parent().hasAttr('data-min')? parseInt($(this).parent().attr('data-min')) : (-1*maxVal) ;
	  				var valSel = [-1, 1];
	  				if ($(this).parent().hasAttr('data-value')){
	  					valSel = JSON.parse($(this).parent().attr('data-value'));
	  				} else{
	  					if ($(this).parent().hasAttr('data-values')){
	  						valSel = JSON.parse($(this).parent().attr('data-values'));
	  					}
	  				}
	  				rangeLineNumber(this, maxVal, minVal, valSel);
	  				break;
	  			case 'custom-labels':
	  				customLabelsLineNumber(this);
	  				break;
	  			case 'decimal':
	  				decimalLineNumber(this);
	  				break;
	  		}
	  	} else {
	  		var maxVal = $(this).parent().hasAttr('data-max')? parseInt($(this).parent().attr('data-max')) : 10 ;
	  		var minVal = $(this).parent().hasAttr('data-min')? parseInt($(this).parent().attr('data-min')) : (-1*maxVal) ;
	  		var valSel = $(this).parent().hasAttr('data-value')? parseInt($(this).parent().attr('data-value')) : 0 ;
	  		sampleLineNumber(this, maxVal, minVal, valSel);
	  	}		
	  });

	});
	
	function decimalLineNumber(rect){
		data_from = $(rect).parent();

		var maxVal = data_from.hasAttr('data-max')? parseInt(data_from.attr('data-max'))*10 : 100;
		var minVal = data_from.hasAttr('data-min')? parseInt(data_from.attr('data-min'))*10 : (-1*maxVal);
		var valSel = data_from.hasAttr('data-value')? parseInt(data_from.attr('data-value')) : 0 ;

		$(rect)
		    .slider({ 
		        min: minVal, 
		        max: maxVal, 
		        value: valSel
		    })
		    .slider("pips", {
		        rest: "label",
		        step: 10 
		    });

		$(rect).find('.ui-slider-label').each(function () {
			value = $(this).html();
			value = parseInt(value)/10;
			$(this).html(value);
		});
		alert($(rect).find('.ui-slider-label').attr('data-value'));		
	}

	function customLabelsLineNumber(rect){
		data_from = $(rect).parent();

		var labelsArray = JSON.parse(data_from.attr('data-labels'));
		var activeValue= parseInt(data_from.attr('data-value'));

		$(rect)
		    .slider({ 
		        min: 0, 
		        max: labelsArray.length-1, 
		        value: activeValue 
		    })
		    .slider("pips", {
		        rest: "label",
		        labels: labelsArray
		    });
	}

	function sampleLineNumber(rect, maxVal, minVal, valSel){
		$(rect).slider({
				min : minVal,
				max: maxVal,
				value: valSel
			})
			.slider("pips", {
				rest: "label"
			});
	}

	function rangeLineNumber(rect, maxVal, minVal, valSel){
		$(rect).slider({
	        max: maxVal,
	        min: minVal,
	        values: valSel,
	        range: true
	    })
	    .slider("pips", {
	        rest: "label"
	    });
	}

//-----------------------------------------------------------------------------------------------------------------







//cosas dummie que no son del pluggin son funciones para los ejercicios




$(document).ready(function(){
	$('.katex').each(function(){
		var mathText = $(this).html();
		$(this).html(katex.renderToString(mathText));
	});
	

	$('#diference').val($('#interval').children().slider('option','values')[1] - $('#interval').children().slider('option','values')[0]);

	$("#interval").children().slider({
	  change: function( event, ui ) {
	  	$('#diference').val($('#interval').children().slider('option','values')[1] - $('#interval').children().slider('option','values')[0]);
	  }
	});

	$('.rectQuiz').each(function(){
		var _after = $('<div style="display:none;"></div>');
		var _message = $('<span></span>');
		_after.append(_message);
		_after.insertAfter($(this));

		var rect = $(this).find(".number-line").children();
		var resp = parseInt($(this).find(".number-line").attr('data-ans'));

		$(this).find( "#submit" ).click( function () {
			if (rect.slider('value') == resp){
				_after.attr( "class", "success-log" );		
				_message.text("Respuesta correcta");
				_after.show();
			}
			else{
				_message.text("Respuesta incorrecta");
				_after.attr( "class", "error-log" );
				_after.show();
			}
		});
	});

	$('.open').each(function(){
		var resp = $(this).attr('data-ans');

		$(this).find('input.answer').keyup(function(){
			if($(this).val() == resp) {
				$(this).removeClass('bad');
				$(this).addClass('good');
			} else {
				$(this).removeClass('good');
				$(this).addClass('bad');
			}
		});
	});
});