(function(){
	$(function () {
		$(document).on('click', '.number__minus', function () {
			var $input = $(this).closest('.product-card').find('input');
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});

		$(document).on('click', '.number__plus', function () {
			var $input = $(this).closest('.product-card').find('input');
			$input.val(parseInt($input.val()) + 1);
			$input.change();
			return false;
		});

		var calcProductPrice = function () {
			var numberOfBalloons = Number($(this).val()),
				currentProduct = $(this).closest('.product-card'),
				currentProductPrice = Number(currentProduct.attr('data-price'));
			currentProduct.find('.product-card__price').html(numberOfBalloons*currentProductPrice + ' руб');
		};

		$(document).on('change', '.product-card .number__input', calcProductPrice);

	});

}());
