(function(){

	$(function () {
		function openProductModal(event) {
			var productInfo = products.filter(function (elem) {
				return elem.code ===  $(event.currentTarget).closest('.product-card').attr('data-code');
			});

			var popupMarkup = $('#product-popup-markup').html();

			$.magnificPopup.open({
				items: productInfo,
				type: 'inline',
				inline: {
					markup: popupMarkup
				},
				mainClass: 'mfp-fade',
				removalDelay: 300,
				fixedContentPos: true,
				fixedBgPos: true
			});

			$('.offer-label').addClass('offer-label--' + productInfo[0].label.type).html(productInfo[0].label.name);
			$('.product-popup').attr({
				'data-price':productInfo[0].price,
				'data-code':productInfo[0].code,
				'data-title':productInfo[0].title
			});

			if (!productInfo[0].color) {
				$('#product-color').hide();
			} else {
				$('#product-color').show();
			}

			if (!productInfo[0].size) {
				$('#product-size').hide();
			} else {
				$('#product-size').show();
			}

			if (!productInfo[0].material) {
				$('#product-material').hide();
			} else {
				$('#product-material').show();
			}

			// Добавляем к цене руб.
			$('.mfp-price').html(productInfo[0].price + ' руб');

			// Добавляем listener на изменение кол-а товара
			function calcProductPriceInPopup() {
				var numberOfBalloons = Number($(this).val());
				$('.popup .product-card__price').html(numberOfBalloons*productInfo[0].price + ' руб');
			}
			$(document).on('change', '.product-popup .number__input', calcProductPriceInPopup);

			function addToCart(event) {
				cart.add(event);
				$.magnificPopup.close();
			}
			$('.product-popup .product-card__btn').on('click', addToCart);

		}

		$('.product-card__image').on('click', openProductModal);
	});
}());
