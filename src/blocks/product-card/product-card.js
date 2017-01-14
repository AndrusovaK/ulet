(function(){
	$(function () {
		$(document).on('click', '.number__minus', function () {
			var $input = $(this).closest('.product-card__number').find('input');
			var minNumber = Number($(this).closest('.product-card').attr('data-min-number')) || 1;
			var count = parseInt($input.val()) - 1;
			count = count < minNumber ? minNumber : count;
			$input.val(count);
			$input.change();
			return false;
		});

		$(document).on('click', '.number__plus', function () {
			var $input = $(this).closest('.product-card__number').find('input');
			var maxNumber = Number($(this).closest('.product-card').attr('data-max-number')) || 10000;
			var count = parseInt($input.val()) + 1;
			count = count > maxNumber ? maxNumber : count;
			$input.val(count);
			$input.change();
			return false;
		});

		var calcProductPrice = function () {
			var numberOfBalloons = Number($(this).val()),
				currentProduct = $(this).closest('.product-card'),
				currentProductPrice = Number(currentProduct.attr('data-price')),
				minOrderNumber = Number(currentProduct.attr('data-min-number')),
				maxOrderNumber = Number(currentProduct.attr('data-max-number'));

			if (numberOfBalloons < minOrderNumber) {
				numberOfBalloons = minOrderNumber;
				$(this).val(minOrderNumber);
			} else if (numberOfBalloons > maxOrderNumber) {
				numberOfBalloons = maxOrderNumber;
				$(this).val(maxOrderNumber);
			}

			currentProduct.find('.product-card__price').html(numberOfBalloons*currentProductPrice + ' руб');
		};

		$('.product-card .number__input').each(function (ind, elem) {
			calcProductPrice.call(elem);
		});

		$(document).on('change', '.product-card .number__input', calcProductPrice);

	});

}());
