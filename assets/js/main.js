/*recorrer la data*/
$(document).ready(function() {
	/* ajax que pide data de pines */
	$.ajax({
		url: 'js/data.json',
		type: 'GET',
		dataType: 'json',
	})
	/*hace la funcion para imprimir name and img*/
	.done(function(p) {
		console.log(p.results);
		p.results.forEach(function(elemento,indice){ 
		var pin = indice + 1;//pik se refiere a pikachu y es el id de cada pokemon
		$("#pins-board").append('<div class="pinContent" data-id="'elemento.id+'" data-nombre="'+elemento.title+'" data-imagen="'+elemento.image_url+'" data-descripcion="'+elemento.description+'" data-usuario="'+elemento.username+'" data-hashtag="'+elemento.hashtag+'"><div class="modal_mascara"><img src="'+elemento.image_url+'"></div><h2>'+elemento.title+'</h2><p class="descripcion">'+elemento.description+'</p><p class="username">Subido por '+elemento.username+' desde <span>#'+elemento.hashtag+'</span></p></div>');
		})
	})	
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

});

$(document).on('click', '.pinContent', function() {
	console.log($(this).data('url'));
	$.ajax({
		url: $(this).data('url'),//metodo data entrega url
		type: 'GET',
		dataType: 'json',
	})
	.done(function(detalle) { 
	// Rescato toda la info del pin que se seleccione

	var nombre = $(this).attr('data-nombre');
	var imagen = $(this).attr('data-imagen');
	var	descripcion = $(this).attr('data-descripcion');
	var	usuario = $(this).attr('data-usuario');
	var	hashtag = $(this).attr('data-hashtag');

		detalle.types.forEach(function(tipo, indice) {
			// console.log(tipo);
			tipos = tipos + tipo.type.name + " ";
		})
		detalle.abilities.forEach(function(habilidad,indice){
			console.log(habilidad)
			$("#detalle ul").append('<li>'+  habilidad.ability.name +'</li>')

		});
		$('#pin-modal .modal h2').html(nombre),
		$('#pin-modal .modal__mascara').attr('src',imagen);
		$('#pin-modal  .modal__descripcion').html(descripcion);
		$('#pin-modal  .modal__username').html(usuario);
		$('#pin-modal  .modal_hashtag').html(hashtag);
	});

	//Abrir modal

	$('#pin-modal').show().stop().animate({'opacity':'1'},300, function(){
		$(this).find('.modal').stop().animate({'top':'50%', 'opacity':'1'},300);
	});
});

	//cerrar modal
	$(document).on('click', '#pin-modal.closeModal', function(){
		$('#modContent .modal').stop().animate({'opacity':'0', 'top':'40%'},300, function(){
		$(this).parent().stop().animate({'opacity':'0'},300, function(){
			$(this).hide();
		});
	});
});

