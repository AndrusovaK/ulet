(function(){

	$(function () {
		var priceRange= document.getElementById('filter__range');
		var priceInputs = [
				document.getElementById('price-from'),
				document.getElementById('price-to')
		];

		if(priceRange) {
			noUiSlider.create(priceRange, {
				start: [200, 800],
				connect: true,
				margin: 50,
				range: {
					'min': 0,
					'max': 2000
				}
			});

			priceRange.noUiSlider.on('update', function (values, handle) {
				priceInputs[handle].value = Math.round(values[handle]);
			});

			function setPriceRangeOnInput(event) {
				var changedInput = event.currentTarget;
				if (changedInput.id === 'price-from') {
					priceRange.noUiSlider.set([changedInput.value, null]);
				} else {
					priceRange.noUiSlider.set([null, changedInput.value]);
				}
			}

			priceInputs.forEach(function (input) {
				input.addEventListener('change', setPriceRangeOnInput);
			})
		}
	})
}());
