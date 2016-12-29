$.fn.isAppearedOnScreen = function () {
	var element = this.get(0);
	var bounds = element.getBoundingClientRect();
	return bounds.top < window.innerHeight;
};

var cart = {
	element: $('.main-page-cart__wrapper'),
	showHide: function (firstProductCard) {
		if (firstProductCard && $(firstProductCard).isAppearedOnScreen() && this.element.is(':hidden')) {
			this.element.fadeIn();
		} else if (firstProductCard && !$(firstProductCard).isAppearedOnScreen() && this.element.is(':visible')) {
			this.element.fadeOut();
		} else if (!firstProductCard) {
			this.element.fadeIn();
		}
	},
	add: function (event) {
		event.preventDefault();
		var currentProduct = $(event.currentTarget).closest('.product-card').length ? $(event.currentTarget).closest('.product-card') : $(event.currentTarget).closest('.product-popup');
		var orderData = {
			"price": Number(currentProduct.attr('data-price')),
			"title": currentProduct.attr('data-title'),
			"number": Number(currentProduct.find('.number__input').val()),
			"code": currentProduct.attr('data-code')
		};

		var localStorageCart = localStorage.getItem("productCart");
		if(localStorageCart) {
			localStorageCart = JSON.parse(localStorageCart);
			localStorageCart.options.push(orderData);
			localStorage.setItem("productCart", JSON.stringify(localStorageCart));
		} else {
			var cartData = {};
			cartData.options = [orderData];
			localStorage.setItem("productCart", JSON.stringify(cartData));
		}

		cart.calculate();
	},
	calculate: function () {
		var cartContent = JSON.parse(localStorage.getItem("productCart"));
		var numberOfBalloons = 0,
				totalPrice = 0;
		if (cartContent && cartContent.options.length) {
			cartContent.options.forEach(function (elem) {
				numberOfBalloons += elem.number;
				totalPrice += elem.number * elem.price;
			});
		}

		cart.element.find('.main-page-cart__number').html(numberOfBalloons);
		cart.element.find('.main-page-cart__total-price').html(totalPrice);
	}
};

(function(){

	$(function () {
		var firstProductCard = $('.product-card')[0];

		cart.showHide(firstProductCard);
		cart.calculate();

		$(document).scroll(function () {
			cart.showHide(firstProductCard);
		});

		$('.product-card .product-card__btn').on('click', cart.add);
	});

}());
