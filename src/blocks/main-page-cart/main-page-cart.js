(function(){
	$(function () {
		var firstProductCard = $('.product-card')[0];
		var firstProductCardOffset = $(firstProductCard).offset().top - $(firstProductCard).height();
		var cart = $('.main-page-cart__wrapper');
		var initialScrollTop = $(document).scrollTop();

		function showHideCart(scrollTop) {
			if (scrollTop > firstProductCardOffset && $(cart).is(':hidden')) {
				$(cart).fadeIn();
			} else if (scrollTop < firstProductCardOffset && $(cart).is(':visible')) {
				$(cart).fadeOut();
			}
		}

		showHideCart(initialScrollTop);

		$(document).scroll(function () {
			var scrollTop = $(document).scrollTop();
			showHideCart(scrollTop);
		});
	});

}());
