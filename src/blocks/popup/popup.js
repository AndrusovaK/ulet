(function(){

	$(function () {

		// Открытие модалки с формой заказа

		function deleteFromCart(e) {
			e.preventDefault();
			var li = $(this).closest('li');
			var localStorageCart = JSON.parse(localStorage.getItem("productCart"));

			var optionIndex;

			$.grep(localStorageCart.options, function (elem, index) {
				if(li.attr('data-code') == elem.code) {
					optionIndex = index;
				}
			});

			if(optionIndex > -1) {
				localStorageCart.options.splice(optionIndex, 1);
				localStorage.setItem('productCart', JSON.stringify(localStorageCart));
				li.remove();
				cart.calculate();
				calculateCart();

				if(localStorageCart.options.length === 0) {
					$('.popup__order-details').hide();
				} else {
					$('.popup__order-details').show();
				}
			}
		}

		function calculateCart() {
			var items = $('.popup__order-item');
			var sum = 0;

			var localStorageCart = JSON.parse(localStorage.getItem("productCart"));


			for (var i = 0; i < items.length; i++) {
				var item = $(items[i]);
				var number = Number(item.find('.number__input').val());
				var minOrderNumber = Number(item.attr('data-min-number'));
				var maxOrderNumber = Number(item.attr('data-max-number'));
				var price = parseInt(item.find('.popup__order-item-price').text());

				if(number < minOrderNumber) {
					number = minOrderNumber;
					item.find('.number__input').val(minOrderNumber);
				} else if(number > maxOrderNumber) {
					number = maxOrderNumber;
					item.find('.number__input').val(maxOrderNumber);
				}
				console.log(number, price);
				sum += price*number;

				//перезаписываем количество в localStorage
				$.grep(localStorageCart.options, function (elem) {
					if($(items[i]).attr('data-code') == elem.code) {
						elem.number = number;
					}
				});
			}

			$('.popup__order-sum-value').text(sum + ' руб.');
			localStorage.setItem('productCart', JSON.stringify(localStorageCart));
			cart.calculate();
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

			if(localStorageCart.options.length === 0) {
				$('.popup__order-details').hide();
			} else {
				$('.popup__order-details').show();
			}

			for(var i = 0; i < localStorageCart.options.length; i++) {
				var listElement = $(
						'<li class="popup__order-item" ' +
						'data-code="'+ localStorageCart.options[i].code +'" data-min-number="'+ localStorageCart.options[i].minOrderNumber +'"' +
						'data-max-number="'+ localStorageCart.options[i].maxOrderNumber +'">' +
							'<span class="popup__order-item-td popup__order-item-title">'+ localStorageCart.options[i].title +'</span>' +
							'<span class="popup__order-item-td popup__order-item-number">'+
								'<label class="number product-card__number">' +
									'<input type="text" value="'+ localStorageCart.options[i].number +'" class="number__input">' +
									'<span class="number__minus">-</span>' +
									'<span class="number__plus">+</span>' +
									'<span class="number__measure">шт.</span>' +
								'</label>' +
							'</span>' +
							'<span class="popup__order-item-td popup__order-item-price">'+ localStorageCart.options[i].price +' руб.</span>' +
							'<span class="popup__order-item-td popup__order-item-delete">x</span>' +
						'</li>'
				);

				orderList.append(listElement);
			}

			calculateCart();

			$(document).on('change', '.popup--order .number__input', calculateCart);

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
				'data-title':productInfo[0].title,
				'data-min-number': productInfo[0].minOrderNumber,
				'data-max-number': productInfo[0].maxOrderNumber
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

			// вставляем в инпут минимальное кол-о товара
			$('.product-popup .number__input').val(productInfo[0].minOrderNumber);

			// подсчитываем цену при открытии попапа
			calcProductPriceInPopup.call($('.product-popup .number__input'));

			// Добавляем listener на изменение кол-а товара
			function calcProductPriceInPopup() {
				var numberOfBalloons = Number($(this).val());
				var minOrderNumber = Number($(this).closest('[data-code]').attr('data-min-number'));
				var maxOrderNumber = Number($(this).closest('[data-code]').attr('data-max-number'));

				if(numberOfBalloons < minOrderNumber) {
					numberOfBalloons = minOrderNumber;
					$(this).val(minOrderNumber);
				} else if(numberOfBalloons > maxOrderNumber) {
					numberOfBalloons = maxOrderNumber;
					$(this).val(maxOrderNumber);
				}

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
