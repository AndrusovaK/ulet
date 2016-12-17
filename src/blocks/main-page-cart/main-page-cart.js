(function(){
	$(function () {
		var firstProductCard = $('.product-card')[0];
		var cart = $('.main-page-cart__wrapper');

		$.fn.isAppearedOnScreen = function () {
			var element = this.get(0);
			var bounds = element.getBoundingClientRect();
			return bounds.top < window.innerHeight;
		};

		function showHideCart() {
			if (firstProductCard && $(firstProductCard).isAppearedOnScreen() && $(cart).is(':hidden')) {
				$(cart).fadeIn();
			} else if (firstProductCard && !$(firstProductCard).isAppearedOnScreen() && $(cart).is(':visible')) {
				$(cart).fadeOut();
			}
		}

		showHideCart();

		$(document).scroll(function () {
			showHideCart();
		});
	});

}());
