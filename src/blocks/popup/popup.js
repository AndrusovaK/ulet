(function(){

	$(function () {

		// Открытие модалки с формой заказа

		function deleteFromCart(e) {
			e.preventDefault();
			var li = $(this).closest('li');
			var localStorageCart = JSON.parse(localStorage.getItem("productCart"));

			var optionIndex;

			$.grep(localStorageCart.options, function (elem, index) {
				if(li.find('.popup__order-item-title').html() == elem.title) {
					optionIndex = index;
				}
			});

			if(optionIndex > -1) {
				localStorageCart.options.splice(optionIndex, 1);
				localStorage.setItem('productCart', JSON.stringify(localStorageCart));
				li.remove();
				cart.calculate();
			}
		}

		function openOrderModal(e) {
			e.preventDefault();
			$.magnificPopup.open({
				items: {
					src: '#popup-order'
				},
				type: 'inline',
				midClick: true,
				mainClass: 'mfp-fade',
				removalDelay: 300
			});

			var localStorageCart = localStorage.getItem("productCart"),
					orderList = $('.popup__order-list').html('');

			localStorageCart = JSON.parse(localStorageCart);

			for(var i = 0; i < localStorageCart.options.length; i++) {
				var listElement = $(
						'<li class="popup__order-item">' +
							'<span class="popup__order-item-td popup__order-item-title">'+ localStorageCart.options[i].title +'</span>' +
							'<span class="popup__order-item-td popup__order-item-number">'+ localStorageCart.options[i].number +'</span>' +
							'<span class="popup__order-item-td popup__order-item-price">'+ localStorageCart.options[i].price +' руб.</span>' +
							'<span class="popup__order-item-td popup__order-item-delete">x</span>' +
						'</li>'
				);

				orderList.append(listElement);
			}

			$('.popup__order-item-delete').on('click', deleteFromCart);
		}

		$('.order-link').on('click', openOrderModal);

		// Открытие модалка с товаром
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

			$('.product-popup .offer-label').addClass('offer-label--' + productInfo[0].label.type).html(productInfo[0].label.name);
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
