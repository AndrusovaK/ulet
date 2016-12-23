(function(){
	var products = [
		{
			"code": "101",
			"title": "Шарик фольгизированный",
			"label": {
				"type": "sale",
				"name": "Акция"
			},
			"price": "1299",
			"imageLink": "16-theme-different-image.jpg"
		},
		{
			"code": "102",
			"title": "Фольгизированные цифры серебряные",
			"label": {
				"type": "new",
				"name": "Новинка"
			},
			"price": "1299",
			"imageLink": "17.folgizirovan_cifra.jpg"
		}
	];

	$('.product-card__image').magnificPopup({
		type: 'inline',
		midClick: true,
		mainClass: 'mfp-fade',
		removalDelay: 300
	});
}());
